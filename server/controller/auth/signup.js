const { User, Region } = require('../../models');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  sendAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunction');
const profileImageUpload = require('../../modules/multerUploadPfp');
const profileImage = profileImageUpload.single('profileImage');

module.exports = async (req, res) => {
  //회원가입 요청

  let { email, password, name, region } = req.body;

  if (!email || !password || !name || !region) {
    return res
      .status(422)
      .send({ message: 'Insufficient parameters supplied' });
  }
  const location = null;
  const key = null;

  profileImage(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: 'Fail profile image upload' });
    }
    if (req.file) {
      location = req.file.transforms[0].location;
      key = req.file.transforms[0].key;
    }
  });

  const regionInfo = await Region.findOne({
    where: {
      city: region,
    },
  });
  const regionId = regionInfo.id;

  const saltRound = 10;
  bcrypt.genSalt(saltRound, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      User.create({
        email,
        name,
        password: hash,
        region_id: regionId,
        profile_image_location: location,
        profile_image_key: key,
      })
        .then((userInfo) => {
          delete userInfo.dataValues.password;
          const accessToken = generateAccessToken(userInfo.dataValues);
          const refreshToken = generateRefreshToken(userInfo.dataValues);
          sendAccessToken(res, accessToken);
          sendRefreshToken(res, refreshToken);
          return res
            .status(201)
            .send({ data: userInfo.dataValues, message: 'ok' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({ message: 'Internal server error' });
        });
    });
  });
};
