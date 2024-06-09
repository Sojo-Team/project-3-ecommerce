const { model } = require('mongoose')
const { Schema } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      defualt: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
)

const Product = model('Product', productSchema)
module.exports = Product
