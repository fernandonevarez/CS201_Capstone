

const express = require('express');
const { uploadImage } = require('../Controllers/ImageUploadController');
const { getAllProduct, createProduct, getSingleProduct, deleteProduct, updateProduct } = require('../Controllers/ProductController');



const productRouter = express.Router();

productRouter.route('/').get(getAllProduct)
productRouter.route('/').post(createProduct)


productRouter.route('/:id').get(getSingleProduct)
productRouter.route('/:id').delete(deleteProduct)
productRouter.route('/:id').put(updateProduct)

productRouter.route('/upload').post(uploadImage)

module.exports = productRouter;