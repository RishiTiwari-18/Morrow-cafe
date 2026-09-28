import mongoose, { Schema } from 'mongoose'

const voucherClaimSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [100, 'Name must be 100 characters or fewer'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      index: true,
      maxlength: [30, 'Phone number must be 30 characters or fewer'],
    },
    claimCode: {
      type: String,
      required: [true, 'Claim code is required'],
      trim: true,
      uppercase: true,
      unique: true,
    },
    discountAmount: {
      type: Number,
      default: 150,
      min: [0, 'Discount must be non-negative'],
    },
    redeemed: {
      type: Boolean,
      default: false,
      index: true,
    },
    redeemedAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      default: 'Vijay Nagar',
    },
    notes: {
      type: String,
      default: '',
      trim: true,
      maxlength: [500, 'Notes must be 500 characters or fewer'],
    },
  },
  {
    timestamps: true,
  }
)

voucherClaimSchema.index({ phone: 1, redeemed: 1 }, { name: 'phone_redeemed_idx' })

export const VoucherClaim = mongoose.model('VoucherClaim', voucherClaimSchema)
