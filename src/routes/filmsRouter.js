const { Router } = require("express");
const filmsController = require("../controllers/filmsController");
const {verifyAdmin} = require('../../middleware/authMiddleware')
const router = Router();

router.post("/addFilm", filmsController.addFilm);
router.post('/addFilm',filmsController.addFilm)
router.post('/deleteFilm',filmsController.deleteFilm)
router.post('/updateFilm',filmsController.updateFilm)
router.get('/all',filmsController.getAllFilms)


module.exports = router;
