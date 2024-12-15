const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  } = require("../controllers/product_controller");
  const Product = require("../models/Product");
  
  jest.mock("../models/Product"); // Ensure the mock is set before requiring the controller
  
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
  
    describe("createProduct Controller", () => {
      beforeEach(() => {
        req = {
          user: { userId: "mockSellerId" },
          body: {
            title: "Mock Product",
            description: "Mock Description",
            price: 100,
            category: "Mock Category",
            imageUrl: "mockImageUrl",
          },
        };
  
        // Mock the save method to resolve with the saved product data
        Product.prototype.save.mockResolvedValue({
          _id: "mockProductId",
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          image: req.body.imageUrl,
          seller: req.user.userId,
        });
  
        // Mock findById to return an object with a populate method
        Product.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue({
            _id: "mockProductId",
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.imageUrl,
            seller: { name: "Mock Seller" },
          }),
        });
      });
  
      test("should create a product successfully", async () => {
        await createProduct(req, res);
  
        expect(Product.prototype.save).toHaveBeenCalled();
        expect(Product.findById).toHaveBeenCalledWith("mockProductId");
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          _id: "mockProductId",
          title: "Mock Product",
          description: "Mock Description",
          price: 100,
          category: "Mock Category",
          image: "mockImageUrl",
          seller: "Mock Seller" ,
        });
      });
  
      test("should handle database errors", async () => {
        Product.prototype.save.mockRejectedValue(new Error("Database error"));
  
        await createProduct(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Failed to create product" });
      });
    });
  
    describe("getProducts", () => {
      test("should fetch products successfully", async () => {
        const productsMock = [
          { _id: "product1", title: "Product 1", seller: "Seller 1"  },
          { _id: "product2", title: "Product 2", seller: "Seller 2"  },
        ];
  
        // Mock the chained methods: find().populate().sort()
        Product.find.mockReturnValue({
          populate: jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(productsMock),
          }),
        });
  
        await getProducts(req, res);
  
        expect(Product.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(productsMock);
      });
  
      test("should return an error if product fetch fails", async () => {
        // Mock the chained methods to reject at sort
        Product.find.mockReturnValue({
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
  
        // Mock findById().populate()
        Product.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue(productMock),
        });
  
        await getProductById(req, res);
  
        expect(Product.findById).toHaveBeenCalledWith("product1");
        expect(res.json).toHaveBeenCalledWith(productMock);
      });
  
      test("should return 404 if product is not found", async () => {
        req.params.id = "nonexistent";
  
        // Mock findById().populate() to return null
        Product.findById.mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
        });
  
        await getProductById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
      });
  
      test("should return an error if fetching product fails", async () => {
        req.params.id = "product1";
  
        // Mock findById().populate() to reject
        Product.findById.mockReturnValue({
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
  
        // Mock findById to return the product
        Product.findById.mockResolvedValue(productMock);
  
        // Mock findByIdAndUpdate to return the updated product
        Product.findByIdAndUpdate.mockResolvedValue({
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
  
        // Mock findById to return a product with a different seller
        Product.findById.mockResolvedValue(productMock);
  
        await updateProduct(req, res);
  
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
      });
  
      test("should return 404 if product is not found", async () => {
        req.params.id = "nonexistent";
  
        // Mock findById to return null
        Product.findById.mockResolvedValue(null);
  
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
          remove: jest.fn().mockResolvedValue(),
        };
  
        // Mock findById to return the product
        Product.findById.mockResolvedValue(productMock);
  
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
  
        // Mock findById to return a product with a different seller
        Product.findById.mockResolvedValue(productMock);
  
        await deleteProduct(req, res);
  
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "Not authorized" });
      });
  
      test("should return 404 if product is not found", async () => {
        req.params.id = "nonexistent";
  
        // Mock findById to return null
        Product.findById.mockResolvedValue(null);
  
        await deleteProduct(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
      });
    });
  });
  