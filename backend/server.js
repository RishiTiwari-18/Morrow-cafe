import connectDB from './src/db/index.js'
import app from './src/app.js'
import { MenuItem } from './src/models/menuItem.model.js'

const DEFAULT_SEED = [
  {
    name: 'Ratnagiri Estate Anaerobic',
    price: '₹240',
    priceValue: 240,
    typeLabel: 'Single Origin Pour-Over · V60 or Kalita Wave',
    description:
      'Anaerobic natural fermentation grown at 1,350m elevation in Bababudangiri. Vibrant and layered profile.',
    tags: ['Wild Berry', 'Cacao Nibs', 'Dried Fig'],
    category: 'Coffee',
    active: true,
    featured: true,
  },
  {
    name: 'Silky Spiced Cardamom Flat White',
    price: '₹220',
    priceValue: 220,
    typeLabel: 'Espresso Bar · House Blend & Micro-Foam',
    description:
      'Double ristretto of Chikmagalur washed roast infused with cold-pressed green Malabar cardamom and velvety steamed milk.',
    tags: ['Warm Spice', 'Almond Butter', 'Oat/Dairy'],
    category: 'Coffee',
    active: true,
    featured: true,
  },
  {
    name: 'Pistachio Orange Blossom Cruffin',
    price: '₹210',
    priceValue: 210,
    typeLabel: 'Viennoiserie · 48-hr Fermentation',
    description:
      'Caramelized exterior with honeycomb crumb, filled with Iranian pistachio mousseline and a kiss of organic Seville orange flower essence.',
    tags: ['French Butter', 'Stoneground Nut', 'Floral Note'],
    category: 'Pastry',
    active: true,
    featured: true,
  },
  {
    name: 'Cascara & Meyer Lemon Sparkler',
    price: '₹230',
    priceValue: 230,
    typeLabel: 'Botanical & Cold Extraction',
    description:
      'Sun-dried coffee cherry husk slow steeped for 18 hours, spritzed with wild botanical quinine tonic and fresh Meyer lemon peel.',
    tags: ['Rosehip', 'Sparkling Tonic', 'Low Caffeine'],
    category: 'Beverage',
    active: true,
    featured: true,
  },
]

const PORT = process.env.PORT || 3000

connectDB()
  .then(async () => {
    const existingCount = await MenuItem.countDocuments()
    if (existingCount === 0) {
      console.log(
        '[seed] Menu collection is empty — auto-seeding 4 featured menu items...'
      )
      const seeded = await MenuItem.insertMany(DEFAULT_SEED, { ordered: true })
      console.log(`[seed] Inserted ${seeded.length} menu items successfully.`)
    } else {
      console.log(`[seed] Menu already contains ${existingCount} items — skipping seed.`)
    }

    app.listen(PORT, () => {
      console.log('╔════════════════════════════════════════════════════════╗')
      console.log(`  🎨 Morrow Café API  ·  Server running on port ${PORT}`)
      console.log(`  🔗 Local:       http://localhost:${PORT}`)
      console.log(`  🩺 Health:      http://localhost:${PORT}/api/health`)
      console.log(`  🧾 Menu:        http://localhost:${PORT}/api/menu`)
      console.log('╚════════════════════════════════════════════════════════╝')
    })
  })
  .catch((err) => {
    console.error('Server initialization failed: ', err)
    process.exit(1)
  })
