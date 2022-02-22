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
    where : {
      user_id : id
    },
    attributes : [['article_id', 'articleId']]
  })

  const articles = await joinList.map(ua => ua.dataValues.articleId)

  const articleChatList = await Article.findAndCountAll({
    attributes : [['image_location', 'image'], 'title', ['id', 'articleId']],
    where : {
      id : {
        [Op.or]: articles
      }
    },
    include : [{
      model : Chat,
      attributes : [['contents', 'latestMessage'], ['createdAt', 'latestCreatedAt']],
    }],
    order : [
      [Chat, 'createdAt', 'DESC']
    ]
  })

  const latestarticleChatList = await Promise.all(
    articleChatList.rows.map((article) => {
      const chats = article.Chats[0].toJSON();
      const room = {
        image : article.dataValues.image,
        title : article.title,
        ...chats,
        articleId : article.dataValues.articleId
      }
      return room
    })
  )

  const data = { roomList : latestarticleChatList }

  res.status(200).json({data});
};
