const express= require('express');
const router= express.Router();
const Controller=require('../controllers/displayUserProductsController');


router.get("/displayUserProduct",Controller.display_product);


module.exports= router;    