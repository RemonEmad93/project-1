const express= require('express');
const router= express.Router();
const Controller=require('../controllers/loginController');

router.get('/loginGet',Controller.login_get)
router.post('/loginPost',Controller.login_post)
 
module.exports= router; 