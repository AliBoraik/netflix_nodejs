const {validationResult} = require('express-validator');
const createError = require("../errors/createError");
const db = require("../database/db");
const queries = require("../queries/reviewQueries");
const {randomUUID} = require("crypto");


class ReviewController {
    async allReview(req, res, next) {
        const result = await db.query(queries.getAll)
        if (result.error)
            return next(new createError(401), result.error)
        if (result.rows.length === 0)
            return next(new createError(400, 'Not found reviews!!'))

        res.status(200).json(result.rows)
    }

    async publicReview(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const Id = randomUUID()
        const UserName = req.body.UserName
        const ContentId = req.body.ContentId
        const Text = req.body.Text
        const Rating = req.body.Rating
        const PublishTime = new Date()
        const Status = "pending"


        const result = await db.query(queries.push, [Id, UserName, ContentId, Text, Rating, PublishTime,Status])
        if (result.error)
            return next(new createError(401), result.error)
        res.status(200).json({
            message: 'Add review succeeded'
        })
    }

    async removeReview(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const Id = req.body.Id
        const findOne = await db.query(queries.getById, [Id])
        await setRating(Id)

        if (findOne.rows.length === 0)
            return next(new createError(401, `review with id ${Id} not found!!`))

        const result = await db.query(queries.remove, [Id])

        if (result.error) return next(new createError(401, 'Review not found!!'));

        return res.status(200).json({
            message: `Delete succeeded`
        })
    }

    async allByConId(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const ContentId = req.body.ContentId
        const result = await db.query(queries.getByContentID, [ContentId])

        if (result.error && result.rows.length === 0)
            return next(new createError(401, 'Review not found!'));

        return res.status(200).json(result.rows)
    }
    async accept(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const Id = req.body.Id
        const findReview = await db.query(queries.getById, [Id])

        if (findReview.rows.length === 0)
            return next(new createError(401, `Review with id ${Id} not found!!`))
        const Status = "accepted"
        const result = await db.query(queries.changeStatus, [Status,Id])
        if (result.error) return next(new createError(401, result.error));

        return res.status(200).json({
            message: `Review accepted`
        })
    }
    async reject(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const Id = req.body.Id
        const findOne = await db.query(queries.getById, [Id])

        if (findOne.rows.length === 0)
            return next(new createError(401, `Review with id ${Id} not found!!`))
        const Status = "canceled"
        const result = await db.query(queries.changeStatus, [Status,Id])
        if (result.error) return next(new createError(401, result.error));

        return res.status(200).json({
            message: `Review rejected`
        })
    }
    async pending(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new createError(400, errors));
        }
        const Id = req.body.Id
        const find = await db.query(queries.getById, [Id])

        if (find.rows.length === 0)
            return next(new createError(401, `Review with id ${Id} not found!!`))
        const Status = "pending"
        const result = await db.query(queries.changeStatus, [Status,Id])
        if (result.error) return next(new createError(401, result.error));


        return res.status(200).json({
            message: `Review on pending`
        })
    }
    async allByStatus(req, res, next) {

        const status = req.query.status

        const result = await db.query(queries.getAllByStatus,[status])
        if (result.error)
            return next(new createError(401), 'The status is not correct')

        res.status(200).json(result.rows)
    }

}



module.exports = new ReviewController();