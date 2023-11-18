const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

// static methods
userSchema.statics.signup = async (email, password) => {
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error(`Email already in use.`)
  }

  const salt = bcrypt.genSalt(10)
  const hash = bcrypt.hash(password, salt)

  const user = this.create({ email, password: hash })

  return user
}


module.exports = mongoose.model('User', userSchema)