import { Request, Response } from 'express'
import Validozer from 'validozer'
import { compare, hash } from 'bcryptjs'
import { createToken, refreshToken, setRefreshToken  } from '../utils/auth'
import User from '../model/user'
import { verify } from 'jsonwebtoken'
import { UserRole } from '../entity/user'
import fetch from 'node-fetch'

export default class AuthController {

    public static async clientLogin(request: Request, response: Response) {
        AuthController.login(request, response, UserRole.ADMIN)
    }

    public static async adminLogin(request: Request, response: Response) {
        AuthController.login(request, response, UserRole.CLIENT)
    }

    public static async login(request: Request, response: Response, role: UserRole) {

        const data = request.body

        const rules = {
            email: {
                label: "E-mail",
                rules: "required|email",
            },
            password: {
                label: "Password",
                rules: "required"
            },
        }

        const validator = Validozer.make(data, rules)

        if(validator.fails()) {
            const errors = validator.errors().values()

            return response.status(200).send({
                status: "error",
                message: [...errors]
            })
        }
        try {
            const user = await User.where('email', data.email).first()
            
            if(!user.hasItem || user.roles?.includes(role)) {
                return response.status(200).send({
                    status: "error",
                    message: "Invalid user"
                });
            }
            const activity = user.activity().create()

            const valid = await compare(data.password, user.password!)

            if(!valid) {
                activity.description = "you've attempt to login but failed!"
                await activity.save()

                return response.status(200).send({
                    status: "error",
                    message: "Incorrect password"
                });
            }

            activity.description = "you have log in!"
            await activity.save()

            setRefreshToken(response, refreshToken(user))
            
            return response.status(200).send({
                status: "ok",
                accessToken: createToken(user)
            });
        } catch (error) {
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

    public static async registration(request: Request, response: Response) {
        const data = request.body
        const rules = {
            name: {
                label: "Name",
                rules: "required|alpha_space",
            },
            email: {
                label: "E-mail",
                rules: "required|email",
            },
            password: {
                label: "Password",
                rules: "required|min:8|max:20"
            },
            confirm: {
                label: "Comfirm Password",
                rules: "required|same:password@Password"
            }
        }

        const validator = Validozer.make(data, rules)

        if(validator.fails()) {
            const errors = validator.errors().values()

            return response.status(200).send({
                status: "error",
                message: [...errors]
            })
        }

        try {
            const githubUser = await fetch(`https://api.github.com/users/${data.name}`).then(response => response.json())

            if(githubUser.message === "Not Found") {
                return response.status(200).send({
                    status: "error",
                    message: "Username doesn't exist on github"
                })
            }

            const exist = await User.where('email', data.email).first()

            if(exist.hasItem) {
                return response.status(200).send({
                    status: "error",
                    message: "E-mail was already taken"
                })
            }

            const user = new User()
            user.name = data.name
            user.email = data.email
            user.password = await hash(data.password, 12)
            user.token_version = 1
            user.roles = [UserRole.CLIENT]
            await user.save()

            const activity = user.activity().create()
            activity.description = "you have been registered!"
            await activity.save()

            return response.status(203).send({
                status: "ok", 
                id: user.id
            });
        } catch (error) {
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

    public static async changePassword(request: Request, response: Response) {
        const data = request.body
        const rules = {
            password: {
                label: "Password",
                rules: "required|min:8|max:20"
            },
            confirm: {
                label: "Comfirm Password",
                rules: "required|same:password@Password"
            }
        }

        const validator = Validozer.make(data, rules)

        if(validator.fails()) {
            const errors = validator.errors().values()

            return response.status(200).send({
                status: "error",
                message: [...errors]
            })
        }
        try {
            const { payload } = response.locals

            if(!payload) {
                return response.status(200).send({
                    status: "error",
                    message: "can't revoke without a proper token"
                });
            }

            const user = await User.find(payload.uid)

            if(!user.hasItem || payload.token_version !== user.token_version) {
                return response.status(200).send({
                    status: "error",
                    message: "can't revoke without a proper token"
                });
            }

            user.password = await hash(data.password, 12)

            await user.save()

            const activity = user.activity().create()

            activity.description = "you have change your password!"

            await activity.save()

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

    public static async refreshToken(request: Request, response: Response) {
        try {
            const token = request.cookies.jsid

            let payload: any
            
            try {
                payload = await verify(token, process.env.REFRESH_TOKEN_SECRET!)
            } catch(error) {
                return response.status(200).send({
                    status: "ok",
                    accessToken: ""
                })
            }

            const user = await User.find(payload.uid)

            if(!user.hasItem || payload.token_version !== user.token_version) {
                return response.status(200).send({
                    status: "ok",
                    accessToken: ""
                })
            }

            setRefreshToken(response, refreshToken(user))

            return response.status(200).send({
                status: "ok",
                accessToken: createToken(user)
            })
        } catch(error) {
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

    public static async revokeToken(_request: Request, response: Response) {
        try {
            const { payload } = response.locals

            if(!payload) {
                return response.status(200).send({
                    status: "error",
                    message: "can't revoke without a proper token"
                });
            }

            const user = await User.find(payload.uid)

            if(!user.hasItem || payload.token_version !== user.token_version) {
                return response.status(200).send({
                    status: "error",
                    message: "can't revoke without a proper token"
                });
            }

            user.token_version! += 1

            await user.save()

            const activity = user.activity().create()

            activity.description = "you have been log out!"

            await activity.save()

            return response.status(200).send({
                status: "ok",
                message: "token has been revoke"
            })
        } catch(error) {
            return response.status(500).send({
                status: "error",
                message: error.message
            });
        }
    }

}