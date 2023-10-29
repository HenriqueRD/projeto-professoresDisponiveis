import express from 'express'
import routes from './routes'

const api = express()

api.listen(3333)
api.use(express.json())
api.use(routes)