const express= require('express');
const router= express.Router();
const Controller=require('../controllers/homeController');
const registerRoute= require('./registerRoute')
const loginRoute= require('./loginRoute')
const logoutRoute= require('./loyoutRoute')
const inputsRoute= require('./inputsRoute')

router.get("/",Controller.home_page);
router.use('/',registerRoute)
router.use('/',loginRoute)
router.use('/',logoutRoute)
router.use('/',inputsRoute)

module.exports= router;    