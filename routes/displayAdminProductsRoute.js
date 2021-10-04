const express= require('express');
const router= express.Router();
const Controller=require('../controllers/displayAdminProductsController');


router.get("/displayAdminProduct",Controller.display_product);


module.exports= router;    