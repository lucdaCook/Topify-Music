const mongoose = require('mongoose');
const Users = require('./Users');

const LikesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  uri: {
    type: String,
    required: true,
  },

  artists : {
    type: Array,
    required: true 
  },

  images: {
    type: Array,
  },

  user_id: {
    type: String,
    required: true 
  },

  album: {
    type: String
  },

  duration: {
    type: Number,
    required: true
  },

  track_id : {
    type: String,
    required: true
  }
  
}, {timestamps: true})

module.exports = mongoose.model('likes', LikesSchema)
