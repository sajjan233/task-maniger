const express = require('express')
const router = express.Router()
const {register} = require('./user')



router.use("/api",register)

module.exports = router;