import express from 'express'
import {
  createVoucher,
  getVoucherByCode,
  listVouchers,
} from '../controllers/voucher.controller.js'

const voucherRouter = express.Router()

voucherRouter.route('/claim').post(createVoucher)
voucherRouter.route('/').get(listVouchers)
voucherRouter.route('/:code').get(getVoucherByCode)

export default voucherRouter
