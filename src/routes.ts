import express from 'express'
import authController from './controllers/authController'

const routes = express.Router();

routes.post('/login', authController.login)
routes.post('/register', authController.register)

export default routes; 