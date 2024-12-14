const { contactUs } = require("../controllers/contact_controller");
const sgMail = require('@sendgrid/mail');
const user_model = require("../models/User");

jest.mock("@sendgrid/mail");
jest.mock("../models/User");

describe("contactUs Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: "Test User",
        email: "testuser@example.com",
        subject: "Test Subject",
        message: "Test Message"
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    sgMail.send.mockReset();
    user_model.findOne.mockReset();``
  });

  test("should return error if subject or message is missing", async () => {
    user_model.findOne.mockResolvedValue({ email: "harisrehmanchugtai@gmail.com" });
    req.body.subject = ""; 

    await expect(contactUs(req, res)).rejects.toThrow("Please add subject and message");
  });

  test("should return error if user is not found", async () => {
    user_model.findOne.mockResolvedValue(null);

    await expect(contactUs(req, res)).rejects.toThrow("User not found, please signup");
  });

  test("should send email successfully", async () => {
    user_model.findOne.mockResolvedValue({ email: "harisrehmanchugtai@gmail.com" });
    sgMail.send.mockResolvedValue();

    await contactUs(req, res);

    expect(sgMail.send).toHaveBeenCalledWith({
      to: process.env.EMAIL_USER,
      from: process.env.EMAIL_HOST,
      subject: req.body.subject,
      text: `${req.body.message} from ${req.body.email}`
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Email sent successfully" });
  });

  test("should handle email sending error", async () => {
    user_model.findOne.mockResolvedValue({ email: "harisrehmanchugtai@gmail.com" });
    sgMail.send.mockRejectedValue(new Error("SendGrid error"));

    await contactUs(req, res);

    expect(res.status).not.toHaveBeenCalledWith(200);
  });
});
