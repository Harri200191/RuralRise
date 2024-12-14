const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authRouter = require("../routes/auth");
const authenticateToken = require("../middleware/auth");

jest.mock("../models/User");
jest.mock("../middleware/auth");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("Auth Routes", () => {
  let mockUser;

  beforeAll(() => {
    // Set the JWT_SECRET environment variable for testing
    process.env.JWT_SECRET = "test_secret";
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = {
      _id: "mockedUserId",
      email: "testuser@example.com",
      password: "hashedpassword",
      name: "Test User",
      role: "mentor",
      location: "Test Location",
      comparePassword: jest.fn(),
    };
  });

  describe("POST /auth/register", () => {
    it("should register a user successfully", async () => {
      // Mock User.findOne to return null (no existing user)
      User.findOne.mockResolvedValue(null);

      // Mock the save method to assign _id and return the user instance
      User.prototype.save.mockImplementation(function () {
        this._id = mockUser._id;
        this.email = mockUser.email;
        this.password = mockUser.password;
        this.name = mockUser.name;
        this.role = mockUser.role;
        this.location = mockUser.location;
        return Promise.resolve(this);
      });

      // Mock jwt.sign to return a fixed token
      jwt.sign.mockReturnValue("mockedToken");

      const res = await request(app).post("/auth/register").send({
        email: mockUser.email,
        password: "password123",
        name: mockUser.name,
        role: mockUser.role,
        location: mockUser.location,
      });

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({
        token: "mockedToken",
        user: {
          id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          location: mockUser.location,
        },
      });
    });

    it("should return 400 if email is already registered", async () => {
      // Mock User.findOne to return an existing user
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app).post("/auth/register").send({
        email: mockUser.email,
        password: "password123",
        name: mockUser.name,
        role: mockUser.role,
        location: mockUser.location,
      });

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ message: "Email already registered" });
    });

    it("should return 500 if registration fails", async () => {
      // Mock User.findOne to return null (no existing user)
      User.findOne.mockResolvedValue(null);

      // Mock save to reject with an error
      User.prototype.save.mockRejectedValue(new Error("Database error"));

      const res = await request(app).post("/auth/register").send({
        email: mockUser.email,
        password: "password123",
        name: mockUser.name,
        role: mockUser.role,
        location: mockUser.location,
      });

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Registration failed" });
    });
  });

  describe("POST /auth/login", () => {
    it("should log in a user successfully", async () => {
      // Mock User.findOne to return the user
      User.findOne.mockResolvedValue(mockUser);

      // Mock comparePassword to return true (passwords match)
      mockUser.comparePassword.mockResolvedValue(true);

      // Mock jwt.sign to return a fixed token
      jwt.sign.mockReturnValue("mockedToken");

      const res = await request(app).post("/auth/login").send({
        email: mockUser.email,
        password: "password123",
      });

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith("password123");
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        token: "mockedToken",
        user: {
          id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          location: mockUser.location,
        },
      });
    });

    it("should return 401 for invalid credentials (user not found)", async () => {
      // Mock User.findOne to return null (user not found)
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post("/auth/login").send({
        email: "wrongemail@example.com",
        password: "wrongpassword",
      });

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ email: "wrongemail@example.com" });
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ message: "Invalid credentials" });
    });

    it("should return 401 for invalid credentials (incorrect password)", async () => {
      // Mock User.findOne to return the user
      User.findOne.mockResolvedValue(mockUser);

      // Mock comparePassword to return false (passwords do not match)
      mockUser.comparePassword.mockResolvedValue(false);

      const res = await request(app).post("/auth/login").send({
        email: mockUser.email,
        password: "wrongpassword",
      });

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith("wrongpassword");
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ message: "Invalid credentials" });
    });

    it("should return 500 if login fails due to server error", async () => {
      // Mock User.findOne to reject with an error
      User.findOne.mockRejectedValue(new Error("Database error"));

      const res = await request(app).post("/auth/login").send({
        email: mockUser.email,
        password: "password123",
      });

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Login failed" });
    });
  });

  describe("GET /auth/me", () => {
    beforeEach(() => {
      // Mock the authenticateToken middleware to set req.user
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { userId: mockUser._id };
        next();
      });
    });

    it("should fetch the current user successfully", async () => {
      // Mock User.findById to return a user without the password
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: mockUser._id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
          location: mockUser.location,
        }),
      });

      const res = await request(app).get("/auth/me");

      // Assertions
      expect(authenticateToken).toHaveBeenCalled();
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        user: {
          _id: mockUser._id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
          location: mockUser.location,
        },
      });
    });

    it("should return 404 if user is not found", async () => {
      // Mock User.findById to return null (user not found)
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const res = await request(app).get("/auth/me");

      // Assertions
      expect(authenticateToken).toHaveBeenCalled();
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if fetching user fails", async () => {
      // Mock User.findById to throw an error
      User.findById.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      const res = await request(app).get("/auth/me");

      // Assertions
      expect(authenticateToken).toHaveBeenCalled();
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Error fetching user" });
    });
  });
});
