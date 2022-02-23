const { User, Region } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  // 사용자 지역 정보 요청
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send('Not authorized');
  }

  const { id } = accessTokenData;

  User.findOne({
    include: [{ model: Region }],
    where: { id },
  })
    .then((userData) => {
      if (!userData) {
        return res.status(404).send('Not found user');
      }
      const { city } = userData.dataValues.Region.dataValues;
      res.status(200).send({
        data: {
          region: city,
        },
        message: 'ok',
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: 'Internal server error' });
    });
};
