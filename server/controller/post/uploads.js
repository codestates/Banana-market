const { Article, UserArticles, Category, Region } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');
// const uploadImage = require('../../modules/multerUploadImg');
// const articleImage = uploadImage.single('image');

module.exports = async (req, res) => {
  // 포스팅 업로드 기능
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }
  const userId = accessTokenData.id;

  // articleImage(req, res, async (err) => {
  //   const contentType = req.headers['content-type'];
  //   console.log('contentType:', contentType);
  //   const articleData = JSON.parse(req.body.data);
  //   const image = req.file;

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
    url,
  } = req.body;

  let { imageKey } = req.body;

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
    !address ||
    !url
  ) {
    return res.status(422).send({ message: 'Incorrect parameters supplied' });
  }

  const categoryData = await Category.findOne({
    where: { food_type: category },
  });
  const categoryId = categoryData.dataValues.id;

  const regionData = await Region.findOne({
    where: { city: region },
  });
  const regionId = regionData.dataValues.id;

  if (!imageKey) {
    if (tradeType === 'share') {
      imageKey = 'shareDefaultImage.jpeg';
    } else if (tradeType === 'jointPurchase') {
      imageKey = 'jointPurchaseDefaultImage.jpeg';
    }
  }

  Article.create({
    title,
    image_key: imageKey,
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
    url,
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
          console.log('data', data);
          const id = data.dataValues.article_id;
          // console.log(data);
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
