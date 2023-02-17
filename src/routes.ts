import express from 'express'
import authController from './controllers/authController'
import { verifyToken } from './middlewares/auth';

const routes = express.Router();

routes.post('/login', authController.login)
routes.post('/register', authController.register)
routes.put('/users/:id', verifyToken , authController.updateUser)
routes.get('/users/:id', verifyToken, authController.listUser)
routes.delete('/users/:id', verifyToken, authController.deleteUser)

export default routes;