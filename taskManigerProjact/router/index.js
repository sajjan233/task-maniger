const express = require('express')
const router = express.Router()
const user = require('./user')
const task = require('./taskManage')






router.use("/user",user)
router.use("/user",task)

module.exports = router;