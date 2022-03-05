const { User, Region, Article, Category } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  let accessTokenData = '';
  let userId = '';
  if (req.cookies) {
    console.log('쿸키');
    accessTokenData = checkAccessToken(req);
    userId = accessTokenData.id;
  }

  console.log('userId', userId);

  const articleId = req.params.articleid;
  if (!articleId) {
    return res.status(422).send({ message: 'Incorrect parameters supplied' });
  }

  Article.findOne({
    where: { id: articleId },
    attributes: [
      'id',
      'title',
      ['image_key', 'image'],
      'content',
      'market',
      'date',
      'time',
      ['total_mate', 'totalMate'],
      ['current_mate', 'currentMate'],
      'status',
      'address',
      'url',
      ['trade_type', 'tradeType'],
      'createdAt',
      'updatedAt',
    ],

    include: [
      {
        model: Region,
        attributes: [['city', 'region']],
      },
      {
        model: Category,
        attributes: [['food_type', 'category']],
      },
      {
        model: User,
        include: [
          {
            model: Region,
            attributes: [['city', 'region']],
          },
          {
            model: Article,
            attributes: [['id', 'participantArticleId']],
          },
        ],
        attributes: [
          ['id', 'userId'],
          'name',
          'email',
          'block',
          'type',
          'createdAt',
          'updatedAt',
          ['profile_image_key', 'profile_image'],
        ],
        through: {
          where: { is_host: true },
          attributes: [
            ['user_id', 'writerId'],
            ['is_host', 'isHost'],
          ],
        },
      },
    ],
  })
    .then((data) => {
      const postData = data.dataValues;
      const articleRegion = postData.Region;
      postData['region'] = articleRegion.dataValues.region;
      delete postData.Region;

      const category = postData.Category;
      postData['category'] = category.dataValues.category;
      delete postData.Category;

      if (postData.tradeType === 'share') {
        postData.tradeType = '나눔';
      } else {
        postData.tradeType = '공구';
      }

      const user = postData.Users;
      let sendObj = {};
      if (!user.length) {
        return res
          .status(404)
          .send({ message: '작성자가 없거나, 존재하지 않는 게시물 입니다' });
      } else {
        const userData = user[0].dataValues;
        userData.region = userData.Region.dataValues.region;
        delete userData.Region;
        userData.totalTrade = userData.Articles.length;
        delete userData.Articles;
        let writer = userData.UserArticles.dataValues.writerId;
        let isMyPost = false;
        if (writer === userId) {
          isMyPost = true;
        }
        userData.isMyPost = isMyPost;
        delete userData.UserArticles;

        sendObj['postWriter'] = userData;
        delete postData.Users;
        sendObj['post'] = postData;
        res.status(200).send({ data: sendObj, message: 'ok' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};
