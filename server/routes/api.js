const router = require('express').Router();
const userController = require('../controllers/user');
const ProductController =require('../controllers/product')
const cloudinary = require("cloudinary").v2

  // Configuration
  cloudinary.config({ 
    cloud_name: 'dishdojeh', 
    api_key: '781311536959573', 
    api_secret: 'jjdqa4FjQ2TaTxSaQzSEiUPzhHA' 
});



// handle registration data
router.post('/regData', userController.RegestrationUserData);

 // handel handle data 
 router.post('/login', userController.loginDataControler)


 




 ///////////////PRODUCT SECTION///////////////////
 router.post('/dogProduct',ProductController.dogProductController)























module.exports = router;
