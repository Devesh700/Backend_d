const mongoose=require('mongoose');
const imagemodel=mongoose.model("images",({
    email:String,
    client:String,
    imageurl:String
}))
module.exports=imagemodel;