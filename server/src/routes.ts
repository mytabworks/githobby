import { Router, Express } from 'express'
import AuthController from './controller/auth'
import UserController from './controller/user'
import ActivityController from './controller/activity'

export default (app: Express) => {

    const api = Router()

    api.post('/refresh_token', AuthController.refreshToken)

    api.post('/revoke_token', AuthController.revokeToken)

    api.post('/login', AuthController.login)

    api.post('/registration', AuthController.registration)

    api.put('/change_password', AuthController.changePassword)

    api.get('/user', UserController.getUser)

    api.post('/user/delete', UserController.deleteUser)

    api.get('/user/activities', UserController.getUserActivities)

    api.get('/activities', ActivityController.getAll)

    api.get('/activity/:id', ActivityController.get)

    api.put('/activity/:id', ActivityController.update)

    api.delete('/activity/:id', ActivityController.delete)

    app.use('/api', api)
}