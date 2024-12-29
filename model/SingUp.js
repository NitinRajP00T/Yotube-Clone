const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const singup = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    //default: () => uuidv4(), // Assigning default value
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    unique:true,
    required: true,
  },
  img: {
    type: String,  // URL of the user's avatar image
    //require:true
  },
  // channels: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Channel',
  //   },
  // ],
});

// const User = mongoose.model('Singup', singup);
// module.exports = User;

module.exports = mongoose.model('SingUp', singup)
