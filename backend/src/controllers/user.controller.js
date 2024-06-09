const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body

  const checkIfUserExists = await User.findOne({ email })
  if (checkIfUserExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User already registered' })
  }

  const newUser = await User.create({
    fullName,
    email,
    password,
  })

  return res
    .status(StatusCodes.CREATED)
    .json({ message: 'User registered successfully', user: newUser })
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'User does not exist' })
  }
  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Incorrect password' })
  }
  const payload = {
    id: user._id,
    role: user.role,
  }
  const accessToken = jwt.sign(payload, 'secret', {
    expiresIn: '7d',
  })
  console.log(accessToken)
  req.session = { jwt: accessToken }

  return res.status(StatusCodes.OK).json({ user })
}

exports.test = async (req, res) => {
  const user = req.user
  return res.status(StatusCodes.OK).json({ user })
}
