import { Request, Response } from 'express'
import User from '../model/user'
import { verify } from 'jsonwebtoken'
import { UserRole } from '../entity/user'

export default class UserController {

    public static async getUser(_request: Request, response: Response) {
        try {
            const { payload } = response.locals

            if(!payload) {
                return response.status(200).send({
                    status: "error",
                    message: "invalid token"
                });
            }

            const user = await User.find(payload.uid)

            if(!user.hasItem || payload.token_version !== user.token_version) {
                return response.status(200).send({
                    status: "error",
                    message: "user doesn't exist"
                });
            }

            return response.status(200).send({
                status: "ok",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    profile_img: user.profile_img,
                    roles: (user.roles as any).split(",")
                } 
            })
        } catch(error) {
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

    public static async deleteUser(_request: Request, response: Response) {
        try {
            const { payload } = response.locals

            if(!payload) {
                return response.status(200).send({
                    status: "error",
                    message: "invalid token"
                });
            }

            const user = await User.find(payload.uid)

            if(!user.hasItem || payload.token_version !== user.token_version) {
                return response.status(200).send({
                    status: "error",
                    message: "user doesn't exist"
                });
            }

            await user.delete()

            return response.status(200).send({
                status: "ok"
            })
        } catch(error) {
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

    public static async getUserActivities(_request: Request, response: Response) {
        try {
            const { payload } = response.locals

            if(!payload) {
                return response.status(200).send({
                    status: "error",
                    message: "invalid token"
                });
            }

            const user = await User.find(payload.uid, ['*'], 'activity')

            if(!user.hasItem || payload.token_version !== user.token_version) {
                return response.status(200).send({
                    status: "error",
                    message: "user doesn't exist"
                });
            }

            return response.status(200).send({
                status: "ok",
                data: user.$activity?.toJSON()
            })
        } catch(error) {
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

}