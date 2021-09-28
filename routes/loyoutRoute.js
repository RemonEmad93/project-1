const express= require('express');
const router= express.Router();
const Controller=require('../controllers/logoutController');

router.get('/logout',Controller.logout)

module.exports= router; 