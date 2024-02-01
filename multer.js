const multer=require('multer');
const path=require('path');
const imagestorage=multer.diskStorage({
    destination:'./uploads/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploadimage =multer({storage:imagestorage});
module.exports=uploadimage;