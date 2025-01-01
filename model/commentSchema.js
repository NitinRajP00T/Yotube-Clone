const mongoose = require('mongoose');
const video = require('../model/videoSchema');

const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'singup',
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// const Comment = mongoose.model('Comment', commentSchema);
// module.exports = Comment;

module.exports=mongoose.model('comment',commentSchema)
