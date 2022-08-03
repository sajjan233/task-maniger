const express = require('express')
const router = express.Router()
const user = require('./user')
const task = require('./taskManage')
const {varify} = require('../auth/midelweare')






router.use("/user",user)
router.use("/user",varify,task)

module.exports = router;