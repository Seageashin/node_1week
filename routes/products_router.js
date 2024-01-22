// routes/products.router.js
const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../schemas/products_schema');

// 1. Create Product
router.post('/', createProduct);

// 2. Get Products
router.get('/', getProducts);

// 3. Get Product by ID
router.get('/:productId', getProductById);

// 4. Update Product
router.put('/:productId', updateProduct);

// 5. Delete Product
router.delete('/:productId', deleteProduct);



module.exports = router;
