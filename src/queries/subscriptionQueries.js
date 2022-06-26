// this file for admin sql queries ...
const addSubs = 'insert into "Subscriptions" ("Name", "Cost") values ($1,$2)';
const deleteSubs = 'delete from "Subscriptions" where "Id" = $1';
const renameSubs = 'update "Subscriptions" set "Name" = $1 where "Id" = $2';
const setCost = 'update "Subscriptions" set "Cost" = $1 where "Id" = $2';
const editAll = 'update "Subscriptions" set "Name" = $1,"Cost" = $2 where "Id" = $3';
const findSubsById = 'select * from "Subscriptions" where "Id" = $1';
const getAllSubs = 'select * from "Subscriptions"';
const findSubsName = 'select * from "Subscriptions" where "Name" = $1';
const setSubs = 'insert into "UserSubscriptions" ("Id", "UserId", "SubscriptionId", "StartDate", "FinishDate") values ($1,$2,$3,$4,$5)';
const findUserSubs = 'select * from "UserSubscriptions" where "Id" = $1';
const updateFinishDateUserSubs = 'update "UserSubscriptions" set "FinishDate" = $1 where "Id" = $2';
const findUserSubsByUserId = 'select * from "UserSubscriptions" where "UserId" = $1';
const getAllUserSubs = 'select "AspNetUsers"."Id","Email","UserName","Avatar","Status",ANUR."Id" as "UserSubscriptionId",ANUR."SubscriptionId",ANUR."StartDate",ANUR."FinishDate" from "AspNetUsers"  join "UserSubscriptions" ANUR on "AspNetUsers"."Id" = ANUR."UserId"';
const updateSubscriptionId = 'update "UserSubscriptions" set "SubscriptionId" = $1 where "UserId" = $2'

module.exports = {
    addSubs,
    deleteSubs,
    renameSubs,
    findSubsById,
    setCost,
    editAll,
    getAllSubs,
    findSubsName,
    setSubs,
    findUserSubs,
    updateFinishDateUserSubs,
    findUserSubsByUserId,
    getAllUserSubs,
    updateSubscriptionId
};
