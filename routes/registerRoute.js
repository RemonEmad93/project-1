const express= require('express');
const router= express.Router();
const Controller=require('../controllers/registerController');

router.get("/",Controller.register_get);

module.exports= router;