const express=require('express')
const router = express.Router();
const passport=require('passport');
const follow_controller=require('../controllers/follow_controller')
router.use('/user',passport.checkAuthentication,follow_controller.followUser);

module.exports=router;