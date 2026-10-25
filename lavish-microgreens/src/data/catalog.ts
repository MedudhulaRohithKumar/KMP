export interface MicrogreenTier {
  size: '50g' | '100g' | '250g' | '500g' | '1kg'
  price: number
}

export interface MicrogreenProduct {
  id: string
  name: string
  botanical: string
  taste: string
  tasteCategory: string
  benefits: string
  image: string
  tiers: { [key: string]: number }
  popular?: boolean
}

export const KMP_FRESH_PRODUCTS: MicrogreenProduct[] = [
  {
    id: 'sunflower',
    name: 'Sunflower Microgreens',
    botanical: 'Helianthus annuus',
    taste: 'Nutty & crisp with a rich satisfying crunch',
    tasteCategory: 'NUTTY · FILLING',
    benefits: 'High in plant protein, vitamin E, zinc, selenium and healthy fats',
    image: '/images/sunflower.webp',
    popular: true,
    tiers: { '50g': 80, '100g': 150, '250g': 299, '500g': 700, '1kg': 1200 },
  },
  {
    id: 'radish',
    name: 'Radish Microgreens',
    botanical: 'Raphanus sativus',
    taste: 'Spicy, zesty wasabi-like kick',
    tasteCategory: 'SPICY · CRUNCHY',
    benefits: 'Rich in vitamin C, folate and antioxidants. Excellent for digestion & liver health',
    image: '/images/red-radish.webp',
    popular: true,
    tiers: { '50g': 80, '100g': 150, '250g': 299, '500g': 700, '1kg': 1200 },
  },
  {
    id: 'broccoli',
    name: 'Broccoli Microgreens',
    botanical: 'Brassica oleracea',
    taste: 'Mild, fresh, tender cabbage flavor',
    tasteCategory: 'MILD · FRESH',
    benefits: 'Packed with sulforaphane, vitamins A, C, K. Powerful cellular detoxifier',
    image: '/images/broccoli.webp',
    popular: true,
    tiers: { '50g': 110, '100g': 200, '250g': 500, '500g': 1200, '1kg': 2000 },
  },
  {
    id: 'purple-radish',
    name: 'Purple Radish Microgreens',
    botanical: 'Raphanus sativus purpurea',
    taste: 'Peppery kick with vivid violet stems',
    tasteCategory: 'SPICY · ANTHOCYANIN RICH',
    benefits: 'Loaded with anthocyanin antioxidants that fight free radicals',
    image: '/images/purple-radish.webp',
    tiers: { '50g': 90, '100g': 150, '250g': 350, '500g': 700, '1kg': 1500 },
  },
  {
    id: 'pea-shoots',
    name: 'Pea Shoots / Tendrils',
    botanical: 'Pisum sativum',
    taste: 'Sweet, garden-fresh and delicate',
    tasteCategory: 'SWEET · TENDER',
    benefits: 'High dietary fiber, folate, iron, and vitamins A & C. Natural energy booster',
    image: '/images/pea-tendrils.webp',
    popular: true,
    tiers: { '50g': 80, '100g': 150, '250g': 300, '500g': 800, '1kg': 1400 },
  },
  {
    id: 'mustard-greens',
    name: 'Mustard Greens',
    botanical: 'Brassica juncea',
    taste: 'Bold, tangy Dijon mustard kick',
    tasteCategory: 'TANGY · BOLD',
    benefits: 'High in vitamin K, glucosinolates, and immune-supporting antioxidants',
    image: '/images/mustard.webp',
    tiers: { '50g': 80, '100g': 150, '250g': 300, '500g': 800, '1kg': 1400 },
  },
  {
    id: 'fenugreek',
    name: 'Fenugreek (Methi) Microgreens',
    botanical: 'Trigonella foenum-graecum',
    taste: 'Slightly bitter, aromatic and herbal',
    tasteCategory: 'SLIGHTLY BITTER · MEDICINAL',
    benefits: 'Traditionally valued to aid digestion, regulate blood sugar, and supply iron',
    image: '/images/fenugreek.webp',
    tiers: { '50g': 80, '100g': 150, '250g': 300, '500g': 800, '1kg': 1400 },
  },
  {
    id: 'beetroot',
    name: 'Beetroot Microgreens',
    botanical: 'Beta vulgaris',
    taste: 'Earthy sweetness with ruby-magenta hues',
    tasteCategory: 'EARTHY · SWEET',
    benefits: 'Rich in dietary nitrates, betalains, and vitamins for stamina and circulation',
    image: '/images/beetroot.webp',
    tiers: { '50g': 110, '100g': 250, '250g': 550, '500g': 1000, '1kg': 1800 },
  },
  {
    id: 'wheatgrass',
    name: 'Wheatgrass',
    botanical: 'Triticum aestivum',
    taste: 'Intensely fresh, vibrant, grassy and sweet',
    tasteCategory: 'FRESH · GRASSY',
    benefits: 'Dense in chlorophyll, enzymes, and 17 amino acids for blood oxygenation',
    image: '/images/wheatgrass.webp',
    popular: true,
    tiers: { '50g': 100, '100g': 200, '250g': 400, '500g': 900, '1kg': 1200 },
  },
  {
    id: 'mixed-microgreens',
    name: 'Mixed Microgreens Blend',
    botanical: 'KMP House Blend',
    taste: 'Balanced mix of nutty, sweet and zesty greens',
    tasteCategory: 'BALANCED · DAILY SUPERFOOD',
    benefits: 'Daily holistic nutrition combining 5 to 6 microgreen varieties in one punnet',
    image: '/images/hero-orb.webp',
    popular: true,
    tiers: { '50g': 150, '100g': 250, '250g': 500, '500g': 1000, '1kg': 1500 },
  },
  {
    id: 'premium-mix',
    name: 'Premium Special Reserve Mix',
    botanical: 'Curated Harvest Blend',
    taste: 'Gourmet selection with beet, amaranth, radish & pea',
    tasteCategory: 'GOURMET · ULTRA POTENT',
    benefits: 'Highest antioxidant score with vibrant colors for salads, toasts & fine dining',
    image: '/images/amaranth.webp',
    tiers: { '50g': 200, '100g': 500, '250g': 1000, '500g': 1500, '1kg': 2500 },
  },
]

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  boxes: string
  description: string
  popular?: boolean
  features: string[]
}

export const KMP_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'STARTER PLAN',
    price: 199,
    boxes: '2 boxes · 50 g each',
    description: 'Perfect for individuals beginning their microgreens wellness journey.',
    features: [
      '2 fresh harvested punnets (50g each)',
      '100% natural & chemical-free',
      'Confirm delivery frequency when ordering',
      'Doorstep delivery across Hyderabad',
    ],
  },
  {
    id: 'weekly',
    name: 'WEEKLY PLAN',
    price: 599,
    boxes: '2 boxes · 100 g each',
    description: 'Ideal for couples or daily salad & smoothie lovers.',
    popular: true,
    features: [
      '2 larger punnets (100g each)',
      'Weekly rotating varieties',
      'Zero-touch sterile packaging',
      'Free morning doorstep delivery',
    ],
  },
  {
    id: 'monthly',
    name: 'MONTHLY PLAN',
    price: 1499,
    boxes: '4 boxes · 100 g each',
    description: 'A full month of continuous living cellular vitality.',
    features: [
      '4 boxes delivered fresh every week (100g each)',
      'Choose your preferred varieties',
      'Priority harvest batch allocation',
      'Includes free nutrition guide & recipes',
    ],
  },
  {
    id: 'monthly-family',
    name: 'MONTHLY FAMILY PLAN',
    price: 2999,
    boxes: '4 boxes · 200 g each',
    description: 'Maximum daily health for the whole family.',
    features: [
      '4 jumbo boxes (200g each)',
      'Enough greens for 4+ family members',
      'Includes premium Broccoli & Radish',
      'VIP customer support on WhatsApp',
    ],
  },
]

export interface PowderProduct {
  id: string
  name: string
  tagline: string
  weight: string
  price: number
  description: string
  ingredients: string[]
  nutritionFacts: { [key: string]: string }
  benefits: { title: string; desc: string }[]
}

export const KMP_POWDER_PRODUCT: PowderProduct = {
  id: 'mix-powder-100g',
  name: 'Mix Microgreens Powder',
  tagline: 'Powerful Nutrition in Every Spoon · Small Leaves, Big Power',
  weight: '100g',
  price: 499,
  description:
    'Our premium mix microgreens powder is dehydrated and finely milled from 5 nutrient-rich microgreens — broccoli, radish, sunflower, pea shoots and mustard. It is a 100% natural, plant-based superfood packed with vitamins, minerals, antioxidants and phytonutrients to support your overall health and well-being.',
  ingredients: [
    'Broccoli Microgreens',
    'Radish Microgreens',
    'Sunflower Microgreens',
    'Pea Shoots',
    'Mustard Microgreens',
  ],
  nutritionFacts: {
    Energy: '320 kcal',
    Protein: '26 g',
    Carbohydrate: '44 g',
    'Dietary Fiber': '15 g',
    'Total Fat': '4 g',
    'Vitamin A': '6800 IU',
    'Vitamin C': '120 mg',
    Calcium: '350 mg',
    Iron: '9 mg',
    Magnesium: '180 mg',
    Potassium: '1600 mg',
  },
  benefits: [
    { title: 'Boosts Immunity', desc: 'Rich in vitamins A, C, E and minerals like iron, zinc & magnesium.' },
    { title: 'Supports Heart Health', desc: 'Helps maintain healthy cholesterol levels and optimal blood flow.' },
    { title: 'Improves Digestion', desc: 'High in prebiotic fiber, supports gut health and friendly bacteria.' },
    { title: 'Enhances Brain Function', desc: 'Natural antioxidants that support focus, memory and mental clarity.' },
    { title: 'Helps in Weight Management', desc: 'Low in calories, dense in bio-available nutrients to keep you full.' },
    { title: 'Rich in Antioxidants', desc: 'Fights free radicals and cellular oxidative stress.' },
    { title: 'Stronger Bones & Teeth', desc: 'Good source of bio-available calcium, magnesium and vitamin K.' },
    { title: 'Better Eye Health', desc: 'Rich in lutein, zeaxanthin and natural beta-carotene.' },
    { title: 'Healthy Skin & Hair', desc: 'Provides essential micronutrients for glowing skin and follicle strength.' },
    { title: 'Natural Energy Boost', desc: 'Packed with clean plant protein, B-vitamins and active chlorophyll.' },
  ],
}

export const KMP_INFO = {
  companyName: 'KMP Micro Greens',
  brandName: 'KMP Microgreens',
  tagline: "Nature's Small Greens, Big Nutrition",
  subTagline: 'Small Leaves, Big Power',
  fssai: '23626023002045',
  phone: '6304895387',
  whatsappNumber: '916304895387',
  whatsappUrl: 'https://wa.me/916304895387',
  instagram: '@kmpmicrogreens_',
  instagramUrl: 'https://instagram.com/kmpmicrogreens_',
  location: 'Madha Nagar, Kakatiya Nagar, (BHEL), Hyderabad',
}
