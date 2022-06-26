const {Router} = require("express");
const router = Router();
const reviewController = require('../controllers/reviewController')
const {check} = require('express-validator');


router.get('/all', reviewController.allReview)

router.post('/publicReview'
    , check('UserName').exists().isString()
    , check('ContentId').exists().isString()
    , check('Text').exists().isString()
    , check('Rating').exists().isDecimal(),
    reviewController.publicReview)

router.post('/removeReview'
    , check('Id').exists().isUUID(),
    reviewController.removeReview)

router.post('/allByContentId'
    , check('ContentId').exists().isUUID(),
    reviewController.allByConId)

router.post('/accept'
    , check('Id').exists().isUUID(),
    reviewController.accept)

router.post('/reject'
    , check('Id').exists().isUUID(),
    reviewController.reject)

router.post('/pending'
    , check('Id').exists().isUUID(),
    reviewController.pending)

router.get('/allByStatus' , reviewController.allByStatus)

module.exports = router;