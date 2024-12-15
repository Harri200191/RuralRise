const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product_controller");

jest.mock("../models/User");
jest.mock("../models/Product");
jest.mock("cloudinary", () => ({
  v2: {
    uploader: {
      upload: jest.fn(),
    },
  },
}));

const { v2: cloudinary } = require("cloudinary");
const User = require("../models/User");
const Product = require("../models/Product");

let req, res;

describe("Product Controller Tests", () => {
  beforeEach(() => {
    req = {
      user: { userId: "mockUserId" },
      body: {
        title: "Mock Product",
        description: "Mock Description",
        price: 100,
        category: "Handicrafts",
        imageUrl: "mockImageUrl",
      },
      file: null,
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("createProduct", () => {
    test("should create a product with an uploaded file", async () => {
      req.file = {
        path: "mock/path/to/file.jpg",
        originalname: "file.jpg",
        mimetype: "image/jpeg",
        size: 1024,
      };

      cloudinary.uploader.upload.mockResolvedValue({
        secure_url: "mockCloudinaryUrl",
      });

      User.findById.mockResolvedValue({ name: "Mock Seller" });

      const savedProduct = {
        _id: "mockProductId",
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: {
          fileName: "file.jpg",
          filePath: "mockCloudinaryUrl",
          fileType: "image/jpeg",
          fileSize: "1 KB",
        },
        seller: "Mock Seller",
      };

      Product.prototype.save.mockResolvedValue(savedProduct);

      await createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedProduct);
    });
  });

  describe("getProducts", () => {
    test("should fetch all products successfully", async () => {
      const mockProducts = [
        { _id: "1", title: "Product 1" },
        { _id: "2", title: "Product 2" },
      ];

      Product.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockProducts),
      });

      await getProducts(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });
  });

  describe("getProductById", () => {
    test("should fetch a product by ID successfully", async () => {
      const mockProduct = {
        _id: "1",
        title: "Product 1",
        seller: "Seller 1",
      };

      req.params.id = "1";

      Product.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockProduct),
      });

      await getProductById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe("deleteProduct", () => {
    test("should delete product successfully", async () => {
      req.params.id = "productId";
      
      const mockProduct = {
        _id: "productId",
        seller: "Mock Seller",
      };

      User.findById.mockResolvedValue({ name: "Mock Seller" });
      Product.findById.mockResolvedValue(mockProduct);
      Product.findByIdAndDelete.mockResolvedValue(mockProduct);

      await deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Product deleted successfully" });
    });

    test("should return 404 if product not found", async () => {
      req.params.id = "nonexistentId";
      Product.findById.mockResolvedValue(null);

      await deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    });
  });

  describe("updateProduct", () => {
    test("should update product successfully", async () => {
      req.params.id = "productId";
      req.body = { title: "Updated Title" };
      req.user = { id: "sellerId" };

      const mockProduct = {
        _id: "productId",
        seller: "sellerId",
      };

      Product.findById.mockResolvedValue(mockProduct);
      Product.findByIdAndUpdate.mockResolvedValue({
        ...mockProduct,
        title: "Updated Title",
      });

      await updateProduct(req, res);

      expect(res.json).toHaveBeenCalledWith({
        ...mockProduct,
        title: "Updated Title",
      });
    });

    test("should return 404 if product not found", async () => {
      req.params.id = "nonexistentId";
      Product.findById.mockResolvedValue(null);

      await updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    });
  });
});