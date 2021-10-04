const express= require('express');
const router= express.Router();
const Controller=require('../controllers/editProductController');


router.get("/editProductGet/(:productid)",Controller.edit_product_get);
router.post("/editProductPost",Controller.edit_product_post);

module.exports= router;   