const Product = require('../models/Product');
const User = require('../models/User');
const cloudinary = require("cloudinary").v2;
const { fileSizeFormatter } = require("../utils/fileUpload");

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, imageUrl } = req.body;
    const sellerId = req.user.userId;

    const seller = await User.findById(sellerId, 'name'); // Fetch only the `name` field
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    const name = seller.name.toString(); 

    if (req.file) {
      let uploadedFile;

      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "RuralRise Products",
          resource_type: "image",
        });
      } catch (error) {
        resp.status(500);
        console.error("Cloudinary upload error:", error);
        throw new Error("Image could not be uploaded to the Cloud");
      }
  
      filedata = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
    else {
      filedata = {
        image: imageUrl
      };
    }
    
    // Create the product with both the seller's ID and name
    const product = new Product({
      title,
      description,
      price,
      category,
      image: filedata,
      seller: name,  
    });

    const savedProduct = await product.save();

    // Build the response object
    const response = {
      _id: savedProduct._id,
      title: savedProduct.title,
      description: savedProduct.description,
      price: savedProduct.price,
      image: savedProduct.image,
      category: savedProduct.category,
      seller: seller.name, 
    };
 
    res.status(201).json(response);
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is the seller
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    } 

    // Fetch the user to get the name
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); 
    }

    // Check if the user is the owner of the product
    if (product.seller !== user.name) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Product deletion error:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};