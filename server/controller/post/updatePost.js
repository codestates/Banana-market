const { User, Article, UserArticles, Category } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');
const deleteImage = require('../../modules/multerDeleteImg');
const uploadImage = require('../../modules/multerUploadImg');
const articleImage = uploadImage.single('image');

module.exports = async (req, res) => {
  // 게시물 수정

  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send('Not authorized');
  }
  const userId = accessTokenData.id;

  const articleId = req.params.articleid;
  if (!articleId) {
    return res.status(422).send({ message: 'Incorrect parameters supplied' });
  }

  const isHost = await UserArticles.findOne({
    where: {
      article_id: articleId,
      user_id: userId,
      is_host: true,
    },
  });

  if (!isHost) {
    return res.status(401).send({ message: 'No writer' });
  }

  const originalData = await Article.findOne({
    where: { id: articleId },
  });

  const articleInfo = req.body;
  const { title, content, category, market, tradeType, date, time, totalMate } =
    articleInfo;
  let location = 'jointPurchaseDefaultImage.jpeg';
  let key =
    'https://banana-mk-image.s3.ap-northeast-2.amazonaws.com/jointPurchaseDefaultImage.jpeg';
  if (tradeType) {
    articleInfo['trade_type'] = tradeType;
    if (tradeType === 'share') {
      (location =
        'https://banana-mk-image.s3.ap-northeast-2.amazonaws.com/shareDefaultImage.jpeg'),
        (key = 'shareDefaultImage.jpeg');
    }
    delete articleInfo.tradeType;
    articleInfo.image_key = key;
    articleInfo.image_location = location;
  }

  if (totalMate) {
    articleInfo['total_mate'] = totalMate;
    delete articleInfo.totalMate;
  }

  // 조인해서 수정 => category
  if (category) {
    Category.findOne({
      where: { food_type: category },
    })
      .then((data) => {
        delete articleInfo.category;
        const categoryId = data.dataValues.id;
        Article.update(
          { category_id: categoryId },
          { where: { id: articleId } }
        );
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: 'Internal server error' });
      });
  }

  Article.update(articleInfo, {
    where: { id: articleId },
  }).catch((err) => {
    console.log(err);
    return res.status(500).send({ message: 'Internal server error' });
  });

  // 이미지 수정
  articleImage(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: 'Fail upload' });
    }
    if (!req.file) {
      // 수정할 이미지가 없음
      return;
    }
    // 이미 이미지가 있으면 삭제 후 업로드
    const imageKey = originalData.dataValues.image_key;
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

    location = req.file.transforms[0].location;
    key = req.file.transforms[0].key;

    Article.update(
      {
        image_key: key,
        image_location: location,
      },
      { where: { id: articleId } }
    ).catch((err) => {
      console.log(err);
      return res.status(500).send({ message: 'Fail upload' });
    });
  });

  return res.redirect(302, `/articles/${originalData.id}`);
};
