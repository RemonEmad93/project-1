const express= require('express');
const router= express.Router();
const Controller=require('../controllers/addProductController');


router.get("/inputsGet",Controller.inputs_get);
router.post("/inputsPost",Controller.inputs_post);

module.exports= router;    