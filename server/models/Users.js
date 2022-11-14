const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
    required: true
  }
})

UserSchema.statics.signup = async function(email, password) {


  if(!password && !email) {
    throw Error("Email and Password is required")
  }

  if(!email) {
    throw Error("An email is required")
  }

  if(!password) {
    throw Error("A password is required")
  }

  if(!validator.isEmail(email)) {
    throw Error("Please fill a valid email")
  }

  if(!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough")
  }

  const emailExists = await this.findOne({ email })

  if(emailExists) {
    throw Error('That email has already been used');
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await this.create({ email, password: hash })

  return user
}

UserSchema.statics.login = async function(email, password) {

  if(!email || !password) {
    throw Error('Email and password required')
  }

  const user = await this.findOne({ email })

  if(!user) {
    throw Error('That email is invalid')
  }

  const matchedPassword = await bcrypt.compare(password, user.password)

  if(!matchedPassword) {
    throw Error('Password is invalid')
  }

  return user
}

module.exports = mongoose.model('users', UserSchema)



