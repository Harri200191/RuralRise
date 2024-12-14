const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authRouter = require("../routes/authRoutes");
const authenticateToken = require("../middleware/auth");

jest.mock("../models/User");
jest.mock("../middleware/auth");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("Auth Routes", () => {
  let mockUser;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUser = {
      _id: "user123",
      email: "testuser@example.com",
      password: "hashedpassword",
      name: "Test User",
      role: "user",
      location: "Test Location",
      comparePassword: jest.fn(),
    };
  });

  describe("POST /auth/register", () => {
    it("should register a user successfully", async () => {
      User.findOne.mockResolvedValue(null); // No existing user
      User.prototype.save = jest.fn().mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue("mockedToken");

      const res = await request(app).post("/auth/register").send({
        email: mockUser.email,
        password: "password123",
        name: mockUser.name,
        role: mockUser.role,
        location: mockUser.location,
      });

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
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app).post("/auth/register").send({
        email: mockUser.email,
        password: "password123",
        name: mockUser.name,
        role: mockUser.role,
        location: mockUser.location,
      });

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ message: "Email already registered" });
    });

    it("should return 500 if registration fails", async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockRejectedValue(new Error("Database error"));

      const res = await request(app).post("/auth/register").send({
        email: mockUser.email,
        password: "password123",
        name: mockUser.name,
        role: mockUser.role,
        location: mockUser.location,
      });

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Registration failed" });
    });
  });

  describe("POST /auth/login", () => {
    it("should log in a user successfully", async () => {
      User.findOne.mockResolvedValue(mockUser);
      mockUser.comparePassword.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockedToken");

      const res = await request(app).post("/auth/login").send({
        email: mockUser.email,
        password: "password123",
      });

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

    it("should return 401 for invalid credentials", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post("/auth/login").send({
        email: "wrongemail@example.com",
        password: "wrongpassword",
      });

      expect(User.findOne).toHaveBeenCalledWith({ email: "wrongemail@example.com" });
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ message: "Invalid credentials" });
    });

    it("should return 500 if login fails", async () => {
      User.findOne.mockRejectedValue(new Error("Database error"));

      const res = await request(app).post("/auth/login").send({
        email: mockUser.email,
        password: "password123",
      });

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Login failed" });
    });
  });

  describe("GET /auth/me", () => {
    it("should fetch the current user successfully", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { userId: mockUser._id };
        next();
      });

      User.findById.mockResolvedValue({
        ...mockUser,
        password: undefined, // Exclude password in response
      });

      const res = await request(app).get("/auth/me");

      expect(authenticateToken).toHaveBeenCalled();
      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ user: { ...mockUser, password: undefined } });
    });

    it("should return 404 if user is not found", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { userId: "nonexistentUserId" };
        next();
      });

      User.findById.mockResolvedValue(null);

      const res = await request(app).get("/auth/me");

      expect(User.findById).toHaveBeenCalledWith("nonexistentUserId");
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if fetching user fails", async () => {
      authenticateToken.mockImplementation((req, res, next) => {
        req.user = { userId: mockUser._id };
        next();
      });

      User.findById.mockRejectedValue(new Error("Database error"));

      const res = await request(app).get("/auth/me");

      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Error fetching user" });
    });
  });
});
