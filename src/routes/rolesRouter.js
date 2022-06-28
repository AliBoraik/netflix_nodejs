const { Router } = require("express");
const router = Router();
const rolesController = require('../controllers/rolesController')
const {verifyAdmin} = require('../../middleware/authMiddleware')
require("express");

router.post('/createRole',rolesController.createRole)

router.post('/removeRole',rolesController.removeRoles)

router.post('/assignRole',rolesController.assignRole)

router.get('/all',rolesController.all)

router.get('/getRole',rolesController.getRole)

module.exports = router;