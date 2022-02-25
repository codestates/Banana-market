const {
  User,
  Article,
  UserArticles,
  Category,
  Region,
} = require('../../models');
const { checkAccessToken } = require('../tokenFunction');
const uploadImage = require('../../modules/multerUploadImg');
const articleImage = uploadImage.single('image');

module.exports = async (req, res) => {
  // 포스팅 업로드 기능
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }
  const userId = accessTokenData.id;

  const {
    title,
    content,
    category,
    market,
    date,
    time,
    tradeType,
    totalMate,
    region,
    address,
    imageLocation,
    imageKey,
  } = req.body;

  if (
    !title ||
    !content ||
    !category ||
    !market ||
    !date ||
    !time ||
    !tradeType ||
    !totalMate ||
    !region ||
    !address
  ) {
    res.status(422).send({ message: 'Incorrect parameters supplied' });
  }

  const categoryData = await Category.findOne({
    where: {
      food_type: category,
    },
  });
  const categoryId = categoryData.dataValues.id;
  const regionData = await Region.findOne({
    where: {
      city: region,
    },
  });
  const regionId = regionData.dataValues.id;

  if (!imageLocation && !imageKey) {
    if (tradeType === 'share') {
      imageLocation =
        'https://banana-mk-image.s3.ap-northeast-2.amazonaws.com/shareDefaultImage.jpeg';
      imageKey = 'shareDefaultImage.jpeg';
    } else if (tradeType === 'jointPurchase') {
      imageLocation =
        'https://banana-mk-image.s3.ap-northeast-2.amazonaws.com/jointPurchaseDefaultImage.jpeg';
      imageKey = 'jointPurchaseDefaultImage.jpeg';
    }
  }

  Article.create({
    title,
    image_key: imageKey,
    image_location: imageLocation,
    content,
    category_id: categoryId,
    market,
    region_id: regionId,
    date,
    time,
    total_mate: totalMate,
    current_mate: 1,
    trade_type: tradeType,
    address,
    status: true,
  })
    .then((articleData) => {
      const articleId = articleData.dataValues.id;
      UserArticles.create({
        user_id: userId,
        article_id: articleId,
        is_host: true,
      })
        .then((data) => {
          const id = data.dataValues.article_id;
          console.log(data);
          return res.redirect(`/articles/${id}`);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Internal server error');
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('Internal server error');
    });
};
