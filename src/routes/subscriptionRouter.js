const {Router} = require("express");
const router = Router();
const SubscriptionController = require('../controllers/subscriptionController')
const {check} = require('express-validator');

// all subscription (F , S , SS, ...)
router.get('/all', SubscriptionController.allSubscriptions)
// all user Subscriptions ( user -> subscription)
router.get('/allUser', SubscriptionController.allUserSubscriptions)

router.post('/add'
    , check('name').exists().isString()
    , check('cost').exists().isDecimal(),
    SubscriptionController.addSubscription)

router.post('/remove'
    , check('id').exists().isDecimal(),
    SubscriptionController.removeSubscription)

router.post('/edit'
    , check('id').exists().isDecimal(),
    SubscriptionController.editSubscription)

router.post('/setSubs'
    , check('userId').exists().isUUID()
    , check('subsId').exists().isDecimal(),
    SubscriptionController.setUserSubscription)

// subscription Renewal (one month ...)
router.post('/renewal'
    , check('id').exists().isUUID(),
    SubscriptionController.subscriptionRenewal)


module.exports = router;