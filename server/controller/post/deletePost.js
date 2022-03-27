const { User, Article, UserArticles } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');
const deleteImage = require('../../modules/multerDeleteImg');

module.exports = async (req, res) => {
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }

  const userId = accessTokenData.id;

  const articleId = req.params.articleid;
  if (!articleId) {
    return res.status(422).send({ message: 'Incorrect parameters supplied' });
  }

  UserArticles.findOne({
    where: { article_id: articleId },
  }).then((articleData) => {
    // console.log(articleData);
    const imageKey = articleData.dataValues.image_key;
    const params = {
      Bucket: 'banana-mk-image',
      Key: imageKey,
    };

    if (
      imageKey !== 'jointPurchaseDefaultImage.jpeg' &&
      imageKey !== 'shareDefaultImage.jpeg'
    ) {
      deleteImage(params);
    }

    const writerId = articleData.dataValues.user_id;
    if (writerId === userId) {
      Article.destroy({
        where: {
          id: articleId,
        },
      })
        .then(() => {
          return res.status(200).send({ message: 'Delete success' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({ message: 'Internal server error' });
        });
    } else {
      return res.status(401).send({ message: 'Not host' });
    }
  });
};
