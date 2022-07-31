const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    token:{ type: String ,default:""},
    roll:{ type: Number ,default:0}
}
);

module.exports = mongoose.model("User", UserSchema)