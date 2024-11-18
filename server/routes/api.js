const router = require('express').Router();
const userController = require('../controllers/user');

// handle registration data
router.post('/regData', userController.RegestrationUserData);

 // handel handle data 
 router.post('/login', userController.loginDataControler)


























module.exports = router;
