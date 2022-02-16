const { User } = require("../../models");

module.exports = async (req, res) => {
  // 이메일 중복 확인
  const { email } = req.body;
  if (!email) {
    return res
      .status(422)
      .send({ message: "Insufficient parameters supplied" });
  }

  const userInfo = await User.findOne({
    where: {
      email,
    },
  }).catch((err) => {
    res.status(500).send({
      message: "Internal server error",
    });
  });

  if (!userInfo) {
    return res.status(200).send({
      message: "ok",
    });
  } else {
    return res.status(409).send({
      message: "Already exist name",
    });
  }
};
