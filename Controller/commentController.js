//comment add and fetch - post and get
const mongoose=require("mongoose")
const commentSchema = require('../model/commentSchema');  // Schema ko import karna
//const User = require('../model/SingUp');  // User Schema ko import karna
//const videoSchema= require('../model/videoSchema');  // Video Schema ko import karna

// Function jo comment add karega
exports.addComment = async (req, resp) => {
  try {
   // const { userId, videoId, text } = req.body;  // Request body se userId, videoId aur text nikaal rahe hain
const {username,email,img ,text,videoId,commentId,}=req.body;


    // Comment object create karna
    // const addedComment = await commentSchema.create({
    //   commentId: new mongoose.Types.ObjectId(),  // Unique commentId create karna//when we use mongoose-need to requrie that 
    //   userId,  // Comment karne wale user ka ID
    //    // Video ka ID jisme comment ho raha hai
    //   text,  // Comment ka text
    // });

    // Success response send karna
    if(!username||!email||!commentId){
      return resp.status(400).json({
        success:false,
        msg:"fill username, email, text , commentId"
      })
    }
    const addedComment=await commentSchema.create({
      username,
      email,
      text,
      avtarImg:img||`https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
      commentId,
      videoId
    })
    
    resp.status(201).json({
      success: true,
      msg: "Comment successfully added",
      Comment: addedComment,
    });
  } catch (error) {
    // Error handling
    console.log(error)
    resp.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};


// // Function jo comments fetch karega
exports.getCommentById = async (req, resp) => {
    try {
      const commentId = req.params.commentId;  // URL se videoId nikaal rahe hain

      // Comment fetch karte waqt user aur video ko populate kar rahe hain
      const comments = await commentSchema.find({commentId})
    
  
      if (!comments || comments.length === 0) {
        return resp.status(400).json({
          success: false,
          msg: "commnet is not found",
          All_Comments: comments,
        });
      }
  
      // Success response ke saath comments bhejna
      resp.status(200).json({
        success: true,
        msg: "Fetched comments successfully",
        All_Comments: comments,
      });
    } catch (error) {
      console.log(error)
      // Error handling
      resp.status(500).json({
        success: false,
        msg: "Internal server error",
      });
    }
  };

exports.getComments = async (req, resp) => {
    try {
     
      // Comment fetch karte waqt user aur video ko populate kar rahe hain
      const comments = await commentSchema.find()
    
  
      if (!comments || comments.length === 0) {
        return resp.status(400).json({
          success: false,
          msg: "commnet is not found",
          All_Comments: comments,
        });
      }
  
      // Success response ke saath comments bhejna
      resp.status(200).json({
        success: true,
        msg: "Fetched comments successfully",
        All_Comments: comments,
      });
    } catch (error) {
      console.log(error)
      // Error handling
      resp.status(500).json({
        success: false,
        msg: "Internal server error",
      });
    }
  };
  
  