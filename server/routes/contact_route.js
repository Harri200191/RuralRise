const express = require("express");
const { contactUs } = require("../controllers/contact_controller");

const router = express.Router();
const protect = require("../middleware/auth");

router.post("/email", contactUs);

module.exports = router;