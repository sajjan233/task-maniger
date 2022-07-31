const bcrypt = require('bcryptjs');
const User = require('../module/user')
const userRequire = async (req,res,next) => {

   try{
    let token = req.header["x-api-key"] 
    let result = await User.findOne({token:token})
    if(result){
       return next();
    }
    }catch(err){
        res.status(404).json({massage:" invalid user"})
        console.log(err);

   }

}
const reGenToken = async (data) => {
    try {
        
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    userRequire
}