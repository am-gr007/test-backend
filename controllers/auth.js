require("dotenv").config();
const axios = require("axios");
const query_string = require("querystring");

const google_auth_token_endpoint =
  "https://accounts.google.com/o/oauth2/v2/auth";

const google_acces_token_endpoint = "https://oauth2.googleapis.com/token";

const sendAuthenticationGoogle = async (req, res) => {
  try {
    const query_params = {
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      redirect_uri: `http://localhost:3000/auth/google_callback`,
      access_type: "offline",
      prompt: "consent",
    };

    const auth_token_params = {
      ...query_params,
      response_type: "code",
    };

    const scopes = ["profile", "email", "openid"];

    const request_url = `${google_auth_token_endpoint}?${query_string.stringify(
      auth_token_params
    )}&scope=${scopes.join(" ")}`;

    res.redirect(request_url);
  } catch (error) {
    console.log(error);
  }
};

const getAccessTokenGoogle = async (req, res) => {
  try {
    const query_params = {
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      redirect_uri: `http://localhost:3000/auth/google_callback`,
    };

    const access_token_params = {
      ...query_params,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      code: req.query.code,
      grant_type: "authorization_code",
    };

    const axios_response = await axios.post(
      `${google_acces_token_endpoint}?${query_string.stringify(
        access_token_params
      )}`
    );
        req.tokens = {
            access_token: axios_response.data.access_token,
            id_token: axios_response.data['id_token'].split('.')[1],
            token_type: 'Bearer'
        }


    res.json({ msg: axios_response.data});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendAuthenticationGoogle,
  getAccessTokenGoogle,
};
