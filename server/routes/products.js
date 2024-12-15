const express = require( 'express' );
const  authenticateToken  = require( '../middleware/auth.js');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require( '../controllers/product_controller.js');
const {upload} = require("../utils/fileUpload.js"); 

const router = express.Router();

router.post('/', authenticateToken, upload.single("file"), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router; 