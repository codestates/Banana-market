// const { OAuth2Client } = require('google-auth-library');
// require('dotenv').config();
// const token = require('./token');
// const client = new OAuth2Client(process.env.CLIENT_ID);
// module.exports = async (req, res) => {
//   function verify() {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const userid = payload['sub'];
//   }
//   verify().catch(console.error);
// };
const axios = require('axios');
module.exports = async (req, res) => {
  const code = req.body.authorizationCode;
  const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`;
  const access_token = await axios
    .post(url, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
    .then((el) => {
      return el.data.access_token;
    })
    .catch((err) => {
      console.log('err=', err);
    });
};
