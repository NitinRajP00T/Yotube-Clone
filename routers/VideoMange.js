// // API to fetch, update, and delete videos.

const express=require("express")


const videoroute=express.Router();

// const {loacalimgupload,locallyVidoeupload}=require("../Controller/videoController");

// videoroute.post("/locallyimgupload",loacalimgupload);
// videoroute.post("/locallyvideoupload",locallyVidoeupload);


//cloudinary uploading rout
const { uploadVideoCloud ,getuploadedvideos,getUploadedVideosById,deleteUploadedVideoById,updatevideo} =require("../Controller/videoController")

videoroute.post("/uploadvideocloud",uploadVideoCloud)

videoroute.get("/getvideos",getuploadedvideos);

videoroute.get("/getvideoById/:videoId",getUploadedVideosById);

videoroute.put("/getvideoById/:vieoId",updatevideo)


videoroute.delete("/deletvideoById/:videoId",deleteUploadedVideoById)

module.exports=videoroute;



// const express = require('express');
// const upload = require('../config/multer');
// const { uploadVideoCloud } = require('../controllers/videoController');

// const videoroute = express.Router();

// videoroute.post(
//     '/upload',
//     upload.fields([
//         { name: 'thumbnail', maxCount: 1 },
//         { name: 'video', maxCount: 1 },
//     ]),
//     uploadVideoCloud
// );

// module.exports = videoroute;

