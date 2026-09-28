import crypto from 'crypto'
import { VoucherClaim } from '../models/voucherClaim.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const DAYS_VALID = 14
const DISCOUNT_AMOUNT = 150

function generateClaimCode() {
  const rand = crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 4)
  return `MORROW-${rand}`
}

function isValidPhone(phone) {
  if (!phone) return false
  const cleaned = phone.replace(/[\s()-]/g, '')
  return /^\+?\d{7,15}$/.test(cleaned)
}

function isValidName(name) {
  if (!name) return false
  const trimmed = name.trim()
  return trimmed.length >= 2 && trimmed.length <= 100
}

const createVoucher = asyncHandler(async (req, res) => {
  const { name, phone } = req.body

  if (!isValidName(name)) {
    throw new ApiError(400, 'Please enter a valid name (2 characters minimum).')
  }

  if (!isValidPhone(phone)) {
    throw new ApiError(400, 'Please enter a valid phone number.')
  }

  const trimmedName = name.trim()
  const trimmedPhone = phone.trim()

  const existingUnredeemed = await VoucherClaim.findOne({
    phone: trimmedPhone,
    redeemed: false,
    expiresAt: { $gt: new Date() },
  })

  if (existingUnredeemed) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {
            claimCode: existingUnredeemed.claimCode,
            discountAmount: existingUnredeemed.discountAmount,
            expiresAt: existingUnredeemed.expiresAt,
            redeemed: existingUnredeemed.redeemed,
            name: existingUnredeemed.name,
            phone: existingUnredeemed.phone,
            message:
              'You already have an active unredeemed invitation. Use the existing code below.',
          },
          'Active voucher retrieved.'
        )
      )
  }

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + DAYS_VALID)

  let claimCode
  let attempts = 0
  while (attempts < 5) {
    claimCode = generateClaimCode()
    const existing = await VoucherClaim.findOne({ claimCode })
    if (!existing) break
    attempts++
  }

  if (!claimCode || attempts >= 5) {
    throw new ApiError(500, 'Unable to generate a unique voucher code at this time.')
  }

  const voucher = await VoucherClaim.create({
    name: trimmedName,
    phone: trimmedPhone,
    claimCode,
    discountAmount: DISCOUNT_AMOUNT,
    redeemed: false,
    expiresAt,
    location: 'Vijay Nagar',
    notes: `Customer name: ${trimmedName}. Web-claimed welcome offer.`,
  })

  if (!voucher) {
    throw new ApiError(500, 'Something went wrong while creating your voucher.')
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        {
          claimCode: voucher.claimCode,
          discountAmount: voucher.discountAmount,
          expiresAt: voucher.expiresAt,
          redeemed: voucher.redeemed,
          name: voucher.name,
          phone: voucher.phone,
          message: 'Your offer has been claimed. Present this code at the counter.',
        },
        'Welcome voucher created successfully.'
      )
    )
})

const getVoucherByCode = asyncHandler(async (req, res) => {
  const { code } = req.params

  if (!code || typeof code !== 'string') {
    throw new ApiError(400, 'Voucher code is required.')
  }

  const voucher = await VoucherClaim.findOne({
    claimCode: code.trim().toUpperCase(),
  })

  if (!voucher) {
    throw new ApiError(404, 'No voucher found with that code.')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, voucher, 'Voucher details retrieved.'))
})

const listVouchers = asyncHandler(async (req, res) => {
  const { redeemed, phone, name, limit = 50, page = 1 } = req.query

  const query = {}
  if (redeemed !== undefined) query.redeemed = redeemed === 'true'
  if (phone) query.phone = { $regex: phone, $options: 'i' }
  if (name) query.name = { $regex: name, $options: 'i' }

  const vouchers = await VoucherClaim.find(query)
    .sort({ createdAt: -1 })
    .limit(Math.min(Number(limit), 200))
    .skip(Math.max(Number(page) - 1, 0) * Math.min(Number(limit), 200))

  const total = await VoucherClaim.countDocuments(query)

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { items: vouchers, pagination: { total, limit: Number(limit), page: Number(page) } },
        'Vouchers list retrieved.'
      )
    )
})

export { createVoucher, getVoucherByCode, listVouchers }
