// this file for beanies logic
const db = require("../database/db");
const queries = require("../queries/episodeQueries");
const createError = require("../errors/createError");
const {randomUUID} = require("crypto");

class episodesController {
    async addEpisode(req, res, next) {
        const {id,title, serialId, duration, number, videoLink, previewVideo} = req.body

        if(typeof id == "undefined"){
            const result = await db.query(queries.addEpisode, [randomUUID(), title, serialId, duration, number, videoLink, previewVideo])
            if (result.error) return next(new createError(500, result.error));

            return res.status(200).json({
                message: `Episode with name ${title} added`
            })
        }


        const findOne = await db.query(queries.findEpisodeById, [id])
        if (findOne.error)
            return next(new createError(500, findOne.error));
        console.log(findOne.rows[0].Id)

        if (findOne.rows.length !== 0){
            const result =  await db.query(queries.updateEpisode, [findOne.rows[0].Id, title, serialId, duration, number, videoLink, previewVideo]);

            return res.status(200).json({
                message: `Episode with name ${title} updated`
            })

        }



    }

    async deleteEpisode(req, res, next) {
        const {id} = req.body

        const findOne = await db.query(queries.findEpisodeById, [id])

        if (findOne.rows.length === 0)
            return next(new createError(404, `Not found episode!!`));

        const result = await db.query(queries.deleteEpisode, [id])

        if (result.error) return next(new createError(500, 'Episode delete error!!'));

        return res.status(200).json({
            message: `Episode deleted`
        })
    }

    async updateEpisode(req, res, next) {
        const {id, title, serialId, duration, number, videoLink, previewVideo} = req.body

        const findOne = await db.query(queries.findEpisodeById, [id])

        if (findOne.rows.length === 0)
            return next(new createError(404, `Not found episode!!`));

        const result = await db.query(queries.updateEpisode, [id, title, serialId, duration, number, videoLink, previewVideo])
        if (result.error) return next(new createError(500, result.error));

        return res.status(200).json({
            message: `Episode updated`
        })
    }
    
    async getEpisodeBySerialId(req, res, next) {
        const serialId = req.query.serialId
        const episodeSerialId = await db.query(queries.getEpisodeBySerialId, [serialId])
        
        if (episodeSerialId.rows.length === 0)
            return next(new createError(404, `Not found episode!!`));
        return res.status(200).json(episodeSerialId.rows)
    }
}

module.exports = new episodesController();
