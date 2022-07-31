const User = require('../module/user')
const create = async (req,res) => {
    try {
        const user = new User(req.body)
        if(user){
            const result = await user.save();
            console.log(result);

            user.password = undefined;

            res.json(user)
        }
        else{
        res.status(204).json({massage:"enter user data"})

        }
    } catch (err) {
        res.status(404).json({err:""})
    }
}