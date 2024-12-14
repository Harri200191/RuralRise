const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  } = require("../controllers/productController");
  const Product = require("../models/Product");
  
  jest.mock("../models/Product");
  
  describe("Product Controller", () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        body: {},
        params: {},
        user: { userId: "user123", id: "user123" }, // Mock user for seller authorization
      };
  
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      jest.clearAllMocks();
    });
  
    describe("createProduct", () => {
      test("should create a product successfully", async () => {
        req.body = {
          title: "Test Product",
          description: "Test Description",
          price: 100,
          category: "Test Category",
          imageUrl: "http://example.com/image.jpg",
        };
  
        const savedProductMock = {
          _id: "product123",
          title: "Test Product",
          description: "Test Description",
          price: 100,
          category: "Test Category",
          seller: "user123",
        };
  
        Product.prototype.save = jest.fn().mockResolvedValue(savedProductMock);
        Product.findById = jest.fn().mockResolvedValue({
          ...savedProductMock,
          seller: { name: "Test Seller" },
        });
  
        await createProduct(req, res);
  
        expect(Product.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          ...savedProductMock,
          seller: { name: "Test Seller" },
        });
      });
  
      test("should return an error if product creation fails", async () => {
        req.body = {
          title: "Test Product",
          description: "Test Description",
          price: 100,
          category: "Test Category",
          imageUrl: "http://example.com/image.jpg",
        };
  
        Product.prototype.save = jest.fn().mockRejectedValue(new Error("Database error"));
  
        await createProduct(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Failed to create product" });
      });
    });
  
    describe("getProducts", () => {
      test("should fetch products successfully", async () => {
        const productsMock = [
          { _id: "product1", title: "Product 1", seller: { name: "Seller 1" } },
          { _id: "product2", title: "Product 2", seller: { name: "Seller 2" } },
        ];
  
        Product.find = jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(productsMock),
          }),
        });
  
        await getProducts(req, res);
  
        expect(Product.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(productsMock);
      });
  
      test("should return an error if product fetch fails", async () => {
        Product.find = jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            sort: jest.fn().mockRejectedValue(new Error("Database error")),
          }),
        });
  
        await getProducts(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Failed to fetch products" });
      });
    });
  
    describe("getProductById", () => {
      test("should fetch a product by ID successfully", async () => {
        const productMock = {
          _id: "product1",
          title: "Product 1",
          seller: { name: "Seller 1" },
        };
  
        req.params.id = "product1";
  
        Product.findById = jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(productMock),
        });
  
        await getProductById(req, res);
  
        expect(Product.findById).toHaveBeenCalledWith("product1");
        expect(res.json).toHaveBeenCalledWith(productMock);
      });
  
      test("should return 404 if product is not found", async () => {
        req.params.id = "nonexistent";
  
        Product.findById = jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
        });
  
        await getProductById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
      });
  
      test("should return an error if fetching product fails", async () => {
        req.params.id = "product1";
  
        Product.findById = jest.fn().mockReturnValue({
          populate: jest.fn().mockRejectedValue(new Error("Database error")),
        });
  
        await getProductById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Failed to fetch product" });
      });
    });
  
    describe("updateProduct", () => {
      test("should update a product successfully", async () => {
        req.params.id = "product1";
        req.body = { title: "Updated Product" };
  
        const productMock = {
          _id: "product1",
          seller: req.user.id,
        };
  
        Product.findById = jest.fn().mockResolvedValue(productMock);
        Product.findByIdAndUpdate = jest.fn().mockResolvedValue({
          ...productMock,
          ...req.body,
        });
  
        await updateProduct(req, res);
  
        expect(Product.findById).toHaveBeenCalledWith("product1");
        expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
          "product1",
          req.body,
          { new: true }
        );
        expect(res.json).toHaveBeenCalledWith({
          ...productMock,
          ...req.body,
        });
      });
  
      test("should return 403 if user is not authorized", async () => {
        req.params.id = "product1";
  
        const productMock = {
          _id: "product1",
          seller: "anotherUser",
        };
  
        Product.findById = jest.fn().mockResolvedValue(productMock);
  
        await updateProduct(req, res);
  
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
      });
  
      test("should return 404 if product is not found", async () => {
        req.params.id = "nonexistent";
  
        Product.findById = jest.fn().mockResolvedValue(null);
  
        await updateProduct(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
      });
    });
  
    describe("deleteProduct", () => {
      test("should delete a product successfully", async () => {
        req.params.id = "product1";
  
        const productMock = {
          _id: "product1",
          seller: req.user.id,
          remove: jest.fn(),
        };
  
        Product.findById = jest.fn().mockResolvedValue(productMock);
  
        await deleteProduct(req, res);
  
        expect(Product.findById).toHaveBeenCalledWith("product1");
        expect(productMock.remove).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: "Product removed" });
      });
  
      test("should return 403 if user is not authorized", async () => {
        req.params.id = "product1";
  
        const productMock = {
          _id: "product1",
          seller: "anotherUser",
        };
  
        Product.findById = jest.fn().mockResolvedValue(productMock);
  
        await deleteProduct(req, res);
  
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
      });
  
      test("should return 404 if product is not found", async () => {
        req.params.id = "nonexistent";
  
        Product.findById = jest.fn().mockResolvedValue(null);
  
        await deleteProduct(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
      });
    });
  });
  