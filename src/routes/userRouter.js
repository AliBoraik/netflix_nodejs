const { Router } = require("express");
const router = Router();
const userController = require('../controllers/userController')
const {verifyAdmin} = require('../../middleware/authMiddleware')


router.get('/all',userController.all)

module.exports = router;