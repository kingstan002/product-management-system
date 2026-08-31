const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { validateProduct } = require('../utils/validators');

const router = express.Router();

router.use(protect); // All product routes require authentication

router.route('/')
  .get(getProducts)
  .post(authorize('admin', 'manager'), validateProduct, createProduct);

router.route('/:id')
  .get(getProduct)
  .put(authorize('admin', 'manager'), validateProduct, updateProduct)
  .delete(authorize('admin'), deleteProduct);

module.exports = router;