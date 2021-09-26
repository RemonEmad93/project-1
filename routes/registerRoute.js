const express= require('express');
const router= express.Router();
const Controller=require('../controllers/registerController');

router.get("/",Controller.register_get);
router.get("/auth_callback",Controller.google_get);
router.get('/login',Controller.login_get)
router.post('/login',Controller.login_post)
router.get('/home',Controller.home_get)
router.post('/home',Controller.home_post)

module.exports= router; 