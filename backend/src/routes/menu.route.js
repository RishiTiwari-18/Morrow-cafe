import express from 'express'
import {
  getMenu,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  seedMenuIfEmpty,
} from '../controllers/menu.controller.js'

const menuRouter = express.Router()

menuRouter.route('/').get(getMenu).post(createMenuItem)
menuRouter.route('/seed').post(seedMenuIfEmpty)
menuRouter
  .route('/:id')
  .get(getMenuItemById)
  .patch(updateMenuItem)
  .delete(deleteMenuItem)

export default menuRouter
