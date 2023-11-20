const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pollSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  dislikes: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Poll', pollSchema)