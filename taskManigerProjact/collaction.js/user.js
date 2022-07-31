const User = require('../module/user');
const { config } = require('../config/congif')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
    try {
        const user = new User(req.body)
        const userRegisted = await User.findOne({ email: user.email })
        if (user && !userRegisted) {
            const result = await user.save();
            console.log("save", result);
            user.password = undefined;
            return res.json(user)
        } else if (user && userRegisted) {
            return res.status(201).json({ massage: "user registed" });
        }
        else {
            return res.status(204).json({ massage: " Enter user data" });
        }
    } catch (err) {
        res.status(404).json({ err: "server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = User.findOne({ email: email, password: password })
        // console.log("result",result);
        if (result) {
            /*********create token */

            const hasPass = await bcrypt.hash(password,10)
            // console.log(hasPass);
            const token = jwt.sign({
                id: result._id,
                roll: result.roll,
                date: { default: Date.now }
            }, config.privateKey, { expiresIn: '24h' })

            await User.findOneAndUpdate({ email: email }, { $set: { token: token,password:hasPass }}, { new: true })
            return res.json({
                massage: "user login successfully",
                token: token
            })
        }
    } catch (err) {
        res.status(404).json({ error: "something else", err })
        console.log(err);
    }
}

const profile = async (req,res) => {
    try {
        let token = req.heaader['x-api-key']
        const user = await findOne({token:token},{password:0,token:0})
        if(user){
            res.json(user)
        }else{
//regrnamte token
        }
    } catch (err) {
        res.status(404).json({error:"user login first"})
        console.log("user profile",err);
    }
}

module.exports = {
    register, login,profile
}