const passport=require('passport');
const express=require('express');
const router=express.Router();

const like_controller=require('../controllers/like_controller');

router.use('/toggle',passport.checkAuthentication,like_controller.toggleLike);

module.exports=router;