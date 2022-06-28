require("dotenv").config();
const createError = require("../errors/createError");
const db = require("../database/db");
const queries = require("../queries/rolesQueries");
const {randomUUID} = require("crypto");

class RolesController {

    async all(req,res,next){
        try {
            const results = await db.query(queries.allRoles)
            if (results.error)
                return next(new createError(401, results.error))
            return res.status(200).json(results.rows)
        }catch (e) {
            return next(new createError(400, e.message))
        }
    }


    async createRole(req,res,next){
        try {
            const {roleName} = req.body
            const results = await db.query(queries.addRoles, [randomUUID(), roleName])
            if (results.error)
                return next(new createError(401, results.error))
            return res.status(200).json({
                roleName : roleName
            })
        }catch (e) {
            return next(new createError(400, e.message))
        }
    }
    async removeRoles(req,res,next){
        try {
            const {roleId} = req.body

            const ch = await db.query(queries.setToUserRole, [roleId])
            if (ch.error)
                return next(new createError(401, ch.error))

            const results = await db.query(queries.removeRoles, [roleId])
            if (results.error)
                return next(new createError(401, results.error))
            return res.status(200).json({
                roleId: roleId
            })
        }catch (e) {
            return next(new createError(400, e.message))
        }
    }
    async assignRole(req,res,next){
        try {
            const {userId,roleId} = req.body
            const results = await db.query(queries.addRoleToUser, [userId,roleId])
            if (results.error)
                return next(new createError(401, results.error))
            return res.status(200).json({
                roleId: roleId
            })
        }catch (e) {
            return next(new createError(400, e.message))
        }
    }

    async getRole(req,res,next){
        try {
            console.log(req)
            const {userId} = req.head
            const results = await db.query(queries.getUserRole, [userId])
            if (results.error)
                return next(new createError(401, "Not found roles!!"))
            return res.status(200).json(results.rows)
        }catch (e) {
            return next(new createError(400, e.message))
        }
    }

}


module.exports = new RolesController();