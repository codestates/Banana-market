const { User, Region, Article, Category } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  // 포스트 상세 내용 요청
  let accessTokenData = '';
  if (req.cookies) {
    accessTokenData = checkAccessToken(req);
  }

  const articleId = req.params.articleid;
  if (!articleId) {
    return res.status(422).send({ message: 'Incorrect parameters supplied' });
  } else {
    Article.findOne({
      include: [
        { model: Region },
        { model: Category },
        {
          model: User,
          include: [{ model: Article }, { model: Region }],
          through: {
            where: { is_host: true },
          },
        },
      ],
      where: { id: articleId },
    }).then((articleData) => {
      if (!articleData) {
        return res.status(404).send({ message: 'Not found article' });
      } else {
        const article = articleData.dataValues;
        const region = article.Region.dataValues.city;
        const category = article.Category.dataValues.food_type;
        // console.log(article.Users);
        const user = article.Users[0].dataValues;
        if (accessTokenData) {
          const userId = accessTokenData.id;
          const isMyPost = userId === user.id;
          user.isMyPost = isMyPost;
        } else {
          user.isMyPost = false;
        }

        delete article.Region;
        delete article.Category;
        delete article.Users;

        article.region = region;
        article.category = category;
        article.image = article.image_key;
        article.totalMate = article.total_mate;
        article.currentMate = article.current_mate;
        const tradeType = article.trade_type;
        if (tradeType === 'jointPurchase') {
          article.tradeType = '공구';
        } else {
          article.tradeType = '나눔';
        }
        // article.tradeType = article.trade_type;

        // delete article.image_location;
        delete article.image_key;
        delete article.region_id;
        delete article.category_id;
        delete article.total_mate;
        delete article.current_mate;
        delete article.trade_type;

        const totalTrade = user.Articles.length;
        user.totalTrade = totalTrade;
        user.profile_image = user.profile_image_key;
        user.region = user.Region.city;

        delete user.UserArticles;
        // delete user.profile_image_location;
        delete user.profile_image_key;
        delete user.password;
        delete user.region_id;
        delete user.Region;
        delete user.Articles;

        return res.status(200).send({
          data: {
            post: article,
            postWriter: user,
          },
          message: 'ok',
        });
      }
    });
  }
};
