const { User, Region, Article } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  // 회원 정보 요청
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }

  const { id } = accessTokenData;

  const userData = await User.findOne({
    include: [{ model: Region }, { model: Article }],
    where: { id },
  });

  if (!userData) {
    return res.status(404).send({ message: 'Not found' });
  }
  const { city } = userData.dataValues.Region.dataValues;
  const totalTrade = userData.Articles.length;
  const {
    name,
    email,
    profile_image_location,
    block,
    type,
    createdAt,
    updatedAt,
  } = userData;

  const userInfo = {
    userId: id,
    name,
    email,
    profileImage: profile_image_location,
    block,
    type,
    createdAt,
    updatedAt,
    region: city,
    totalTrade,
  };

  res.status(200).send({ data: userInfo, message: 'ok' });
};