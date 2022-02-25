const { Articles } = require('../../models');
const uploadImage = require('../../modules/multerUploadImg');
const articleImage = uploadImage.single('image');

module.exports = async (req, res) => {
  //   console.log(req.file);
  //   res.status(200).send('ok');
  let location = null;
  let key = null;

  articleImage(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: 'Fail image upload' });
    }

    location = req.file.transforms[0].location;
    key = req.file.transforms[0].key;

    if (!req.file) {
      return res.status(204).send({
        data: {
          imageLocation: null,
          imageKey: null,
        },
        message: 'No image',
      });
    }
    res.status(201).send({
      data: {
        imageLocation: location,
        imageKey: key,
      },
      message: 'ok',
    });
  });
};
