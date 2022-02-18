const { User } = require("../../models");
const { checkAccessToken } = require("../tokenFunction");

module.exports = async (req, res) => {
  // 프로필 사진 업로드 및 수정
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: "Not authorized" });
  }

  const { id } = accessTokenData;

  const image = req.file;

  if (image === undefined) {
    return res.status(404).send({ message: "Not found" });
  }

  const { location, key } = image;

  User.update(
    {
      profile_image_location: location,
      profile_image_key: key,
    },
    {
      where: { id },
    }
  )
    .then(() => {
      return res.status(201).send({
        data: {
          profileImage: location,
        },
        message: "ok",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Internal server error");
    });
};
