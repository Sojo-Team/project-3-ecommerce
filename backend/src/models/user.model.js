const { genSalt, hash, compare } = require('bcrypt')
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  role: {
    type: String,
    default: 'user',
  },
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await genSalt(10)
    const hashedPassword = await hash(this.password, salt)
    this.password = hashedPassword
  }
})

userSchema.methods.comparePassword = async function (password) {
  return compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User
