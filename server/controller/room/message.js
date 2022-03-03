const { User, Article, Chat, UserArticles } = require('../../models');
const { Op } = require('sequelize');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }

  // 1. 아이디 받아서 UserArticles에서 레코드 생긴 시간 확인
  // 2. Chat에 조건으로 1번 시간보다 큰 것만

  const { articleid } = req.params;
  const { id: userId } = accessTokenData;

  // articleid 없이 요청 보냈을 때
  if (!articleid) {
    return res.status(400).send({ message: 'Article id required' });
  }

  // 유저가 참여한 시간 확인
  let userJoinAt = await UserArticles.findOne({
    where: {
      user_id: userId,
      article_id: articleid,
    },
    attributes: ['createdAt'],
  }).catch((err) => {
    res.status(500).send({ message: 'Internal server error' });
  });

  // article 별 message list
  const articleMessages = await Article.findAll({
    where: {
      id: articleid,
    },
    order: [[Chat, 'createdAt', 'DESC']],
    attributes: ['title'],
    include: [
      {
        model: Chat,
        attributes: ['contents', 'createdAt'],
        where: {
          createdAt: {
            [Op.gte]: userJoinAt,
          },
        },
        include: [
          {
            model: User,
            attributes: [
              'id',
              'name',
              ['profile_image_location', 'profileImage'],
            ],
          },
        ],
      },
    ],
  }).catch((err) => {
    res.status(500).send({ message: 'Internal server error' });
  });

  // client에 보낼 데이터 articleMessages flat 버전
  let userChat = {};
  await articleMessages.map((article) => {
    article = article.toJSON();
    const chats = article.Chats.map((chat) => {
      const chatList = {};
      const userInfo = {};
      for (let prop in chat) {
        if (prop === 'User') {
          for (let p in chat[prop]) {
            userInfo[p] = chat[prop][p];
          }
        } else if (prop !== User) {
          chatList[prop] = chat[prop];
        }
      }
      return { ...userInfo, ...chatList };
    });

    userChat = {
      title: article.title,
      messageList: chats,
    };
    return userChat;
  });

  // console.log("   --- - - - -- - -  flat 변경", userChat)

  const data = { ...userChat };

  return res.status(200).json({ data, message: 'Ok' });
};
