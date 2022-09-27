const passport=require('passport');
const express=require('express');
const router=express.Router();
const question_controller=require('../controllers/question_controller')


router.use('/ask',passport.checkAuthentication,question_controller.ask);
router.use('/submitquestion',passport.checkAuthentication,question_controller.submitquestion);
router.use('/myquestions',passport.checkAuthentication,question_controller.myquestions);
router.use('/detail',question_controller.getfullQues);

module.exports=router;