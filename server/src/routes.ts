import { Router, Express } from 'express'
import AuthController from './controller/auth'
import UserController from './controller/user'
import ActivityController from './controller/activity'

export default (app: Express) => {

    const api = Router()

    api.post('/admin/login', AuthController.adminLogin)

    api.post('/login', AuthController.clientLogin)

    api.post('/refresh_token', AuthController.refreshToken)

    api.post('/revoke_token', AuthController.revokeToken)

    api.post('/registration', AuthController.registration)

    api.put('/change_password', AuthController.changePassword)

    api.get('/user', UserController.get)

    api.get('/users', UserController.getPaginated)

    api.post('/user/deactivate', UserController.deactivate)

    api.get('/user/activities', UserController.getUserActivities)

    app.use('/api', api)
}