const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express()
const conaction = process.env || DEV;


/**************database connaction ************ */
mongoose.connect(conaction.DB)
    .then(() => {
    console.log("database connaction");
    })
    .catch((err) => {
        console.log("database connaction error",err);
    })


/********************all router require*********** */

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const allRouter = require("./router")





app.use('/api',allRouter)





app.listen(conaction.PORT,() => {
    console.log("srver run");
})