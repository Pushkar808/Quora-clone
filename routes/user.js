const passport=require('passport');
const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/user_controller');

router.use('/showprofile',user_controller.showProfile);

module.exports=router;