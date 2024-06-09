const express = require('express')
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require('../controllers/product.controller')
const { isLoggedIn } = require('../middleware/auth.middleware')
const { uploads } = require('../middleware/multer')

const router = express.Router()

router.post('/', uploads.single('file'), createProduct)
router.put('/:id', isLoggedIn, updateProduct)
router.delete('/:id', isLoggedIn, deleteProduct)
router.get('/:id', getProduct)

module.exports = router
