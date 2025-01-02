const express=require("express");

 const router=express.Router();

 const {addComment,getCommentById,getComments}=require('../Controller/commentController');
//const {createchannel}=require('../Controller/channelController')
router.post("/addcomment",addComment);
router.get("/getcomments",getComments);
 router.get("/getcomment/:videoId", getCommentById);


 //router.post("/createchannel",createchannel)
//  exports.router=router;
  module.exports = router;