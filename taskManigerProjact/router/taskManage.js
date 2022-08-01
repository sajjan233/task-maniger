const express = require('express')
const router  = express.Router()
const {create,readTask,updater} = require('../collaction/taskManage')

router.post('/task',create)
router.get('/task',readTask)
router.put('/task',updater)

module.exports = router;