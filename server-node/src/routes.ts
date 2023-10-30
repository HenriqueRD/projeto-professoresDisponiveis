import express from 'express'
import { create, listClasses } from './controllers/classes_controller'
import { listSubjects } from './controllers/subjects_controller'

const routes = express.Router()

routes.get('/subjects/', listSubjects)

routes.get('/classes/', listClasses)
routes.post('/classes/', create)

export default routes