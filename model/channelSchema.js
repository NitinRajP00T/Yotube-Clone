const mongoose = require('mongoose');
const Video=require('../model/videoSchema');
const Singup=require("../model/SingUp")
const { v4: uuidv4 } = require('uuid');

const channelSchema = new mongoose.Schema({
  channelId: {
    type: String,
   required: true,
    // unique: true,
     default: () => uuidv4(),
  },
  channelName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'singup',
    //required: true,
  },
  description: {
    type: String,
    required: true,
  },
  channelBanner: {
    type: String,  // URL of the channel's banner image
    default: '',
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
  ],
});

// const Channel = mongoose.model('Channel', channelSchema);
// module.exports = Channel;

module.exports=mongoose.model('Channel',channelSchema)