import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/* ------------------------------------------------------------------
   Global pointer tracker (viewport-normalised -1..1).
   Tracking on window means the breeze reacts anywhere in the hero,
   not just when the cursor is over the canvas.
------------------------------------------------------------------- */
const pointer = { x: 0, y: 0, vx: 0, vy: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -((e.clientY / window.innerHeight) * 2 - 1)
      pointer.vx = nx - pointer.x
      pointer.vy = ny - pointer.y
      pointer.x = nx
      pointer.y = ny
    },
    { passive: true },
  )
}

/* ------------------------------------------------------------------
   Leaf maths — a parametric teardrop surface so droplets can sit
   exactly on the leaf and roll across it.
   u ∈ [-1, 1] (across), v ∈ [0, 1] (base → tip)
------------------------------------------------------------------- */
interface LeafParams {
  length: number
  width: number
  cup: number
  arch: number
}

function leafPoint(u: number, v: number, p: LeafParams): THREE.Vector3 {
  const hw = p.width * Math.pow(Math.sin(Math.PI * Math.pow(v, 0.72)), 0.85)
  const x = u * hw
  const y = v * p.length
  const z = -u * u * p.cup * hw + Math.sin(Math.PI * v) * p.arch - v * v * 0.14 * p.length
  return new THREE.Vector3(x, y, z)
}

function makeLeafGeometry(p: LeafParams, base: string, tip: string) {
  const segU = 14
  const segV = 28
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  const cBase = new THREE.Color(base)
  const cTip = new THREE.Color(tip)
  const cVein = new THREE.Color('#d8ffd9')
  const tmp = new THREE.Color()

  for (let j = 0; j <= segV; j++) {
    const v = j / segV
    for (let i = 0; i <= segU; i++) {
      const u = (i / segU) * 2 - 1
      const pt = leafPoint(u, v, p)
      positions.push(pt.x, pt.y, pt.z)
      tmp.copy(cBase).lerp(cTip, Math.min(1, v * 0.85 + Math.abs(u) * 0.25))
      // soft midrib highlight
      const vein = Math.max(0, 1 - Math.abs(u) / 0.09) * (1 - v) * 0.55
      tmp.lerp(cVein, vein)
      colors.push(tmp.r, tmp.g, tmp.b)
    }
  }
  for (let j = 0; j < segV; j++) {
    for (let i = 0; i < segU; i++) {
      const a = j * (segU + 1) + i
      const b = a + 1
      const c = a + segU + 1
      const d = c + 1
      indices.push(a, c, b, b, c, d)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

/* ------------------------------------------------------------------
   Materials (shared)
------------------------------------------------------------------- */
function useMaterials() {
  return useMemo(() => {
    const leaf = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.42,
      clearcoat: 0.7,
      clearcoatRoughness: 0.25,
      sheen: 0.8,
      sheenColor: new THREE.Color('#c9ffd8'),
      sheenRoughness: 0.4,
      side: THREE.DoubleSide,
    })
    const stem = new THREE.MeshPhysicalMaterial({
      color: '#a7e39a',
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      sheen: 0.5,
      sheenColor: new THREE.Color('#f0fff0'),
    })
    const droplet = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      roughness: 0,
      metalness: 0,
      transparent: true,
      opacity: 0.38,
      clearcoat: 1,
      clearcoatRoughness: 0,
      ior: 1.33,
      specularIntensity: 1,
      envMapIntensity: 3.2,
    })
    const seed = new THREE.MeshPhysicalMaterial({
      color: '#d9c79a',
      roughness: 0.55,
      clearcoat: 0.4,
    })
    return { leaf, stem, droplet, seed }
  }, [])
}

/* ------------------------------------------------------------------
   Leaf with dew droplets (+ optional rolling droplet)
------------------------------------------------------------------- */
interface LeafProps {
  params: LeafParams
  position: [number, number, number]
  rotation: [number, number, number]
  colors?: [string, string]
  drops?: [number, number, number][] // u, v, radius
  rolling?: boolean
  phase?: number
  mats: ReturnType<typeof useMaterials>
}

const DEFAULT_LEAF_COLORS: [string, string] = ['#1f7a3e', '#62cf72']
const NO_DROPS: [number, number, number][] = []

function Leaf({ params, position, rotation, colors = DEFAULT_LEAF_COLORS, drops = NO_DROPS, rolling, phase = 0, mats }: LeafProps) {
  const ref = useRef<THREE.Group>(null)
  const rollRef = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => makeLeafGeometry(params, colors[0], colors[1]), [params, colors])
  const dropPositions = useMemo(
    () => drops.map(([u, v, r]) => leafPoint(u, v, params).add(new THREE.Vector3(0, 0, r * 0.55))),
    [drops, params],
  )
  const gust = useRef(0)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const speed = Math.min(1, Math.hypot(pointer.vx, pointer.vy) * 18)
    gust.current = THREE.MathUtils.lerp(gust.current, speed, 0.08)
    if (ref.current) {
      const breeze = Math.sin(t * 1.25 + phase) * (0.045 + gust.current * 0.16)
      ref.current.rotation.z = rotation[2] + breeze + pointer.x * 0.08
      ref.current.rotation.x = rotation[0] + Math.cos(t * 0.9 + phase) * 0.03 - pointer.y * 0.06
    }
    if (rolling && rollRef.current) {
      // droplet rolls toward the tip as the breeze tilts the leaf
      const v = 0.32 + 0.3 * (0.5 + 0.5 * Math.sin(t * 0.45 + pointer.x * 1.6))
      const u = 0.18 * Math.sin(t * 0.7 + pointer.y)
      const r = 0.065
      const p = leafPoint(u, v, params)
      rollRef.current.position.lerp(p.add(new THREE.Vector3(0, 0, r * 0.6)), Math.min(1, delta * 4))
    }
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh geometry={geo} material={mats.leaf} castShadow />
      {dropPositions.map((p, i) => (
        <mesh key={i} position={p} material={mats.droplet} scale={[1, 1, 0.72]}>
          <sphereGeometry args={[drops[i][2], 24, 24]} />
        </mesh>
      ))}
      {rolling && (
        <mesh ref={rollRef} material={mats.droplet} scale={[1, 1, 0.72]}>
          <sphereGeometry args={[0.065, 32, 32]} />
        </mesh>
      )}
    </group>
  )
}

/* ------------------------------------------------------------------
   Tendril — a gentle arc that ends in a tightening spiral curl
------------------------------------------------------------------- */
function makeTendrilCurve(origin: THREE.Vector3, angle: number, length: number, lift: number) {
  const dir = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle) * 0.6)
  const pts: THREE.Vector3[] = []
  const straight = 26
  for (let i = 0; i <= straight; i++) {
    const t = i / straight
    pts.push(
      origin
        .clone()
        .add(dir.clone().multiplyScalar(t * length))
        .add(new THREE.Vector3(0, Math.sin(t * Math.PI * 0.6) * lift, 0)),
    )
  }
  const end = pts[pts.length - 1]
  const turns = 2.2
  const spiralSteps = 40
  for (let i = 1; i <= spiralSteps; i++) {
    const s = i / spiralSteps
    const a = s * Math.PI * 2 * turns
    const r = 0.11 * (1 - s * 0.75)
    pts.push(
      end
        .clone()
        .add(dir.clone().multiplyScalar(Math.sin(a) * r))
        .add(new THREE.Vector3(0, (1 - Math.cos(a)) * r * -1 + s * 0.04, Math.cos(a) * r * 0.25)),
    )
  }
  return new THREE.CatmullRomCurve3(pts)
}

function Tendril({ origin, angle, length, lift, mats, phase }: { origin: [number, number, number]; angle: number; length: number; lift: number; mats: ReturnType<typeof useMaterials>; phase: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => {
    const curve = makeTendrilCurve(new THREE.Vector3(0, 0, 0), angle, length, lift)
    return new THREE.TubeGeometry(curve, 120, 0.013, 8, false)
  }, [angle, length, lift])
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.z = Math.sin(t * 1.1 + phase) * 0.06 + pointer.x * 0.05
    ref.current.rotation.y = Math.cos(t * 0.7 + phase) * 0.05
  })
  return <mesh ref={ref} geometry={geo} material={mats.stem} position={origin} />
}

/* ------------------------------------------------------------------
   The pea shoot
------------------------------------------------------------------- */
const LEAF_LARGE: LeafParams = { length: 1.0, width: 0.44, cup: 0.32, arch: 0.08 }
const LEAF_MID: LeafParams = { length: 0.86, width: 0.38, cup: 0.3, arch: 0.07 }
const LEAF_BUD: LeafParams = { length: 0.48, width: 0.18, cup: 0.9, arch: 0.04 }
const LEAF_SMALL: LeafParams = { length: 0.6, width: 0.27, cup: 0.35, arch: 0.05 }

function PeaShoot() {
  const mats = useMaterials()
  const rig = useRef<THREE.Group>(null)

  const stemGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, -1.75, 0),
      new THREE.Vector3(0.06, -1.05, 0.02),
      new THREE.Vector3(-0.05, -0.25, 0),
      new THREE.Vector3(0.04, 0.45, -0.02),
      new THREE.Vector3(0.0, 1.0, 0),
    ])
    return new THREE.TubeGeometry(curve, 96, 0.05, 14, false)
  }, [])

  useFrame((state) => {
    if (!rig.current) return
    const t = state.clock.elapsedTime
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, pointer.x * 0.45 + Math.sin(t * 0.25) * 0.15, 0.04)
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -pointer.y * 0.18, 0.04)
    rig.current.rotation.z = THREE.MathUtils.lerp(rig.current.rotation.z, -pointer.x * 0.06, 0.04)
    // let gusts settle once per frame
    pointer.vx *= 0.92
    pointer.vy *= 0.92
  })

  return (
    <group ref={rig} position={[0, 0.05, 0]} scale={0.92}>
      <mesh geometry={stemGeo} material={mats.stem} />

      {/* seed hull at the base */}
      <mesh position={[0.0, -1.8, 0.02]} scale={[0.17, 0.13, 0.15]} material={mats.seed}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      {/* fine roots */}
      {[-0.5, 0.2, 0.9].map((a, i) => (
        <Tendril key={`r${i}`} origin={[0, -1.88, 0]} angle={-Math.PI / 2 + a} length={0.18} lift={-0.12} mats={mats} phase={i} />
      ))}

      {/* apical bud */}
      <Leaf params={LEAF_BUD} position={[0, 0.98, 0]} rotation={[-0.15, 0.2, 0.22]} colors={['#2f9449', '#8fe58c']} mats={mats} phase={0.4} />
      <Leaf params={LEAF_BUD} position={[0, 0.98, 0]} rotation={[-0.1, -0.3, -0.28]} colors={['#2f9449', '#8fe58c']} mats={mats} phase={1.2} drops={[[0.1, 0.55, 0.03]]} />

      {/* top pair */}
      <Leaf
        params={LEAF_LARGE}
        position={[0, 0.82, 0]}
        rotation={[-0.4, 0.25, 0.95]}
        mats={mats}
        phase={0}
        drops={[
          [0.25, 0.42, 0.055],
          [-0.35, 0.62, 0.04],
          [0.05, 0.78, 0.035],
        ]}
      />
      <Leaf
        params={LEAF_LARGE}
        position={[0, 0.82, 0]}
        rotation={[-0.35, -0.2, -0.92]}
        mats={mats}
        phase={1.6}
        rolling
        drops={[
          [-0.3, 0.7, 0.042],
          [0.4, 0.55, 0.03],
        ]}
      />

      {/* middle pair (offset in depth) */}
      <Leaf
        params={LEAF_MID}
        position={[0, 0.02, 0.02]}
        rotation={[-0.25, 0.7, 1.22]}
        colors={['#1b6e37', '#55c46a']}
        mats={mats}
        phase={2.3}
        drops={[
          [0.2, 0.5, 0.05],
          [-0.25, 0.3, 0.032],
        ]}
      />
      <Leaf
        params={LEAF_MID}
        position={[0, 0.02, -0.02]}
        rotation={[-0.3, -0.75, -1.18]}
        colors={['#1b6e37', '#55c46a']}
        mats={mats}
        phase={3.1}
        drops={[[0.1, 0.6, 0.045]]}
      />

      {/* lower single leaf */}
      <Leaf params={LEAF_SMALL} position={[0, -0.78, 0]} rotation={[-0.2, 0.4, 1.35]} colors={['#196532', '#4cb763']} mats={mats} phase={4} drops={[[0.0, 0.5, 0.035]]} />

      {/* tendrils */}
      <Tendril origin={[0, 1.0, 0]} angle={0.55} length={0.8} lift={0.55} mats={mats} phase={0} />
      <Tendril origin={[0, 1.0, 0]} angle={Math.PI - 0.4} length={0.7} lift={0.65} mats={mats} phase={1.4} />
      <Tendril origin={[0, 0.05, 0]} angle={Math.PI + 0.25} length={0.6} lift={0.35} mats={mats} phase={2.2} />
      <Tendril origin={[0, 0.05, 0]} angle={-0.15} length={0.55} lift={0.3} mats={mats} phase={3.3} />
    </group>
  )
}

/* ------------------------------------------------------------------
   Glass sanctuary orb + fresnel rim
------------------------------------------------------------------- */
const rimVertex = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const rimFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uGold;
  uniform float uTime;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.6);
    float shimmer = 0.5 + 0.5 * sin(uTime * 0.6 + vN.y * 3.0 + vN.x * 2.0);
    vec3 col = mix(uColor, uGold, shimmer * 0.55);
    gl_FragColor = vec4(col, f * 0.85);
  }
`

function GlassOrb() {
  const rim = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#e9fff3') },
      uGold: { value: new THREE.Color('#e8cf7a') },
      uTime: { value: 0 },
    }),
    [],
  )
  useFrame((state) => {
    if (rim.current) rim.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <group>
      <mesh renderOrder={1}>
        <sphereGeometry args={[2.15, 96, 96]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.5}
          roughness={0.02}
          ior={1.22}
          iridescence={0.55}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[120, 420]}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={1.15}
          color="#f7fffa"
          depthWrite={false}
        />
      </mesh>
      <mesh renderOrder={2} scale={1.002}>
        <sphereGeometry args={[2.15, 96, 96]} />
        <shaderMaterial
          ref={rim}
          vertexShader={rimVertex}
          fragmentShader={rimFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------
   Rising oxygen / vitality particles
------------------------------------------------------------------- */
function useDotTexture() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.35, 'rgba(255,255,255,0.65)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])
}

function OxygenParticles({ count = 160 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const tex = useDotTexture()
  const { positions, colors, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)
    const palette = [new THREE.Color('#D4AF37'), new THREE.Color('#2CE67F'), new THREE.Color('#ffffff'), new THREE.Color('#bfeccf')]
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 0.5
      const c = palette[i % palette.length]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      speeds[i] = 0.12 + Math.random() * 0.28
      offsets[i] = Math.random() * Math.PI * 2
    }
    return { positions, colors, speeds, offsets }
  }, [count])

  useFrame((state, delta) => {
    const pts = ref.current
    if (!pts) return
    const arr = pts.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta
      arr[i * 3] += Math.sin(t * 0.5 + offsets[i]) * 0.0016
      if (arr[i * 3 + 1] > 3.6) {
        arr[i * 3 + 1] = -3.6
        arr[i * 3] = (Math.random() - 0.5) * 9
      }
    }
    pts.geometry.attributes.position.needsUpdate = true
    pts.rotation.y = pointer.x * 0.08
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial map={tex} size={0.07} sizeAttenuation vertexColors transparent opacity={0.9} depthWrite={false} />
    </points>
  )
}

/* ------------------------------------------------------------------
   Scene
------------------------------------------------------------------- */
export default function HeroScene({ active = true }: { active?: boolean }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={isMobile ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 38 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      aria-hidden
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#fff4d6" />
      <directionalLight position={[-5, -2, 3]} intensity={0.6} color="#c8ffe0" />
      <pointLight position={[0, 0, 2.5]} intensity={6} distance={6} color="#d9ffe6" />

      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3.5} color="#fff6dc" position={[4, 5, 3]} scale={[6, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.6} color="#d8ffe8" position={[-5, 1, 2]} scale={[3, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={2.4} color="#ffffff" position={[0, 3, 6]} scale={2.5} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.2} color="#f2d98a" position={[2, -4, -3]} scale={[8, 2, 1]} target={[0, 0, 0]} />
      </Environment>

      <OxygenParticles count={isMobile ? 60 : 140} />

      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.55} floatingRange={[-0.08, 0.08]}>
        <PeaShoot />
        <GlassOrb />
      </Float>
    </Canvas>
  )
}
