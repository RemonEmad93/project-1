const express= require('express');
const router= express.Router();
const Controller=require('../controllers/registerController');

router.get("/",Controller.home_page);
router.get("/register",Controller.register_get);
router.get("/auth_callback",Controller.google_get);
router.get('/login',Controller.login_get)
router.post('/login',Controller.login_post)
router.get('/home',Controller.home_get)
router.post('/home',Controller.home_post)
router.get('/logout',Controller.logout)
router.get('/page1',Controller.page1)

module.exports= router;  