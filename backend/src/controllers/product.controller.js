const { fileUpload } = require('../helpers/cloudinary')
const Product = require('../models/product.model')

exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body

  const result = await fileUpload(req.file)
  if (!result.public_id) {
    return res.status(400).json({ message: 'Error while uploading' })
  }

  const product = new Product({
    name,
    description,
    price,
    category,
    stock,
    photo: result.secure_url,
  })

  await product.save()

  return res.status(201).json({
    message: 'Product created successfully',
    product,
  })
}

exports.updateProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body

  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name,
        description,
        price,
        category,
        stock,
      },
    },
    { new: true }
  )

  return res.status(200).json({
    message: 'Product updated successfully',
    product: updatedProduct,
  })
}

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  return res.status(200).json({ message: 'Product deleted successfully' })
}

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }
  return res.status(200).json({ product })
}

exports.getProducts = async (req, res) => {
  const searchQuery = req.query.search || ''
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5

  const query = { name: { $regex: searchQuery, $options: 'i' } }

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(limit)

  const total = await Product.countDocuments(query)
  const totalPages = Math.ceil(total / limit)

  res.json({ products, total, totalPages, page })
}
