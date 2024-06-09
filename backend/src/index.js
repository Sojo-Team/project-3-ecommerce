const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const cors = require('cors')
require('dotenv').config()
const { faker } = require('@faker-js/faker')

const authRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const Product = require('./models/product.model')

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)
app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 7 * 60 * 60 * 1000,
    expires: new Date(Date.now() + 24 * 7 * 60 * 60 * 1000),
    sameSite: 'lax',
    domain: 'localhost',
    path: '/',
    secure: false,
    keys: ['keys2', 'keys1'],
  })
)

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/product', productRoutes)

mongoose
  .connect('mongodb://127.0.0.1:27017/ecommerce-one')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log(err.message))

app.listen(4000, () => {
  console.log('Server is running on port 4000')
})

for (let i = 0; i < 25; i++) {
  const name = faker.commerce.productName()
  const description = faker.commerce.productDescription()
  const price = faker.commerce.price()
  const stock = faker.datatype.number({ min: 0, max: 100 })
  const category = faker.commerce.department()
  const photo = faker.image.imageUrl()

  new Promise(resolve => {
    resolve(
      Product.create({
        name,
        description,
        price,
        stock,
        category,
        photo,
      })
    )
  })
}
