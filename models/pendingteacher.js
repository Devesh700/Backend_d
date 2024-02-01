const mongoose=require('mongoose');
const pendingteachermodel=mongoose.model("pendingteacherdata",({
    fullname:String,
    email:String,
    password:String,
    highesteducation:String,
    age:Number,
    aadhar:String,
    phone:String,
    experience:String,
    dateCreated:{type:Date,default:Date.now()},
    courses:{type:Array,defeault:[]}
}))
module.exports=pendingteachermodel;