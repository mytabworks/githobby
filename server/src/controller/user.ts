import { Request, Response } from 'express'
import User from '../model/user'
import { verify } from 'jsonwebtoken'
import { UserRole } from '../entity/user'

export default class UserController {

    public static async getPaginated(request: Request, response: Response) {
        try {
            const { sortBy, sortOrder, page = 1 , size = 10, filters } = request.query as any
            const { payload } = response.locals

            if(!payload) {
                return response.status(401).send({
                    status: "error",
                    message: "unauthorized access"
                });
            }

            const user = await User.find(payload.uid)

            if(!user.hasItem || payload.token_version !== user.token_version || !user.roles?.includes(UserRole.ADMIN)) {
                return response.status(401).send({
                    status: "error",
                    message: "unauthorized access"
                });
            }

            let userModel = User.select("*", "id as password")

            if(sortBy) {
                userModel = userModel.orderBy(sortBy, sortOrder)
            }
            const parsedFilters = JSON.parse(filters)
            
            if(parsedFilters && parsedFilters.length) {
                userModel = parsedFilters.reduce((userInstance: typeof userModel, filter: any) => {
                    if(Array.isArray(filter.value)) {
                        return filter.value.reduce((uI: typeof userModel, value: string) => {
                            return uI.where(filter.dataIndex, value)
                        }, userInstance)
                    }
                    return userInstance.where(filter.dataIndex, filter.value)
                }, userModel)
            }

            const users = await userModel.paginate(parseInt(page), parseInt(size))

            return response.status(200).send({
                status: "ok",
                data: users.toJSON(),
                totalCount: users.totalCount()
            })
        } catch(error) {
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

    public static async get(_request: Request, response: Response) {
        try {
            const { payload } = response.locals

            if(!payload) {
                return response.status(401).send({
                    status: "error",
                    message: "unauthorized access"
                });
            }

            const user = await User.find(payload.uid)

            if(!user.hasItem || payload.token_version !== user.token_version) {
                return response.status(401).send({
                    status: "error",
                    message: "unauthorized access"
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

    public static async deactivate(_request: Request, response: Response) {
        try {
            const { payload } = response.locals

            if(!payload) {
                return response.status(401).send({
                    status: "error",
                    message: "unauthorized access"
                });
            }

            const user = await User.find(payload.uid)

            if(!user.hasItem || payload.token_version !== user.token_version) {
                return response.status(401).send({
                    status: "error",
                    message: "unauthorized access"
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
                return response.status(401).send({
                    status: "error",
                    message: "unauthorized access"
                })
            }

            const user = await User.find(payload.uid, ['*'], 'activity')

            if(!user.hasItem || payload.token_version !== user.token_version) {
                return response.status(401).send({
                    status: "error",
                    message: "unauthorized access"
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