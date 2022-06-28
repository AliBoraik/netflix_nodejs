const createError = require("../errors/createError");
const userService = require("../service/userService");
const userDto = require("../models/userDTO")

class AuthController {
    async all(req, res, next) {
        try {

            const allUsers = await userService.allUsers()

            if (!allUsers)
                return next(new createError(400, `not found users!!`))

            let usersDto = []

            for (const u of allUsers) {
                usersDto.push(new userDto()
                    .setId(u.Id)
                    .setEmail(u.Email)
                    .setUserName(u.UserName)
                    .setAvatar(u.Avatar)
                    .setEmailConfirmed(u.EmailConfirmed)
                    .setStatus(u.Status)
                    .setRoles(await userService.getRole(u.Id))
                )
            }

            return res.status(200).json(usersDto)

        } catch (e) {
            console.log(e)
            return next(new createError(400, e.message))
        }
    }
}


module.exports = new AuthController();