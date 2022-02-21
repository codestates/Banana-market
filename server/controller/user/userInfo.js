const { User, Region } = require("../../models");
const { checkAccessToken } = require("../tokenFunction");

module.exports = async (req, res) => {
  // 회원 정보 요청
  const accessTokenData = checkAccessToken(req);
  // console.log(accessTokenData);
  if (!accessTokenData) {
    return res.status(401).send({ message: "Not authorized" });
  }

  const { id } = accessTokenData;

  const userData = await User.findOne({
    where: { id },
  });

  if (!userData) {
    return res.status(404).send({ message: "Not found" });
  }

  const region = await Region.findOne({
    where: {
      id: userData.region_id,
    },
  });

  delete userData.dataValues.password;
  delete userData.dataValues.region_id;
  delete userData.dataValues.id;
  userData.dataValues["userId"] = id;
  userData.dataValues["region"] = region.dataValues.city;

  res.status(200).send({ data: userData.dataValues, message: "ok" });
};
