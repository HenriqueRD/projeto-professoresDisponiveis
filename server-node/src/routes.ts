import express from 'express'
import { create, list } from './controllers/classes_controller'

const routes = express.Router()

routes.get('/classes/', list)
routes.post('/classes/', create)

export default routes