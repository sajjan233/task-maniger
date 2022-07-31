const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { config } = require('./config/congif');
const {} = require('./config/congif')
const app = express()


/**************database connaction ************ */
mongoose.connect(config.db)
    .then(() => {
    console.log("database connaction");
    })
    .catch((err) => {
        console.log("database connaction error",err);
    })


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())














app.listen(config.port,() => {
    console.log("srver run port on ",config.port);
})