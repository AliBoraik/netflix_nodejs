// this file for admin sql queries ...
const addRoles = 'insert into "AspNetRoles" ("Id", "Name") values ($1,$2)';
const removeRoles = 'delete from "AspNetRoles" where "Id" = $1';
const addRoleToUser = 'update "AspNetUserRoles" set "RoleId" = $2 where "UserId" = $1';
const allRoles = 'select "Id","Name" from "AspNetRoles"';
const getUserRole = 'select "Id", "Name" from "AspNetRoles" join "AspNetUserRoles" ANRC on "AspNetRoles"."Id" = ANRC."RoleId" where "UserId" = $1';
const setToUserRole = 'update "AspNetUserRoles" set "RoleId" = \'2\' where "RoleId" = $1';



module.exports = {
  addRoles,
  removeRoles,
  addRoleToUser,
  allRoles,
  getUserRole,
  setToUserRole
};
