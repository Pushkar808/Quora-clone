const passport=require('passport');
const express=require('express');
const router=express.Router();
const index_controller=require('../controllers/index_controller')
//setting up routers
router.use('/createSession',passport.authenticate('local',{
    failureRedirect:'/login'
}),index_controller.createSession);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), index_controller.LoginForm);

router.use('/login',index_controller.LoginForm);
router.use('/logout',index_controller.destroySession);
router.use('/signin',index_controller.Signin);
router.use('/signup',index_controller.Signup);
router.use('/',index_controller.indexSample);



module.exports=router;