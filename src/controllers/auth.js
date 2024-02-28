"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const jwt = require('jsonwebtoken')

const User = require('../models/user')

module.exports = {

    login: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            _swagger.deprecated = true
            _swagger.ignore = true
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: 'test',
                    password: '1234'
                }
            }
        */

        const { username, password } = req.body

        if (username && password) {

            const user = User.findOne({ username, password })

            if (user) {

                if (user.isActive) {

                    // res.send({
                    //     error: false,
                    //     token: {
                    //         access: jwt.sign(user, process.env.ACCESS_KEY, { expiresIn: '10m' }),
                    //         refresh: jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: '3d' })
                    //     }
                    // })

                    const data = {
                        access: jwt.sign(user, process.env.ACCESS_KEY, { expiresIn: '10m' }),
                        refresh: jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: '3d' }),
                        shortExpiresIn: '10m',
                        longExpiresIn: '30d'
                    }

                    res.send({
                        error: false,
                        token: {
                            access: jwt.sign(data.access, process.env.ACCESS_KEY, { expiresIn: data.shortExpiresIn }),
                            refresh: jwt.sign(data.refresh, process.env.REFRESH_KEY, { expiresIn: data.longExpiresIn })
                        }
                    })

                } else {
                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }

            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }

        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        }

    },

    refresh: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Token Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    token: {
                        refresh: '...refreshToken...'
                    }
                }
            }
        */

    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */

    }
}