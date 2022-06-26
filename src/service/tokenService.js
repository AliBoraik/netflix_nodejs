const db = require("../database/db");
const queries = require("../queries/userQueries");

class TokenService {
    async isAdmin(accessToken) {
        await db.query(queries.getUserIdByToken, [accessToken], async (error, results) => {
            if (error || results.rows[0] === undefined ) return false;
            console.log(results.rows[0])
            const userId = results.rows[0].UserId
            console.log(userId)
            if (userId !== null) {
                await db.query(queries.getRoleName, [userId], async (error, results) => {
                    if (error || results.rows[0] === undefined) return false;
                    const roleName = results.rows[0].Name;
                    console.log(roleName)
                    console.log(typeof roleName)
                    if (roleName === "Admin")
                        return true
                })
            }
        });
    }
}

module.exports = new TokenService();