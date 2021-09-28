const express= require('express');
const router= express.Router();
const Controller=require('../controllers/registerController');

router.get("/register",Controller.register_get);
router.get("/auth_callback",Controller.google_get);
router.get('/checkEmail',Controller.check_email)
router.post('/registerWithoutGoogle',Controller.register_without_google)

module.exports= router;   