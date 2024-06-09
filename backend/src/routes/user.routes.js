const express = require('express')
const {
  registerUser,
  loginUser,
  test,
} = require('../controllers/user.controller')
const { isLoggedIn } = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/test', isLoggedIn, test)

module.exports = router
