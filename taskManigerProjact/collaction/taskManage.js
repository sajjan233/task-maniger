const Task = require('../module/taskManage')
const User = require('../module/user')
const create = async (req, res) => {
    try {

        const { task } = req.body;
        console.log(task);
        const userId = await User.findOne({ token: req.headers["x-api-key"]}, { _id: 1 })
        console.log(userId);
        if (!task) {
            return res.status(202).json({ massage: "Enter Your data" })
        }
        else if (task) {
            const result = await Task.create({ task: task, userId: userId._id });
            result.userId = undefined;
            return res.json({
                Task: result,
                massage: "task add successfully"
            })
        } else {
            return res.status(204).json({ massage: "Enter Your data" })
        }
    } catch (err) {
        res.status(404).json({ error: "somthing error" })
        console.log(err);

    }
}

const readTask = async (req, res) => {
    try {
        const userID = await User.findOne({ token: req.header["x-api-key"]}, { userId: 1 })
        if(!userID){
            console.log("token reGen");
            return res.status(401).json({massage:"invalid user"})
        }else{
            const userTask = await Task.find({userId:userID})
            userTask.userId = undefined;
            res.json({userTask})
        }
    } catch (err) {
        res.status(404).json({error:"somthing error"})
    }
}

const updater = async (req,res) => {
    try {
        let {search,task} =  req.body;
        const taskUpDate = await Task.updateOne({task:search},{task:task});
        console.log(taskUpDate);
    } catch (err) {
        
    }
}

module.exports = {
    create,
    readTask,
    updater
}