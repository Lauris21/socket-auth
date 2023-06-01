const dotenv = require("dotenv");
dotenv.config();

const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

const verifyGoogle = async (token = "") => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();

  const { name, picture, email } = payload;

  return {
    name,
    picture,
    email,
  };
};

module.exports = { verifyGoogle };
