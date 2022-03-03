const axios = require('axios');
const { User } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../tokenFunction');

module.exports = async (req, res) => {
  const code = req.body.authorizationCode;
  const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`;
  const getAccessToken = await axios
    .post(
      url,
      // {
      //   client_id: process.env.GOOGLE_CLIENT_ID,
      //   client_secret: process.env.GOOGLE_CLIENT_SECRET,
      //   code,
      // },
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      }
    )
    .catch((err) => {
      console.log(err);
      console.log('AccessToken 받아오기 실패! ');
      return res.status(500).send('Internal server error');
    });

  if (!getAccessToken) {
    return res.status(401).send('Invalid accessToken');
  }

  const accessToken = getAccessToken.data.access_token;

  const googleAPI = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`;
  const userData = await axios
    .get(googleAPI, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .catch((err) => {
      console.log(err);
      console.log('유저 데이터 받아오기 실패! ');
      return res.status(500).send('Internal server error');
    });
  const { email, verified_email, name, picture } = userData.data;
  // console.log(userinfo);

  if (!verified_email) {
    return res.status(404).send({ message: 'block user' });
  }

  const randomNum = Math.floor(Math.random() * 100000);
  await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      name: `바나나 ${randomNum}`,
      profile_image_location: picture,
      region_id: 1,
      type: 'SOCIALUSER',
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send('Not found user');
      }
      const userInfo = data[0].dataValues;
      // console.log(userInfo);
      delete userInfo.password;
      const localAccessToken = generateAccessToken(userInfo);
      const localRefreshToken = generateRefreshToken(userInfo);
      sendAccessToken(res, localAccessToken);
      sendRefreshToken(res, localRefreshToken);
      return res.status(200).send({ message: 'ok' });
      // return res.redirect(302, '/users/info');
    })
    .catch((err) => {
      console.log(err);
      console.log('데이터베이스에 유저 정보 입력 실패');
      return res.status(500).send({ message: 'Internal server error' });
    });
};