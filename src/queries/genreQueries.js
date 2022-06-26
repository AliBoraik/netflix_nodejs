// this file for admin sql queries ...
const addGenre = 'insert into "Genres" ("Id", "GenreName") values ($1,$2)';
const deleteGenre = 'delete from "Genres" where "Id" = $1';
const renameGenre = 'update "Genres" set "GenreName" = $1 where "Id" = $2';
const findGenre = 'select * from "Genres" where "GenreName" = $1';
const findGenreById = 'select * from "Genres" where "Id" = $1';
const getAllGenres = 'select * from "Genres"';

module.exports = {
    addGenre,
    deleteGenre,
    renameGenre,
    findGenre,
    findGenreById,
    getAllGenres
};
