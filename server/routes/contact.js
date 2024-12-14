const { sendContactEmail } = require('../controllers/contact_controller');
const express = require("express");

const router = express.Router();

router.post('/send', sendContactEmail);

module.exports = router;