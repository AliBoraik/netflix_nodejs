// this file for admin sql queries ...
const addEpisode = 'insert into "Episodes" ("Id", "Title", "SerialId", "Duration", "Number", "VideoLink", "PreviewVideo") values ($1,$2,$3,$4,$5,$6,$7)';
const deleteEpisode = 'delete from "Episodes" where "Id" = $1'
const updateEpisode = 'update "Episodes" set "Title" = $2, "SerialId" = $3, "Duration" = $4, "Number" = $5, "VideoLink" = $6, "PreviewVideo" = $7 where "Id" = $1';
const findEpisode = 'select * from "Episodes" where "Title" = $1';
const findEpisodeById = 'select * from "Episodes" where "Id" = $1';
const getEpisodeBySerialId = 'select * from "Episodes" where "SerialId" = $1';


module.exports = {
  addEpisode,
  deleteEpisode,
  updateEpisode,
  findEpisode,
  findEpisodeById,
  getEpisodeBySerialId
};
