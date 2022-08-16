const bcrypt = require('bcryptjs');
const { expressjwt } = require('express-jwt');
const User = require('../module/user')
require('dotenv').config()

const conaction = process.env || DEV;
const userRequire = async (req, res, next) => {

    try {
        let token = req.header["x-api-key"]
        let result = await User.findOne({ token: token })
        if (result) {
            return next();
        }
    } catch (err) {
        res.status(404).json({ massage: " invalid user" })
        console.log(err);

    }

}
const varify = async (req, res, next) => {
    try {

        expressjwt({
            secret: conaction.privateKey,
            algorithms: ["HS256"],
            credentialsRequired: false,
            getToken: fromHeaderOrQuerystring = (req) => {
                if (
                    req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
                    console.log(req.headers.authorization)
                    return req.headers.authorization.split(" ")[1];
                } 
                return null;
            },

        })

        next()

    } catch (err) {
        res.status(404).json({error:"not authorization"})
        console.log(err);
    }
}


const hash = (data) => {
try {
    bcrypt.genSalt(data.salt, (err, salt)=> {
        bcrypt.hash(data.myPlaintextPassword, salt, (err, password) => {
         if (err) console.error(err);
         console.log(password);
        });
        return salt , password
    });
} catch (err) {
    console.log(err);
    throw err;
}
}

module.exports = {
    userRequire,
    varify,hash
}