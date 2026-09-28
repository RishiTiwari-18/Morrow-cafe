import express from 'express'
import { healthcheck } from '../controllers/health.controller.js'

const healthRouter = express.Router()

healthRouter.route('/').get(healthcheck)

export default healthRouter
