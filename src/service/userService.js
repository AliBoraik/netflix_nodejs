const db = require("../database/db");
const queries = require("../queries/userQueries");
const createError = require("../errors/createError");
const roleDto = require("../models/roleDTO")
const {randomUUID} = require("crypto");

class UserService {
    async findOne(email){
        const user = await db.query(queries.findUser, [email])
        if (user.error) return null
        if (user.rows.length === 0) return null;
        return user.rows[0];
    }
    async findOneById(userId){
        const user = await db.query(queries.findUserById, [userId])
        if (user.error) return null
        if (user.rows.length === 0) return null;
        return user.rows[0];
    }
    async save(userDTO){
        const user = await db.query(queries.addUser, [userDTO.Id,userDTO.Email,userDTO.Password,userDTO.UserName,userDTO.NormalizedUserName,userDTO.Avatar, userDTO.NormalizedEmail])
        if (user.error) return null
        await db.query(queries.addUserRole, [userDTO.Id,'2'])
        return user.rows[0];
    }
    async saveToken(userId,accessToken){
        const user = await db.query(queries.saveToken, [userId,accessToken])
        if (user.error) return null
    }
    async hasToken(userId){
        const user = await db.query(queries.hasToken, [userId])
        if (user.error) return null
        return user.rows[0].Value;
    }
    async blockUser(userId){
        const user = await db.query(queries.blockUser, [userId])
        if (user.error) return null
        return user.rows[0];
    }
    async unblockUser(userId){
        const user = await db.query(queries.unblockUser, [userId])
        if (user.error) return null
        return user.rows[0];
    }
    async allUsers(){
        const result = await db.query(queries.allUsers)
        if (result.error) return null
        return result.rows;
    }
    async getRole(userId){
        const results = await db.query(queries.getUserRole, [userId])
        if (results.error)
            return null
        return results.rows.map(r => {
            return new roleDto(
                r.Id,
                r.Name
            )
        })
    }
    async addUserSubscription(UserId){
        const Id = randomUUID()
        const SubscriptionId = 1
        const StartDate = new Date();
        const FinishDate = new Date(StartDate)
        FinishDate.setMonth(FinishDate.getMonth() + 1 )

        const user = await db.query(queries.addSubscription, [Id,UserId,SubscriptionId,StartDate,FinishDate])

        if (user.error)  return null
        if (user.rows.length === 0) return null;
        return user.rows[0];
    }

}

module.exports = new UserService();