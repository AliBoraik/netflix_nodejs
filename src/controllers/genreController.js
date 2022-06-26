const createError = require("../errors/createError");
const queries = require("../queries/genreQueries");
const db = require("../database/db");
const {randomUUID} = require("crypto");

class GenreController {
    async addGenre(req, res, next) {
        const {genreName} = req.body
        if (!genreName)
            return next(new createError(400, 'Not found genreName'));

        const findOne = await db.query(queries.findGenre, [genreName])
        if (findOne.error)
            return next(new createError(401, findOne.error));

        if (findOne.rows.length !== 0)
            return next(new createError(401, `Genre with name ${genreName} already exist`));

        const result = await db.query(queries.addGenre, [randomUUID(), genreName])
        if (result.error) return next(new createError(401, result.error));

        return res.status(200).json({
            message: `Genre with name ${genreName} added`
        })
    }

    async deleteGenre(req, res, next) {
        const {id} = req.body

        const findOne = await db.query(queries.findGenreById, [id])

        if (findOne.rows.length === 0)
            return next(new createError(401, `Not found genre!!`));

        const result = await db.query(queries.deleteGenre, [id])

        if (result.error) return next(new createError(401, 'Genre not found!!'));

        return res.status(200).json({
            message: `Genre deleted`
        })
    }

    async renameGenre(req, res, next) {
        const {id, newName} = req.body

        const findOne = await db.query(queries.findGenreById, [id])

        if (findOne.rows.length === 0)
            return next(new createError(401, `Not found genre!!`));

        const result = await db.query(queries.renameGenre, [newName, id])
        if (result.error) return next(new createError(401, result.error));

        return res.status(200).json({
            message: `Genre renamed`
        })
    }
    async getAllGenres(req, res, next) {
        const result = await db.query(queries.getAllGenres)
        return res.status(200).json(result.rows)
    }
}


module.exports = new GenreController();