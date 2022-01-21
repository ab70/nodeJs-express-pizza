const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{type: String , required: true, },
    email:{type: String, required:true, unique:true},
    password:{type:String,required:true},
    address:{type:String, required:true},
    isAdmin:{type:Boolean, default:false}
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)