const express=require("express");

 const router=express.Router();

 const {addComment,getComments}=require('../Controller/commentController');
//const {createchannel}=require('../Controller/channelController')
router.post("/addcomment",addComment);
// router.get("/getcommnet",getComment);
 router.get("/getcomment/:videoId", getComments);


 //router.post("/createchannel",createchannel)
//  exports.router=router;
  module.exports = router;