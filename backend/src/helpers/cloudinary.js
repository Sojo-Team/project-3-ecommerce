const cloudinary = require('cloudinary')
const streamifier = require('streamifier')

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

function fileUpload(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
      if (error) reject(error)
      resolve(result)
    })

    streamifier.createReadStream(file.buffer).pipe(stream)
  })
}

module.exports = { fileUpload }
