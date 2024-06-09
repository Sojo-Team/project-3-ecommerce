const jsonwebtoken = require('jsonwebtoken')

exports.isLoggedIn = (req, res, next) => {
  const { jwt } = req.session
  if (!jwt) {
    return res.status(401).json({ message: 'Not logged in' })
  }
  try {
    const payload = jsonwebtoken.verify(jwt, 'secret')
    req['user'] = payload
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not logged in' })
  }
}
