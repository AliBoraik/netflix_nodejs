// this file for sql queries ...
const push = 'insert into "Reviews" ("Id", "UserName", "ContentId", "Text", "Rating", "PublishTime", "Status") values ($1,$2,$3,$4,$5,$6,$7)';
const remove = 'delete from "Reviews" where "Id" = $1;';
const getAll = 'select * from "Reviews"';
const getById = 'select * from "Reviews" where "Id" = $1';
const getByContentID = 'select * from "Reviews" where "ContentId" = $1';
const changeStatus = 'update "Reviews" set "Status" = $1 where "Id" = $2';
const getAllByStatus = 'select * from "Reviews" where "Status" = $1;';

module.exports = {
    push,
    getAll,
    getById,
    remove,
    getByContentID,
    changeStatus,
    getAllByStatus
};
