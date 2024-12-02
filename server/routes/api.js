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
router.delete('/deleteProduct/:id', ProductController.dogDeleteProduct)
router.get('/singlePet/:id' ,ProductController.SingleProductGet)
router.get('/getpetdata/:id' , ProductController.GetpetdataControler)
router.put('/dogupdateProduct/:id',ProductController.UpdatePetDetails)


 ///////////////Frontend SECTION/////////////////////
 router.get('/dogfetchProduct',ProductController.dogFetchProductControler)






















module.exports = router;
