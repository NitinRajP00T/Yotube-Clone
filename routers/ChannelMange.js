// routers/ChannelMange.js
const express = require("express");
const channelrouter = express.Router();  // Correct usage

const { createchannel } = require("../Controller/channelController");


channelrouter.post("/createchannel", createchannel);  // Correct usage

module.exports = channelrouter;  // Ensure correct export
