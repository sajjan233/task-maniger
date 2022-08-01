const express = require('express')
const router = express.Router();
const {register,login,profile} = require('../collaction/user');
const {userRequire} = require('../auth/midelweare')



router.post('/register',register);
router.post('/login',login);
router.get('/profile',userRequire,profile)

module.exports = router;