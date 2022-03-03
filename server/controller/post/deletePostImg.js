const { checkAccessToken } = require('../tokenFunction');
// const { User } = require('../../models');
// const deleteProfileImage = require('../../modules/multerDeletePfp');
const deleteImage = require('../../modules/multerDeleteImg');

module.exports = async (req, res) => {
  console.log('Req', req.body);
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send('Not authorized');
  }

  const { imageKey } = req.body;
  const params = {
    Bucket: 'banana-profile-img',
    Key: imageKey,
  };

  try {
    deleteImage(params);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal server error' });
  }

  return res.status(200).send({ message: 'Delete success' });
};
