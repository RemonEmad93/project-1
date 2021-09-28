const express= require('express');
const router= express.Router();
const Controller=require('../controllers/inputsController');

router.get("/inputs",Controller.inputs);

module.exports= router;    