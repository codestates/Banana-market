const { Article, Chat, UserArticles } = require('../../models');
const { Op } = require('sequelize');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {
  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }

  const { id } = accessTokenData;

  // 유저가 참여중인 article 목록
  const joinList = await UserArticles.findAll({
    where: {
      user_id: id,
    },
    attributes: [['article_id', 'articleId']],
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  });

  const articles = await joinList.map((ua) => ua.dataValues.articleId);

  // 내가 참여하고 있는 모든 채팅방과 모든 메세지
  const articleChatList = await Article.findAndCountAll({
    attributes: [['image_location', 'image'], 'title', ['id', 'articleId']],
    where: {
      id: {
        [Op.or]: articles,
      },
    },
    include : [{
      model : Chat,
      attributes : [['contents', 'latestMessage'], ['createdAt', 'latestCreatedAt']],
    }],
    order : [
      [Chat, 'createdAt', 'DESC']
    ],
    raw: true,
    nest: true,
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  });

  // 채팅 리스트별 최신 메세지 1개
  const chatListLatestMessage = await Promise.all(
    articleChatList.rows.map((article) => {
      const chats = article.Chats
      const room = {
        image : article.image,
        title : article.title,
        ...chats,
        articleId : article.articleId
      }
      return room
    })
  );

  const data = { roomList: chatListLatestMessage };

  res.status(200).json({ data, message: 'Ok' });
};
