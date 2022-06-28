// this file for admin sql queries ...
const addSerial = 'insert into "Serials" ("Id", "Poster", "Title", "NumEpisodes", "AgeRating", "UserRating", "Description") values ($1,$2,$3,$4,$5,$6,$7)';
const deleteSerial = 'delete from "Serials" where "Id" = $1'
const updateSerial = 'update "Serials" set "Poster" = $2, "Title" = $3, "NumEpisodes" = $4, "AgeRating" = $5, "UserRating" = $6, "Description" = $7 where "Id" = $1';
const findSerial = 'select * from "Serials" where "Title" = $1';
const findSerialById = 'select * from "Serials" where "Id" = $1';
const getAllSerials = 'select * from "Serials"';


module.exports = {
  addSerial,
  deleteSerial,
  updateSerial,
  findSerial,
  findSerialById,
  getAllSerials
};
