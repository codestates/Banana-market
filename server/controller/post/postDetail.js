const {
  User,
  Region,
  Article,
  UserArticles,
  Category,
} = require('../../models');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  // 포스트 상세 내용 요청
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }

  const myId = accessTokenData.id;
  const articleId = req.params.articleid;
  if (!articleId) {
    return res.status(422).send({ message: 'Incorrect parameters supplied' });
  }
  //? article 데이터
  const articleData = await Article.findOne({
    where: { id: articleId },
  });

  if (!articleData) {
    return res.status(404).send({ message: 'Not found article' });
  }

  const {
    title,
    content,
    category_id,
    market,
    region_id,
    date,
    time,
    total_mate,
    current_mate,
    status,
    trade_type,
    createdAt,
    updatedAt,
    image_location,
  } = articleData.dataValues;

  //? article 작성자 데이터
  const articleWriter = await UserArticles.findOne({
    where: {
      article_id: articleId,
      is_host: true,
    },
  });

  const writerId = articleWriter.dataValues.user_id;
  const writerData = await User.findOne({
    where: { id: writerId },
  });
  const { name, profile_image_location } = writerData.dataValues;
  const writerRegionId = writerData.dataValues.region_id;
  const writerRegion = await Region.findOne({
    where: { id: writerRegionId },
  });
  const writerCity = writerRegion.dataValues.city;
  const writerTotalTrade = await UserArticles.findAll({
    where: { user_id: writerId },
  });

  const totalTrade = writerTotalTrade.length;
  const isMyPost = myId === writerId;

  //? article region 데이터
  const region = await Region.findOne({
    where: { id: region_id },
  });
  const { city } = region.dataValues;

  //? article category 데이터
  const category = await Category.findOne({
    where: { id: category_id },
  });
  const { food_type } = category.dataValues;

  return res.status(200).send({
    data: {
      post: {
        id: articleId,
        title,
        image: image_location,
        content,
        category: food_type,
        market,
        region: city,
        date,
        time,
        totalMate: total_mate,
        currentMate: current_mate,
        status,
        tradeType: trade_type,
        createdAt,
        updatedAt,
      },
      postWriter: {
        userId: writerId,
        isMyPost,
        name,
        profileImage: profile_image_location,
        region: writerCity,
        totalTrade,
      },
    },
    message: 'ok',
  });
};
