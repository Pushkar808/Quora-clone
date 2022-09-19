const express=require('express');
const router=express.Router();
const index_controller=require('../controllers/index_controller')
//setting up routers
router.use('/login',index_controller.LoginForm);
router.use('/',index_controller.indexSample);

module.exports=router;