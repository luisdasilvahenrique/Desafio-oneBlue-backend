import express from 'express'
import authController from './controllers/authController'
import { verifyToken } from './middlewares/auth';

const routes = express.Router();

routes.post('/login', authController.login)
routes.post('/register', authController.register)
routes.put('/user/:id', verifyToken , authController.updateUser)
routes.get('/users/:id', verifyToken, authController.listUser)
export default routes; 