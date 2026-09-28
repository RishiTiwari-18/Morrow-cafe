import mongoose, { Schema } from 'mongoose'

const menuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      unique: true,
      maxlength: [120, 'Name must be 120 characters or fewer'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
      trim: true,
    },
    priceValue: {
      type: Number,
      required: [true, 'Price numeric value is required'],
      min: [0, 'Price must be non-negative'],
    },
    typeLabel: {
      type: String,
      required: [true, 'Type label is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'At least one flavor tag is required'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Please add at least one flavor tag',
      },
    },
    category: {
      type: String,
      enum: ['Coffee', 'Pastry', 'Beverage', 'Food'],
      default: 'Coffee',
    },
    active: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const MenuItem = mongoose.model('MenuItem', menuItemSchema)
