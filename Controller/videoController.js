const cloudinary = require('cloudinary').v2;
const videoSchema =require('../model/videoSchema')
//const channelschema = require('../model/channelSchema')
//channle background ke lye or channel circuler pic ke liye "post call"
const commentSchema = require('../model/commentSchema');
const mongoose=require("mongoose")

const { json } = require('express');
const channelSchema = require('../model/channelSchema');
async function uploadToCloudinary(file, folder) {
    const options = {
        folder: folder,
        resource_type: 'auto',
    };

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options)
        return result;
    } catch (err) {
        throw new Error(`Error uploading file to cloudinary: ${err.message}`);
    }
}


//locally upload-
// exports.loacalimgupload = async (req, resp) => {
//     try { const file = req.file.image; console.log("file", file); const path = __dirname + "/files/" + Date.now() + "SBIN." + file.name.split('.').pop(); file.mv(path, (err) => { if (err) { return res.status(500).json({ success: false, msg: "File upload failed", error: err }); } res.status(200).json({ success: true, msg: "File uploaded successfully", }); }); } catch (err) { res.status(500).json({ success: false, msg: "File upload failed", error: err }); }
// }

//locally video uploading
// exports.locallyVidoeupload = async (req, res) => {
//     try {
//         const file = req.file.video;
//         console.log("file", file);
//         const path = __dirname + "/file/" + Date.now() + "SBIN" + file.name.split('.').pop();
//         file.mv(path, (err) => {
//             if (err) {
//                 return res.status(500).json({
//                     success: false,
//                     msg: "file uplad failed "
//                 })
//             }
//         });
//         res.status(200).json({
//             succes: true,
//             msg: " video uploaded successfully"
//         });
//     }
//     catch (err) {
//         res.status(500).json({
//             succes: false,
//             msg: "internal Server Error"
//         })
//     }
// };

exports.uploadVideoCloud = async (req, res) => {
    try {
        const { videoId,  commentId ,channelId,tittle, description, views, likes, dislikes,} = req.body;

        if (!videoId || !tittle || !description || !channelId || !views || !likes || !dislikes||!commentId) {
            return res.status(400).json({ success: false, msg: "all required fialed to upload video" })
        }


        //thumnail conver picture video
        //    const thumailPicture=req.file?.image;
        const thumbnailCoverImage = req.files?.thubnailURL;
        if (!thumbnailCoverImage) {
            return res.status(400).json({
                success: false,
                msg: "Please upload a cover pic or Video"
            })
        }

        const imgSupportedFile = ['jpg', 'jpeg', 'png'];
        const imgfileExtention = thumbnailCoverImage.name.split('.').pop().toLowerCase();

        if (!imgSupportedFile.includes(imgfileExtention)) {
            return res.status(400).json({
                success: false,
                msg: "invalid img foramte . only jpg, jpeg, pnd allowed "
            })
        };

        console.log("img uploading started ");

        //imga and cloudinary folder
        const thumbnailUrlRespons = await uploadToCloudinary(thumbnailCoverImage, 'coverThumbnail_image')


        //for video
        const videofile = req.files?.videoURL;
        if (!videofile) {
            return res.status(400).json({ success: false, msg: "Please upload a video file" });
        }
        const videosupportdFile = ['mp4', 'mov', 'avi', 'mkv'];
        const videosupportdExtention = videofile.name.split('.').pop().toLowerCase();
        console.log(videosupportdExtention)
        if (!videosupportdFile.includes(videosupportdExtention)) {

            return res.status(400).json({
                success: false,
                msg: "Video supprted File only mp4 mov abi mkv"
            })
        }

        console.log("video  uploading started ");
        const VideoulrRespons = await uploadToCloudinary(videofile, 'videofiles')

        // const videodetalings=   await videoSchema.deleteMany({ videoId: null });
        // Generate a unique videoId if not provided
        //    const uniqueVideoId = videoId || uuidv4();
        const videoDetail = await videoSchema.create({
            // videoId:uniqueVideoId,
            videoId,
            tittle,
            thubnailURL: thumbnailUrlRespons.secure_url,
            videoURL: VideoulrRespons.secure_url,
            channelId,
            description,
            views,
            likes, dislikes, commentId
        })

        res.status(201).json({
            success: true,
            msg: "video added succesfully",
            videoDetail: videoDetail
        })

    } catch (err) {
        console.log(err),
            console.log("hello")
        res.status(500).json({
            success: false,
            msg: `internal server error ${err}`
        })
    }
}

//
exports.getuploadedvideos = async (req, res) => {
    try {
        // Find all videos
        const allvideos = await videoSchema.find({}).populate('channelId').populate('commentId');

        // If no videos are found
        if (!allvideos || allvideos.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "Videos not found"
            });
        }

        // Populate channelId and send response
        // const populatedVideos = await videoSchema.populate(allvideos, { path: 'channelId' });

        res.status(200).json({
            success: true,
            msg: "Videos found successfully.",
            allvideoData: allvideos,//populatedVideos
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }

}

exports.getUploadedVideosById = async (req, res) => {
    try {
        const videoId = req.params.videoId; // Ensure this matches your route definition
        console.log("params id", videoId);
    
     // Find the video using `videoId` and populate the related `channelId`
        try {
           const obj={};
            //const videoDetails = await videoSchema.findById(videoId).populate('channleId')//need valid _id (objectId) //note (getvideoById/6774922cca97798bff3e3cd8)
        
            //custom search->not working with custom ids
    //const idbasedvideoDetails=await videoSchema.findOne(videoId).populate('channelId').populate('commentId')// Populate related field if necessary
    const video = await videoSchema.findOne({video:obj.videoId }); // Replace `customVideoId` with your custom ID field

    if (!video) {
        return res.status(404).json({
            success: false,
            msg: "Video not found with the provided videoId.",
        });
    }

    //Manually fetch the related channel and comments using their custom IDs
    const channel = await channelSchema.findOne({ customChannelId: video.channelId }); // Replace `customChannelId` with your schema field
    const comments = await commentSchema.find({ videoId: video.customVideoId }); // Fetch all comments for the video

    // Step 3: Merge the data manually
    const manualvideoDetails = {
        ...video.toObject(), // Convert Mongoose document to plain object
        channel,            // Add the fetched channel data
        comments,           // Add the fetched comments data
    };
    
            // Send success response
            console.log("Fetched video details:", videoDetails);
            res.status(200).json({
                success: true,
                msg: "Video details fetched successfully.",
                videoDetails:videoDetails||idbasedvideoDetails, // Include the details of the video
            });
        } catch (err) {
            console.error("Database error:", err);
            return res.status(500).json({
                success: false,
                msg: "Failed to fetch video details.",
            });
        }
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({
            success: false,
            msg: "Internal server error.",
        });
    }
    
};



exports.deleteUploadedVideoById = async (req, res) => {
    try {
        const videoId = req.params.videoId; // Get the videoId from the request params
        try {

            // Find and delete the video using `videoId`
            const deletedVideo = await videoSchema.findOneAndDelete({ videoId: videoId });
            console.log("deleted video id", deletedVideo);

            res.status(200).json({
                success: true,
                msg: "delet succesfully ",
                deletedVideo: deletedVideo
            })

        } catch (err) {
            console.error(err);
            res.status.json({
                success: false,
                msg: "not found "
            })
        }
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({
            success: false,
            msg: "Internal server error."
        });
    }
};

exports.updatevideo=async(req,res)=>{
    try{

        const videoId=req.params.videoId;

        try{
            const {videoId,tittle,description,channelId,views,likes,dislikes,commentId}=req.body;
          //  const update=await videoSchema.updateOne({videoId:videoId},{videoId, tittle, description, channelId, views, likes, dislikes, commentId})
          const updateVideoDeatail=await videoSchema.find({videoId:videoId})
          //  const updateVideoDeatail=await videoSchema.findOneAndUpdate({videoId:videoId},{videoId, tittle, description, channelId, views, likes, dislikes, commentId},{new:true})
            res.status(200).json({
                success:true,
                msg:"video detail update succesfully ",
                updatedVideodetal:updateVideoDeatail
            })
        }
        catch(err){
            console.log(err)
            res.status(400).json({
                success:false,
                msg:"video detail update failed ",
            })
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({success:false,
            message:"internal server err"})
    }
}