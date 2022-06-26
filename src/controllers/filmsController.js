const db = require("../database/db");
const queries = require("../queries/filmsQueries");
const createError = require("../errors/createError");
const {randomUUID} = require("crypto");
const filmDto = require("../models/filmDto")

class filmsController {
    async addFilm(req, res, next) {
        const {poster, title, duration, ageRating, userRating, description, videoLink, preview, genres} = req.body
        
        const findFilm = await db.query(queries.findFilm, [title])
        if (findFilm.error)
            return next(new createError(400, findFilm.error));
        if (findFilm.rows.length !== 0)
            return next(new createError(500, `Film with name ${title} already exist`));

        const generatedUUID = randomUUID()
        // check genders
        for (const genreName of genres) {
            const findGender = await db.query(queries.findGender, [genreName])

            if (findGender.rows.length === 0)
                return next(new createError(500, `Gender with name ${genreName} not found`));
        }
        // add genders
       for (const genreName of genres) {
           await db.query(queries.addFilmGenre, [randomUUID(), genreName, generatedUUID]);
       }
       // add film
        const filmAddResult = await db.query(queries.addFilm, [generatedUUID, poster, title, duration, ageRating, userRating, description, videoLink, preview])
        if (filmAddResult.error)
            return next(new createError(500, filmAddResult.error));
        
        return res.status(200).json({
            message: `Film with name ${title} and genres added`
        })

    }

    async deleteFilm(req, res, next) {
        const {id} = req.body

        const findOne = await db.query(queries.findFilmById, [id])

        if (findOne.rows.length === 0)
            return next(new createError(404, `Not found film!!`));

        const result = await db.query(queries.deleteFilm, [id])
        if (result.error) return next(new createError(500, 'Error deleting film!'));
        const filmGenreDeleteResult = await db.query(queries.deleteFilmGenre, [id])
        if (filmGenreDeleteResult.error) return next(new createError(500, 'Error deleting film!'));

        return res.status(200).json({
            message: `Film and genres deleted`
        })
    }

    async updateFilm(req, res, next) {
        const {id, poster, title, duration, ageRating, userRating, description, videoLink, preview, genres} = req.body

        const findOneDelete = await db.query(queries.findFilmById, [id])

        if (findOneDelete.rows.length === 0)
            return next(new createError(404, `Not found film!!`));

        const result = await db.query(queries.deleteFilm, [id])
        if (result.error) return next(new createError(500, 'Error deleting film!'));
        const filmGenreDeleteResult = await db.query(queries.deleteFilmGenre, [id])
        if (filmGenreDeleteResult.error) return next(new createError(500, 'Error deleting film!'));

        const findFilm = await db.query(queries.findFilm, [title])
        if (findFilm.error)
            return next(new createError(400, findFilm.error));
        if (findFilm.rows.length !== 0)
            return next(new createError(500, `Film with name ${title} already exist`));

        // check genders
        for (const genreName of genres) {
            const findGender = await db.query(queries.findGender, [genreName])

            if (findGender.rows.length === 0)
                return next(new createError(500, `Gender with name ${genreName} not found`));
        }
        // add genders
        for (const genreName of genres) {
            await db.query(queries.addFilmGenre, [randomUUID(), genreName, id]);
        }
        // add film
        const filmAddResult = await db.query(queries.addFilm, [id, poster, title, duration, ageRating, userRating, description, videoLink, preview])
        if (filmAddResult.error)
            return next(new createError(500, filmAddResult.error));

        return res.status(200).json({
            message: `Film with name ${title} and genres added`
        })


        return res.status(200).json({
            message: `Film and genre updated`
        })
    }
    
    async getAllFilms(req, res, next) {
        const result = await db.query(queries.getAllFilms)

        const allFilms = result.rows;
        if (allFilms.length === 0)
            return next(new  createError(400,'Films not founds'))

        let filmsWithGenders = []

        for (const film of allFilms) {

            const f = new filmDto()
                .setId(film.Id)
                .setTitle(film.Title)
                .setPoster(film.Poster)
                .setDuration(film.Duration)
                .setAgeRation(film.AgeRating)
                .setUserRating(film.UserRating)
                .setDescriptions(film.Description)
                .setVideoLink(film.VideoLink)
            const result = await db.query(queries.findAllGenreVideos,[f.Id])
            f.setGenrers(result.rows)

            filmsWithGenders.push(f)
        }

        return res.status(200).json(filmsWithGenders)
    }

}

module.exports = new filmsController();
