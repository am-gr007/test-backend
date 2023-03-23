const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../controllers/passport_auth");

const {
  sendAuthenticationGoogle,
  getAccessTokenGoogle,
} = require("../controllers/auth");

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));
router.route("/google_callback").get(
  passport.authenticate("google", {
    successReturnToOrRedirect: "/authenticated",
    failureRedirect: "/authentication-failed",
  })
);

module.exports = router;
