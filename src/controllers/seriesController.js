// this file for beanies logic
const db = require("../database/db");
const queries = require("../queries/seriesQueries");
const filmsQueries = require("../queries/filmsQueries");
const createError = require("../errors/createError");
const tokenService = require("../service/tokenService")
const {randomUUID} = require("crypto");
const serialDTO = require("../models/serialDTO");

class seriesController {
    async addSerial(req, res, next) {
        const {poster, title, numEpisodes, ageRating, userRating, description,genres} = req.body

        const findOne = await db.query(queries.findSerial, [title])
        if (findOne.error)
            return next(new createError(500, findOne.error));

        if (findOne.rows.length !== 0)
            return next(new createError(400, `Serial with name ${title} already exist`));

        const serialId = randomUUID()
        // check genders
        for (const genreName of genres) {
            const findGender = await db.query(filmsQueries.findGender, [genreName])

            if (findGender.rows.length === 0)
                return next(new createError(500, `Gender with name ${genreName} not found`));
        }
        // add genders
        for (const genreName of genres) {
            await db.query(filmsQueries.addFilmGenre, [randomUUID(), genreName, serialId]);
        }

        const result = await db.query(queries.addSerial, [serialId, poster, title, numEpisodes, ageRating, userRating, description])
        if (result.error) return next(new createError(500, result.error));

        return res.status(200).json({
            message: `Serial with name ${title} added`
        })

    }

    async deleteSerial(req, res, next) {
        const {id} = req.body

        const findOne = await db.query(queries.findSerialById, [id])

        if (findOne.rows.length === 0)
            return next(new createError(404, `Not found serial!!`));

        const result = await db.query(queries.deleteSerial, [id])

        if (result.error) return next(new createError(500, 'Unable to delete serial!!'));

        return res.status(200).json({
            message: `Serial deleted`
        })
    }

    async updateSerial(req, res, next) {
        const {id, poster, title, numEpisodes, ageRating, userRating, description, genres} = req.body

        const find = await db.query(queries.findSerialById, [id])

        if (find.rows.length === 0)
            return next(new createError(404, `Not found serial!!`));

        const deleteSer = await db.query(queries.deleteSerial, [id])

        const findOne = await db.query(queries.findSerial, [title])
        if (findOne.error)
            return next(new createError(500, findOne.error));

        if (findOne.rows.length !== 0)
            return next(new createError(400, `Serial with name ${title} already exist`));

        const serialId = id
        // check genders
        for (const genreName of genres) {
            const findGender = await db.query(filmsQueries.findGender, [genreName])

            if (findGender.rows.length === 0)
                return next(new createError(500, `Gender with name ${genreName} not found`));
        }
        // add genders
        for (const genreName of genres) {
            await db.query(filmsQueries.addFilmGenre, [randomUUID(), genreName, serialId]);
        }

        const result = await db.query(queries.addSerial, [serialId, poster, title, numEpisodes, ageRating, userRating, description])
        if (result.error) return next(new createError(500, result.error));

        return res.status(200).json({
            message: `Serial updated`
        })
    }
    
    async getAllSerials(req, res, next) {
        const result = await db.query(queries.getAllSerials)

        const allSerials = result.rows;
        if (allSerials.length === 0)
            return next(new  createError(400,'Serials not founds'))

        let serialsWithGenders = []

        for (const film of allSerials) {

            const s = new serialDTO()
                .setId(film.Id)
                .setTitle(film.Title)
                .setPoster(film.Poster)
                .setNumEpisodes(film.NumEpisodes)
                .setAgeRation(film.AgeRating)
                .setUserRating(film.UserRating)
                .setDescriptions(film.Description)
            const result = await db.query(filmsQueries.findAllGenreVideos,[s.Id])
            s.setGenrers(result.rows)

            serialsWithGenders.push(s)
        }

        return res.status(200).json(serialsWithGenders)
    }
}

module.exports = new seriesController();
