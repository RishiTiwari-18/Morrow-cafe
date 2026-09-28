import { MenuItem } from '../models/menuItem.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

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

const getMenu = asyncHandler(async (req, res) => {
  const { activeOnly = 'true', featured, category } = req.query

  const query = {}
  if (activeOnly === 'true') query.active = true
  if (featured !== undefined) query.featured = featured === 'true'
  if (category) query.category = category

  const items = await MenuItem.find(query).sort({ createdAt: 1 })

  return res
    .status(200)
    .json(new ApiResponse(200, { items, count: items.length }, 'Menu items retrieved.'))
})

const getMenuItemById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const item = await MenuItem.findById(id)

  if (!item) {
    throw new ApiError(404, 'Menu item not found.')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, item, 'Menu item details retrieved.'))
})

const createMenuItem = asyncHandler(async (req, res) => {
  const payload = req.body

  const newItem = await MenuItem.create(payload)

  return res
    .status(201)
    .json(new ApiResponse(201, newItem, 'Menu item created.'))
})

const updateMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const updated = await MenuItem.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!updated) {
    throw new ApiError(404, 'Menu item not found.')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updated, 'Menu item updated.'))
})

const deleteMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params
  const deleted = await MenuItem.findByIdAndDelete(id)

  if (!deleted) {
    throw new ApiError(404, 'Menu item not found.')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleted, 'Menu item deleted.'))
})

const seedMenuIfEmpty = asyncHandler(async (req, res) => {
  const existing = await MenuItem.countDocuments()
  if (existing > 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { seeded: false, count: existing }, 'Menu already has data.'))
  }

  const seeded = await MenuItem.insertMany(DEFAULT_SEED)
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { seeded: true, count: seeded.length, items: seeded },
        `Seeded ${seeded.length} menu items.`
      )
    )
})

export {
  getMenu,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  seedMenuIfEmpty,
}
