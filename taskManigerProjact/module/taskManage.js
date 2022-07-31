const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema(
    {
        task:{type:String},
       userId:{type:String}
    },{ timestamps: true }
)
module.exports = mongoose.model("Task",taskSchema)