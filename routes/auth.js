const express = require("express");
const router = express.Router();

const {
  sendAuthenticationGoogle,
  getAccessTokenGoogle,
} = require("../controllers/auth");

router.route('/google').get(sendAuthenticationGoogle);
router.route('/google_callback').get(getAccessTokenGoogle);

module.exports = router;
