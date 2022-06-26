const {validationResult} = require("express-validator");
require("dotenv").config();
const createError = require("../errors/createError");
const userService = require("../service/userService");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {randomUUID} = require("crypto");
const jwt = require("jsonwebtoken");
const db = require("../database/db");
const queries = require("../queries/userQueries");

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(new createError(400, errors));
            }
            const {email, password, confirmPassword} = req.body

            if (password !== confirmPassword)
                return next(new createError(400, 'The password is incompatible'))

            const findUser = await userService.findOne(email)

            if (findUser)
                return next(new createError(400, `User with email ${email} already exist`))

            const hashPassword = await bcrypt.hash(password, 8)
            const userName = email.split('@')[0];
            const normalizedUserName = userName.normalize();
            const normalizedEmail = email.normalize();
            const Avatar = "https://raw.githubusercontent.com/1dxrpz/video-player-test-js/main/Netflix%20icon.svg"

            const user = new User(randomUUID(), email, hashPassword, userName, normalizedUserName, Avatar, normalizedEmail)

            await userService.save(user)

            const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);

            await userService.saveToken(user.Id, accessToken);

            await userService.addUserSubscription(user.Id)

            return res.status(200).json({
                accessToken: accessToken,
                user: {
                    email: email,
                    password: password
                }
            })

        } catch (e) {
            console.log(e)
            return next(new createError(400, e.message))
        }
    }

    async login(req, res, next) {
        try {

            const {email, password} = req.body

            const user = await userService.findOne(email)

            if (!user)
                return next(new createError(404, `User with email ${email} not fund`))

            if (!bcrypt.compareSync(password, user.PasswordHash))
                return next(new createError(400, 'Invalid password'))

            const role = await userService.getRole(user.Id)
            if (role[0].Name !== "Admin")
                return next(new createError(401,"This is for administrators only !!"))

            let accessToken = await userService.hasToken(user.Id);
            if (!accessToken)
                accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);

            return res.status(200).json({
                accessToken: accessToken,
                user: user,
            })

        } catch (e) {
            console.log(e)
            return next(new createError(400, e.message))
        }
    }

    async Auth(req, res, next) {
        try {
            const user = await userService.findOne(req.user.user.Email)

            const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})

            return res.status(200).json({
                accessToken: accessToken,
                user : user,
            })
        } catch (e) {
            console.log(e)
            return next(new createError(400, 'Server error'))
        }
    }

    async blockUser(req, res, next) {
        try {
            const {email} = req.body
            const user = await userService.findOne(email)

            if (!user)
                return next(new createError(404, `User with email ${email} not found`))

            await userService.blockUser(user.Id)

           return res.status(200).json({
                massage : `User with email ${email} is blocked`
            })
        } catch (e){
            console.log(e)
            return next(new createError(400, e.message))
        }
    }
    async unblockUser(req, res, next) {
        try {
            const {email} = req.body
            const user = await userService.findOne(email)

            if (!user)
                return next(new createError(404, `User with email ${email} not found`))

            await userService.unblockUser(user.Id)

            res.status(200).json({
                massage : `User with email ${email} is unblocked`
            })
        } catch (e){
            console.log(e)
            return next(new createError(400, e.message))
        }
    }
}


module.exports = new AuthController();