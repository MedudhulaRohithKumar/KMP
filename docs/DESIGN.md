# Project Specification: Lavish Microgreens Web Application
**Target Environment:** Antigravity AI / Modern Web Stack  
**Design Paradigm:** "Botanical Luxury meets Bio-Tech Precision"  
**Core Vibe:** Refreshing, Lavish, Ultra-Hygienic, Interactive, 3D-Immersive, Gamified  

---

## 1. Brand Aesthetic & Design Direction

The website must feel like stepping into a high-end, sunlit architectural greenhouse merged with a luxury wellness spa. Every interaction should evoke **freshness, purity, and vitality**.

*   **Visual Metaphors:** Morning dew, glass sanctuaries, cellular vitality, liquid chlorophyll, zero-touch purity.
*   **Sensory Feel:** Crisp, hydrated, weightless, and deeply nourishing.
*   **Motion Philosophy:** Fluid, organic, and responsive. Elements should float, sprout, and ripple with water-like physics rather than snapping rigidly into place.

---

## 2. Color Palette & Design Tokens

Use a palette that balances **earthy botanical richness** (lavishness) with **clinical, airy brightness** (hygiene and freshness).

```css
:root {
  /* Primary Backgrounds - Airy, Hygienic, Fresh */
  --bg-alabaster: #F9FBF9;        /* Crisp, clean lab-grade white with a hint of mint */
  --bg-dew-mist: #EEF5F0;         /* Soft, refreshing secondary background */
  --bg-obsidian-leaf: #071A12;    /* Deep luxury dark-mode section background */

  /* Accents & Brand Colors - Lavish & Alive */
  --emerald-canopy: #0F3D26;      /* Primary rich structural green */
  --chlorophyll-glow: #2CE67F;    /* Vibrant neon-organic green for gamified meters & highlights */
  --champagne-gold: #D4AF37;      /* Luxury metallic accent for borders, badges, and premium tiers */
  --radish-ruby: #D9385A;         /* Micro-accent inspired by Red Garnet Amaranth / Radish stems */

  /* Glassmorphism & Surfaces (For the "Hygienic Lab" & "Water" feel) */
  --glass-surface: rgba(255, 255, 255, 0.65);
  --glass-border: rgba(255, 255, 255, 0.85);
  --glass-dark: rgba(15, 61, 38, 0.55);
  --backdrop-blur: blur(20px);

  /* Typography Colors */
  --text-primary: #0A2218;
  --text-muted: #4A6B5B;
  --text-light: #F4F9F5;
}
```

---

## 3. Typography System

Pair a high-fashion editorial serif with a razor-sharp geometric sans-serif to communicate both **luxury** and **scientific hygiene**.

*   **Display / Headings (The "Lavish" Voice):** `Cormorant Garamond` or `Playfair Display` (Light/Regular weights, italic accents for botanical names).
    *   *Hero Title:* `clamp(3.2rem, 6vw, 6.5rem)`, line-height `1.05`, letter-spacing `-0.02em`.
*   **UI / Body / Data (The "Clean & Hygienic" Voice):** `Plus Jakarta Sans` or `Inter`.
    *   *Body:* `1.125rem`, line-height `1.7`, crisp and breathable.
*   **Monospace / Lab Metrics (Gamified Stats & Hygiene Sensors):** `JetBrains Mono` or `Space Mono`.
    *   Used for nutrient percentages, pH levels, humidity readouts, and harvest countdowns.

---

## 4. 3D Visuals & Interactive Architecture

To achieve an eye-cherishing, refreshing feel, implement interactive 3D scenes (using **React Three Fiber / Three.js** or **Spline**) alongside smooth scroll physics (**Lenis** + **GSAP ScrollTrigger**).

### A. The "Living Dewdrop" Hero Section
*   **3D Centerpiece:** A hyper-realistic macro 3D render of a vibrant microgreen sprout (e.g., Pea Shoot or Red Rambo Radish) suspended in mid-air with translucent water droplets clinging to the leaves.
*   **Mouse Parallax & Physics:** Moving the cursor creates a gentle breeze effect that sways the leaves and causes a microscopic water droplet to roll across the leaf surface, refracting light.
*   **Atmosphere:** Subtle floating light particles (representing pure oxygen and vitality) rising slowly in the background.
*   **CTA Button:** A pill-shaped liquid-glass button (`Explore the Harvest`) with an iridescent gold border that ripples like water on hover.

### B. Microgreens Explained: "The $40\times$ Potency Visualizer"
Instead of static paragraphs explaining what microgreens are, use an **interactive 3D scale comparison**:
*   **Visual:** On the left, a single glowing 3D microgreen cotyledon. On the right, a massive pile of mature broccoli/greens.
*   **Interaction:** A horizontal scrubbing slider labeled *"Slide to compare nutrient density"*. As the user drags the slider, the 3D viewport morphs to show how **1 ounce of microgreens equals the concentrated cellular nutrition of up to $40\times$ mature vegetables**.
*   **Micro-cards:** Floating glassmorphic tooltips pinned to parts of the 3D plant (Seed, Stem, Cotyledon Leaf) that expand when clicked to explain why harvesting at day 7–14 locks in peak vital enzymes.

---

## 5. Gamified User Experiences

Transform passive reading into rewarding, playful interactions that educate the user and drive conversions.

### Game 1: "The Bio-Sanctuary" (Interactive Hygienic Process Tour)
To build absolute trust in your hygiene and cultivation process, turn the process section into an **interactive 5-stage simulation** where the user "grows" a batch of microgreens inside a virtual cleanroom.

*   **UI Layout:** A horizontal scrollytelling viewport styled like a sleek, futuristic glass vertical farm. A persistent "Purity Score: $100\%$" HUD sits in the corner.
*   **Stage 1: Organic Non-GMO Seed Selection**
    *   *User Action:* Click/Hold to scan seeds with a virtual purity beam.
    *   *Visual Feedback:* Seeds glow golden; badge unlocks: *"Zero Chemicals / 100% Organic."*
*   **Stage 2: Pure $\text{H}_2\text{O}$ & UV-C Sterilization**
    *   *User Action:* Toggle the "Purified Mist" switch.
    *   *Visual Feedback:* A refreshing mist animation sprays across the screen with glassmorphic water droplets forming on the user's viewport.
*   **Stage 3: HEPA-Filtered Climate Sanctuary**
    *   *User Action:* Adjust the "Spectrum Light & Airflow" dial.
    *   *Visual Feedback:* The 3D tray sprouts rapidly in real-time under a lavish purple-and-gold sun-spectrum glow.
*   **Stage 4: Zero-Touch Glove-Grade Harvest**
    *   *User Action:* Swipe across the screen to perform a "Clean Laser Cut" just above the root mat.
    *   *Visual Feedback:* Satisfying haptic-style visual snap; explains how roots and medium stay behind so only pristine leaves enter the pack.
*   **Stage 5: Farm-to-Door Cold Seal**
    *   *Reward:* Completing the 5 stages unlocks a **"Certified Clean-Grown Insider" $10\%$ Discount Badge** automatically applied to their cart.

### Game 2: "The Cellular Elixir Builder" (Gamified Health Benefits)
Instead of listing vitamins in a boring table, let users play with an interactive **"Vitality Alchemist"** module.

*   **How it Works:** Present a sleek 3D crystal bowl in the center of the screen surrounded by floating 3D microgreen varieties (Sunflower, Broccoli, Radish, Pea Tendrils, Amaranth).
*   **The Mechanic:** As users drag or click different microgreens into the bowl, four glowing **Bio-Meters** animate and fill up in real-time:
    1.  **Skin & Cellular Glow** (Sulforaphane, Vitamin E, Antioxidants)
    2.  **Immunity Shield** (Vitamin C, Polyphenols)
    3.  **Clean Energy & Focus** (Iron, Chlorophyll, B-Vitamins)
    4.  **Gut & Detox Harmony** (Live Enzymes, Prebiotic Fiber)
*   **Lavish Payoff:** Once the bowl reaches $100\%$ synergy, it shimmers with a golden aura and generates a personalized **"Your Custom Vitality Box"** that the user can buy with one click.

---

## 6. Key Page Sections & Component Hierarchy

1.  **Sticky Glass Navigation Bar**
    *   Floating pill navbar (`backdrop-filter: blur(16px)`), brand logo on the left, section links in the center, and a live "Harvest Cart" indicator on the right showing a sprouting icon that grows as items are added.
2.  **Hero Section ("Nature's Crown Jewel")**
    *   Full-viewport 3D macro leaf scene, editorial headline, dual CTAs (*"Build Your Vitality Box"* & *"Experience Our Cleanroom"*), and live badge (*"Next Harvest Ships in 14 Hours"*).
3.  **The Microgreen Revelation (3D Scrollytelling)**
    *   Interactive $40\times$ nutrient density visualizer + 3D plant anatomy hotspot explorer.
4.  **Gamified Health Matrix ("The Cellular Elixir Builder")**
    *   Interactive mix-and-match health benefit simulator with real-time nutrient gauges.
5.  **The Zero-Touch Hygiene Journey ("The Bio-Sanctuary")**
    *   5-step gamified cleanroom simulation highlighting UV-purified water, food-grade trays, HEPA air filtration, and zero pesticide guarantees.
6.  **Lavish Product Showcase ("The Harvest Collection")**
    *   3D tilting product cards with hover micro-interactions: hovering over a card gently lifts the lid of the microgreen punnet in 3D and reveals tasting notes (e.g., *"Nutty & Crisp"*, *"Peppery Wasabi Kick"*), culinary pairings, and lab-tested purity metrics.
7.  **Chef & Wellness Testimonials ("Trusted by Purists")**
    *   Minimalist carousel featuring Michelin-style plating photography and nutritionist endorsements.
8.  **Subscription & Freshness Guarantee Footer**
    *   Deep emerald-obsidian background with golden typography, harvest schedule calendar, and newsletter signup.

---

## 7. Micro-Interactions & Sensory Polish (Instructions for Antigravity)

*   **Custom Cursor:** Replace the default cursor on desktop with a soft, glowing emerald-and-gold ring that expands into a "Water Droplet" lens when hovering over 3D plants or product imagery.
*   **Freshness Audio (Optional Toggle):** Include a subtle, muted-by-default ambient soundscape toggle in the navbar (gentle rainforest mist, soft chimes on gamified badge unlocks, crisp leaf rustle on scroll).
*   **Scroll-Triggered Sprouting:** Section dividers and SVG botanical line art should draw themselves organically (`stroke-dashoffset` animations) as the user scrolls down the page.
*   **Glassmorphic Hygiene Badges:** Every product card must feature a floating glass pill badge displaying `"100% Zero-Touch Hygiene"`, `"Grown in HEPA Sanctuary"`, and `"Harvested to Order"`.

---

## 8. Recommended Tech Stack for Implementation

*   **Frontend Framework:** Next.js (App Router) or React + Vite (TypeScript)
*   **Styling:** Tailwind CSS + Custom CSS Variables for glassmorphism and luxury gradients
*   **3D & WebGL:** `@react-three/fiber`, `@react-three/drei`, Three.js (with procedural fallback animations if 3D models are loading)
*   **Animation Engine:** `framer-motion` (UI transitions, gamified meters) + `gsap` with `ScrollTrigger` (scrollytelling process tour)
*   **Smooth Scrolling:** `@studio-freight/lenis` for weightless, luxurious scroll momentum
*   **Icons:** `lucide-react` combined with custom fine-line botanical SVGs