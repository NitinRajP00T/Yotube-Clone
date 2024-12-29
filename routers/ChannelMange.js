// routers/ChannelMange.js
const express = require("express");
const channelrouter = express.Router();  // Correct usage

const { createchannel ,ChannelDetail,getchennelById} = require("../Controller/channelController");


channelrouter.post("/createchannel", createchannel);  // Correct usage
channelrouter.get("/getchannel", ChannelDetail);  // Correct usage
channelrouter.get("/getchannelById/:channelId", getchennelById);  // Correct usage

module.exports = channelrouter;  // Ensure correct export
