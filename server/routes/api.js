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
 //handel userInfro compo 
 router.get('/userInfo/:id', userController.userInfroGetData)
 router.put('/userPasswordChange/:id', userController.userPasswordChange)
 router.put('/userkapata/:id', userController.userAddress)
router.put('/userji/:id' ,userController.userprofileupdate)


 




 ///////////////PRODUCT SECTION///////////////////
 router.post('/dogProduct',ProductController.dogProductController)
router.delete('/deleteProduct/:id', ProductController.dogDeleteProduct)
router.get('/singlePet/:id' ,ProductController.SingleProductGet)
router.get('/getpetdata/:id' , ProductController.GetpetdataControler)
router.put('/dogupdateProduct/:id',ProductController.UpdatePetDetails)


////////////Pet Product Section ///////////////
router.post('/petProduct', ProductController.PetProduct)





 ///////////////Frontend SECTION/////////////////////
 router.get('/dogfetchProduct',ProductController.dogFetchProductControler)
router.get('/petproductsall' , ProductController.petproductfetching)





















module.exports = router;
