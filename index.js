const port=4000;
const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const multer=require('multer');
const jwt=require('jsonwebtoken');
const fs =require('fs');
const path=require('path');
const pendingteachermodel=require('./models/pendingteacher')
const approvedteachermodel=require('./models/teacher')
const usermodel=require('./models/user');
const imagemodel=require('./models/image');
const uploadimage=require('./multer');
const bcrypt=require('bcrypt');


app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));

app.get('/',(req,res)=>{res.send("express server is runnning")});



// MULTER configuration


const videostorage=multer.diskStorage({
    destination:'./uploads/videos',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploadvideo =multer({storage:videostorage});





const coursemodel=mongoose.model("coursedata",({
    id:Number,
    name:String,
    instructor:{
        name:String,
        experience:String,
        detail:String
    },
    category:String,
    price:Number,
    time:String,
    students:Number,
    overview:String,
    course:[],
    courseImage:String,
    dateCreated:{
        type:Date,
        default:Date.now()
    }

}))






app.get("/listproducts",async (req,res,next)=>{
    fs.unlink('uploads/images/image_1705469938287.png',(err)=>{
        if(err)
        console.log(err);
    else
    console.log("success")
    });
    const course=await coursemodel.find({});
    res.json(course);
})

app.get("/pendingteachers",async(req,res,next)=>{
    try{
    const teacher =await pendingteachermodel.find({});
    res.json(teacher);
    }
    catch(err){
        res.json({message:"there is an error fetching your request"})
    }
})

app.get('/teachers',async(req,res,next)=>{
    try{
    const teacher=await approvedteachermodel.find({});
    res.json(teacher);
    }
    catch(err){
        res.json({message:"there is an error fetching your request"})
    }
})




// CRUD OPERATIONS ON COURSES
app.post('/addcourse',async (req,res,next)=>{
    try{
    const course=new coursemodel({
        name:req.body.name,
        instructor:req.body.instructor,
        category:req.body.category,
        price:req.body.price,
        time:req.body.time,
        overview:req.body.overview,
        course:req.body.course,
        courseImage:req.body.courseImage
    })
    await course.save();
    res.json({success:true,data:course});
    }
    catch(err){
        res.json({message:"there is an error fetching your request"})
    }
})

app.post('/updatecourse',async (req,res,next)=>{
    const course=await coursemodel.findOne({_id:req.body._id});
    console.log(course);
    console.log(req.body);
    if(course!=null){
        const data=req.body;
        console.log(data);
        course.course=[{subcategory:req.body.subcategory,demolecture:data.videourl}];
        await course.save();
        res.json({success:true,message:"updated successfully"});
    }
    else{
        res.json({success:false,message:"course did not exist"})
    }
})

app.post('/removecourse',async (req,res,next)=>{
    let course=await coursemodel.findOneAndDelete({_id:req.body.id});
    if(course){
        res.json({success:true});
    }
    else
    res.json({success:false});
})


app.post("/senddata",async (req,res,next)=>{
    try{
   jwt.verify(req.body.token,"secret_ecom")
    }
    catch(err){
        return res.json("invalid user");
    }
        if(req.body.client==="teacher"){
        const client=await approvedteachermodel.findOne({email:req.body.email})
        res.json(client);
        }
        else if(req.body.client==="student"){
            const client=await usermodel.findOne({email:req.body.email})
        res.json(client);
        }
})






// USER AUTHENTICATION

app.post('/register', async (req,res,next)=>{
    var user=await usermodel.findOne({email:req.body.email});
    if(user){
        res.json({success:false,message:"email already in use"})
    }
    else{
        const hashpass=await bcrypt.hash(req.body.password,10);
        try{
        user=new usermodel({
            fullname:req.body.fullname,
            email:req.body.email,
            phone:req.body.phone,
            password:hashpass,
        })
        await user.save();
        }
        catch(err){
      return res.json({message:"there is an error fetching your request"})
    }
        const data={
            user:{id:user.id}
        }
        const token=jwt.sign(data,"secret_ecom");
        res.json({success:true,message:"registration successfull",token:token,user:user})
    }
})

// LOGIN

app.post('/login',async (req,res,next)=>{
    try{
    var user=await usermodel.findOne({email:req.body.email});
    if(user){
        const password=bcrypt.compare(user.password,req.body.password);
        if(password){
            const data={
                user:{id:user.id}
            }
            const token=jwt.sign(data,"secret_ecom");
            res.json({success:true,message:"log in succesfully",token:token,user});
        }
        else{
            res.json({success:false,message:"incorrect password",error:"incorrect password"})
        }
    }
    else{
        res.json({success:false,message:"user does not exist",error:"user does not exist"})
    }
    }
    catch(err){
        res.json({message:"there is an error fetching your request"})
    }
})

// UPDATE USERS DETAILS

app.post('/updateuser',async (req,res,next)=>{
    try{
  const user=await usermodel.findOne({email:req.body.email});
  if(user!==null){
  const newData=req.body;
  console.log("this is newData",newData)
  Object.assign(user,newData,{dateCreated:Date.now()})
  await user.save();
  res.json({success:true,message:"updated user data succesfully"});
  }
  else{
    res.json({message:"no user found with username"+req.body.username,success:false});
  }
    }
    catch(err){
        res.json({message:"there is an error fetching your request"})
    }
})





// Teacher authentication
app.post('/registerteacher', async (req,res,next)=>{
    try{
    var user=await pendingteachermodel.findOne({email:req.body.email});
    if(user){
        res.json({success:false,message:"email already in use"})
    }
    else{
        const hashpass=await bcrypt.hash(req.body.password,10);
        user=new pendingteachermodel({
            fullname: req.body.fullname,
        email: req.body.email,
        password: hashpass,
        phone: req.body.phone,
        age: req.body.age,
        aadhar: req.body.aadhar,
        experience: req.body.experience,
        highesteducation: req.body.highesteducation
        })
        await user.save();
        const data={
            user:{id:user.id}
        }
        const token=jwt.sign(data,"secret_ecom");
        res.json({success:true,message:"registration successfull",token:token,user:user})
    }
    }
    catch(err){
        res.json({message:"there is an error fetching your request"})
    }
})


// TEACHERS APPROVAL FROM ADMIN 


app.post("/approveteacher",async (req,res,next)=>{
    try{
    var check=await approvedteachermodel.findOne({email:req.body.email});
    if(check){
        res.json({success:false, message:"email already in use"});
    }
    else{
    var teacher=new approvedteachermodel({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        age: req.body.age,
        aadhar: req.body.aadhar,
        experience: req.body.experience,
        highesteducation: req.body.highesteducation
    })
       await teacher.save();
        const data={
            teacher:{id:teacher.id}
        }
        const token=jwt.sign(data,"secret_ecom");
        res.json({success:true,message:`you had approved ${req.body.fullname}`,token:token,teacher:teacher});
    await pendingteachermodel.findOneAndDelete({email:req.body.email});
    }
    }catch(err){
        res.json({message:"there is an error fetching your request"})
    }

})


// LOGIN

app.post('/loginteacher',async (req,res,next)=>{
    try{
    var user=await approvedteachermodel.findOne({email:req.body.email});
    if(user){
        const password=bcrypt.compare(user.password,req.body.password);
        if(password){
            const data={
                user:{id:user.id}
            }
            const token=jwt.sign(data,"secret_ecom");
            res.json({success:true,message:"log in succesfully",token:token,user});
        }
        else{
            res.json({success:false,message:"incorrect password",error:"incorrect password"})
        }
    }
    else{
        res.json({success:false,message:"user does not exist",error:"user does not exist"})
    }
    }
    catch(err){
        res.json({message:"there is an error fetching your request"})
    }
})


// UPDATE TEACHERS DATA

app.post('/updateteacher',async (req,res,next)=>{
    try{
  const user=await approvedteachermodel.findOne({email:req.body.email});
  if(user!==null){
  const newData=req.body;
  Object.assign(user,newData,{dateCreated:Date.now()})
  await user.save();
  res.json({success:true,message:"updated user data succesfully"});
  }
  else{
    res.json({message:"no user found with username"+req.body.username,success:false});
  }
    }
    catch(err){
        res.json({message:"there is an error fetching your request"})
    }
})






app.post('/uploadimage',uploadimage.single("image"),(req,res,next)=>{
   res.json({success:1,imageurl:`http://localhost:${port}/uploads/images/${req.file.filename}`})
})
app.post('/uploadvideo',uploadvideo.single("lectures"),(req,res,next)=>{
    res.json({success:1,videourl:`http://localhost:${port}/uploads/videos/${req.file.filename}`})
})
app.post('/addimagetoprofile',async (req,res,next)=>{
    try{
    if(req.body.client==="teacher"){
        const user=await approvedteachermodel.findOne({email:req.body.email});
        if(user!=null){
             const newData=req.body;
             console.log(user,newData);
             user.profile=newData.image
             await user.save();
             let image=await imagemodel.findOne({client:req.body.client,email:req.body.email});
             if(image!=null){
               const imageurl=image.imageurl.substring(22);

               fs.unlink(imageurl,async(err)=>{
                if(err)
                console.log(err);
             else{
                image.imageurl=req.body.image;
                await image.save();
               }
               })

             }
             else{
                const imagemodell=new imagemodel({email:req.body.email,client:req.body.client,imageurl:req.body.image})
                await imagemodell.save();
             }
             

            res.json({success:true,message:"added image to profile successfully",user:user})
        }

        else{
            res.json({status:res.status,success:false,message:"user doesn't exist"})
        }

    }


    else if(req.body.client==="student"){
        let user=await usermodel.findOne({email:req.body.email});
        if(user!=null){
             const newData=req.body;
             console.log(user,newData);
             user.profile=newData.image
             await user.save();
             let image=await imagemodel.findOne({client:req.body.client,email:req.body.email});
             if(image!=null){
               const imageurl=image.imageurl.substring(22);

               fs.unlink(imageurl,async(err)=>{
                if(err)
                console.log(err);
             else{
                image.imageurl=req.body.image;
                await image.save();
               }
               })

             }
             else{
                const imagemodell=new imagemodel({email:req.body.email,client:req.body.client,imageurl:req.body.image})
                await imagemodell.save();
             }
             

            res.json({success:true,message:"added image to profile successfully",user:user})
        }

        else{
            res.json({status:res.status,success:false,message:"user doesn't exist"})
        }
    }
    }
    catch(err){
        res.json({message:"there is an error fetching your request"})
    }
})

app.listen(port,(error)=>{
    if(error){
        console.error("server error");
    }
    else
    console.log(`server is running on ${port}`);
})