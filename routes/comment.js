const express = require('express');
const router = express.Router();
const passport = require('passport');

const comment_controller = require('../controllers/comment_controller');


router.use('/addcomment', comment_controller.addComment);
router.use('/deletecomment', comment_controller.deletecomment);


module.exports = router;