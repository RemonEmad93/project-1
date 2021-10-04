const express= require('express');
const router= express.Router();
const Controller=require('../controllers/homeController');
const registerRoute= require('./registerRoute')
const loginRoute= require('./loginRoute')
const logoutRoute= require('./loyoutRoute')
const addProductRoute= require('./addProductRoute')
const displayAdminProductsRoute=require("./displayAdminProductsRoute")
const editProductRoute=require('./editProductRoute')
const displayUserProductsRoute=require("./displayUserProductsRoute")

router.get("/",Controller.home_page);
router.use('/',registerRoute)
router.use('/',loginRoute)
router.use('/',logoutRoute)
router.use('/',addProductRoute)
router.use('/',displayAdminProductsRoute)
router.use('/',editProductRoute)
router.use('/',displayUserProductsRoute)




module.exports= router;    