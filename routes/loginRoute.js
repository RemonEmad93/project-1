const express= require('express');
const router= express.Router();
const Controller=require('../controllers/loginController');

router.get("/",Controller.login_get);

module.exports= router;