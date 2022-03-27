const { Op } = require("sequelize");
const { User, Report } = require("../../models");
const { checkAccessToken } = require("../tokenFunction");
const { Sequelize } = require("./../../models/index.js");


module.exports = async (req, res) => {
  const accessTokenData = checkAccessToken(req);

  // 토큰이 없거나 잘못된 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: "Not authorized" });
  }

  const { type } = accessTokenData;

  // block 요청 유저가 ADMIN이 아닌 경우
  if (type !== 'ADMIN') {
    return res.status(401).send({ message: "Not authorized" });
  } else {
    // 요청 유저가 ADMIN인 경우 신고받은 유저 목록 
    const reportList = await User.findAll({
      attributes : [['id', 'userId'], 'name', 'email', ['profile_image_key', 'profileImage'], 'block'],
      include : [{
        model : Report,
        attributes : [],
        where : {
          count : {
            [Op.gte] : 1 
          }
        }
      }]
    }).catch((err) => {
      res.status(500).send({message : 'Internal server error'})
    })

    // console.log(reportList)
  
    if (!reportList) {
      res.status(200).send({ message: "No one reported"})
    }
  
    return res.status(200).json({
      data : {
        reportedUserInfo : reportList
      }, 
      message: "ok" 
    });
  }
}