const passport=require('passport');
const express=require('express');
const router=express.Router();
const question_controller=require('../controllers/question_controller')


router.use('/ask',passport.checkAuthentication,question_controller.ask);
router.use('/submitquestion',passport.checkAuthentication,question_controller.submitquestion);

module.exports=router;