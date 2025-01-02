const mongoose = require('mongoose');
const channelSchema=require('../model/channelSchema')
const commentSchema=require('../model/commentSchema')
const { v4: uuidv4, stringify } = require('uuid');

const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
     //unique: true,
    //default: () => uuidv4(),
  },
  videoURL:{
    type:String,
   // required:true
  },
  tittle: {
    type: String,
    required: true,
  },
  thubnailURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
   required: true,
  },
  channelId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Channel',
     required: true,    //!//TypeError: Invalid schema configuration: `true` is not a valid type at path `required`..
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'singup',
   // required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  commentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
