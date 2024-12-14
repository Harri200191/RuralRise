
const user_model = require("../models/User");
const sgMail = require('@sendgrid/mail');
const dotenv = require("dotenv");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const contactUs = async (req, res) => {
  const {name, email, subject, message} = req.body;
  const user = await user_model.findOne( {email: "harisrehmanchugtai@gmail.com"} );

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  } 
  
  //   Validation
  if (!subject.trim() || !message.trim()) {
    res.status(400);
    throw new Error("Please add subject and message");
  }

  const msg = {
    to:  process.env.EMAIL_USER,
    from: process.env.EMAIL_HOST, // Use the email address or domain you verified above
    subject: subject,
    text: message + " from " + email
  };
    
  (async () => {
    try {
        await sgMail.send(msg);
        res.status(200).json({success: true, message: "Email sent successfully"});
    } catch (error) {
        console.error(error);

        if (error.response) {
        console.error(error.response.body)
        }
    }
    })();
 
};

module.exports = {
  contactUs,
};
