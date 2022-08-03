const Task = require('../module/taskManage')
const User = require('../module/user')
const create = async (req, res) => {
    try {
        const { task } = req.body;
        const userId = await User.findOne({ token: req.headers.authorization.split(" ")[1] })
        if (!task) {
            return res.status(202).json({ massage: "Enter Your data" })
        }
        else if (task) {
            const result = await Task.create({ task: task, userId: userId._id._id });
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
        const userID = await User.findOne({ token: req.headers.authorization.split(" ")[1] }, { userId: 1 })
        if (!userID) {
            console.log("token reGen");
            return res.status(401).json({ massage: "invalid user" })
        } else if(userID._id) {
            const userTask = await Task.find({ userId: userID._id },{_id:0,userId:0})
            // console.log(userTask);
            userTask.userId = undefined;
          return  res.json(userTask)
        }
    } catch (err) {
        res.status(404).json({ error: "somthing error" })
    }
}

const updater = async (req, res) => {
    try {
        let { search, task } = req.body;
        const taskUpDate = await Task.updateOne({ task: search }, { task: task });
    
        if(taskUpDate.matchedCount && taskUpDate.modifiedCount > 0){
           return res.json({massage:"Task update successfully"})
        }
        return res.status(204).json({
            massage:"Task not found",
            modified:taskUpDate.modifiedCount

        })
    } catch (err) {
        res.json({error:"somthing errorn to modification"})
    }
}
const remover = async (req,res) => {

}
module.exports = {
    create,
    readTask,
    updater,
    remover
}
