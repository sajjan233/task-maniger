const express = require('express')
const router = express.Router();
const {register,login,profile} = require('../collaction/user');
const {userRequire} = require('../auth/midelweare')



router.post('/user',register);
router.post('/user/login',login);
router.get('/user/profile',userRequire,profile)

module.exports = router;