const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pollSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  likes: {
    type: [String],
    required: true
  },
  dislikes: {
    type: [String],
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Poll', pollSchema)