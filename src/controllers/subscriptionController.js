const {validationResult} = require("express-validator");
const createError = require("../errors/createError");
const db = require("../database/db");
const queries = require("../queries/subscriptionQueries");
const userService = require("../service/userService");
const {randomUUID} = require("crypto");

class SubscriptionController {
    async allSubscriptions(req, res, next) {
        const result = await db.query(queries.getAllSubs)
        if (result.error)
            return next(new createError(401), result.error)
        if (result.rows.length === 0)
            return next(new createError(400, 'Not found subscriptions!!'))

        res.status(200).json(result.rows)
    }

    async allUserSubscriptions(req, res, next) {
        const result = await db.query(queries.getAllUserSubs)
        if (result.error)
            return next(new createError(401), result.error)
        if (result.rows.length === 0)
            return next(new createError(400, 'Not found user subscriptions!!'))
        res.status(200).json(result.rows)
    }

    async addSubscription(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const {name, cost} = req.body
        const findOne = await db.query(queries.findSubsName, [name])
        if (findOne.rows.length !== 0)
            return next(new createError(401, `Subscription with name '${name}' already exists`))

        const result = await db.query(queries.addSubs, [name, cost])

        if (result.error)
            return next(new createError(401, 'Can not add subscription because the data is incorrect'));

        return res.status(200).json({
            message: 'Subscription added'
        })
    }

    async removeSubscription(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const id = req.body.id
        const findOne = await db.query(queries.findSubsById, [id])

        if (findOne.rows.length === 0)
            return next(new createError(401, `Subscription with id '${id}' not found!!`))

        const result = await db.query(queries.deleteSubs, [id])

        if (result.error)
            return next(new createError(401, 'Subscription not found!!'));

        return res.status(200).json({
            message: `Delete succeeded`
        })
    }

    async editSubscription(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const {id, name, cost} = req.body
        const findOne = await db.query(queries.findSubsById, [id])

        if (findOne.rows.length === 0)
            return next(new createError(401, `subscription with id ${id} not found!!`))

        if (name && cost)
            await db.query(queries.editAll, [name, cost, id])
        else if (Name)
            await db.query(queries.renameSubs, [name, id])
        else if (Cost)
            await db.query(queries.setCost, [cost, id])
        else
            return next(new createError(401, `Nothing was found to change!`))

        return res.status(200).json({
            message: 'Subscription has been modified'
        })
    }

    async setUserSubscription(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const {userId, subsId} = req.body

        const findUser = await userService.findOneById(userId)
        if (!findUser)
            return next(new createError(404, `User with id ${userId} not fund`));

        const findSubs = await db.query(queries.findSubsById, [subsId])

        if (findSubs.rows.length === 0)
            return next(new createError(401, `subscription with id ${subsId} not found!!`))

        const findUserSubs = await db.query(queries.findUserSubsByUserId, [userId])
        if (findUserSubs.rows.length !== 0) {
            await db.query(queries.updateSubscriptionId,[subsId,userId])

        } else {
            const Id = randomUUID()
            const StartDate = new Date();
            const FinishDate = new Date(StartDate)
            FinishDate.setMonth(FinishDate.getMonth() + 1)

            await db.query(queries.setSubs, [Id, userId, subsId, StartDate, FinishDate]);
        }

        return res.status(200).json({
            message: 'User subscription has been added'
        })
    }

    async subscriptionRenewal(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const {id} = req.body

        const findOne = await db.query(queries.findUserSubs, [id])

        if (findOne.rows.length === 0)
            return next(new createError(401, `User subscription with id ${id} not found!!`))

        const FinishDate = new Date(findOne.rows[0].FinishDate)
        FinishDate.setMonth(FinishDate.getMonth() + 1)


        await db.query(queries.updateFinishDateUserSubs, [FinishDate, id])

        return res.status(200).json({
            message: 'User subscription has been updated'
        })
    }


}

module.exports = new SubscriptionController();