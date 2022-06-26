// this file for admin sql queries ...
const getUserIdByToken = 'select "UserId" from "AspNetUserTokens" where "Value" = $1';
const getRoleName = 'select "Name" from "AspNetRoles" r join "AspNetUserRoles" ur on r."Id" =ur."RoleId" where ur."UserId" = $1';
const findUser = 'select "Id","Avatar","UserName","NormalizedUserName","Email","NormalizedEmail","EmailConfirmed","PasswordHash" from "AspNetUsers" where "Email" = $1';
const findUserById = 'select "Id","Avatar","UserName","NormalizedUserName","Email","NormalizedEmail","EmailConfirmed","PasswordHash" from "AspNetUsers" where "Id" = $1';
const addUser = 'insert into "AspNetUsers" ("Id","Email","PasswordHash","UserName","NormalizedUserName","Avatar","NormalizedEmail","Status","EmailConfirmed") values ($1,$2,$3,$4,$5,$6,$7,\'access\',false);';
const saveToken = 'insert into "AspNetUserTokens" ("UserId", "LoginProvider", "Name", "Value") values ($1,\'user\',\'accessToken\',$2)';
const hasToken = 'select "Value" from "AspNetUserTokens" where "UserId" = $1';
const addUserRole = 'insert into "AspNetUserRoles" ("UserId", "RoleId") values ($1,$2);'
const blockUser = 'update "AspNetUsers" set "Status" = \'blocked\' where "Id" = $1;';
const unblockUser = 'update "AspNetUsers" set "Status" = \'access\' where "Id" = $1;';
const isBlocked = 'select "LoginProvider" from "AspNetUserTokens" where "UserId" = $1';
const allUsers = 'select * from "AspNetUsers"';
const getUserRole = 'select "Id", "Name" from "AspNetRoles" join "AspNetUserRoles" ANRC on "AspNetRoles"."Id" = ANRC."RoleId" where "UserId" = $1';
const addSubscription = 'insert into "UserSubscriptions" ("Id", "UserId", "SubscriptionId", "StartDate", "FinishDate") values ($1,$2,$3,$4,$5)';
module.exports = {
    getUserIdByToken,
    getRoleName,
    findUser,
    findUserById,
    addUser,
    saveToken,
    hasToken,
    addUserRole,
    blockUser,
    unblockUser,
    isBlocked,
    allUsers,
    getUserRole,
    addSubscription
};
