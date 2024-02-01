const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/teachshala").then(()=>{console.log("database connection successfull")})
const usermodel=mongoose.model("userdata",({
    fullname:String,
    email:String,
    phone:String,
    password:String,
    courses:[],
    profile:{type:String,default:`http://localhost:4000/uploads/images/th.jpg`},
    dateCreated:{
        type:Date,
        default:Date.now()
    }
}))
module.exports=usermodel;