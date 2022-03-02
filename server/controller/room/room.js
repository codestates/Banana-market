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
     ]
   }).catch((err) => {
    res.status(500).send({message : 'Internal server error'})
  })

  //  console.log(JSON.stringify(articleChatList, null, 2))

   // 채팅 리스트별 최신 메세지 1개
   const chatListLatestMessage = await Promise.all(
     articleChatList.rows.map((article) => {
      if(article.Chats.length !==0) {
        const chats = article.Chats[0].toJSON();
        const room = {
         image : article.dataValues.image,
         title : article.title,
         ...chats,
         articleId : article.dataValues.articleId
       }
       return room
      } else {
        const room = {
          image : article.dataValues.image,
          title : article.title,
          latestMessage : '',
          latestCreatedAt : '',
          articleId : article.dataValues.articleId
        }
        return room;
      }
    })
   ).catch((err) => {
    res.status(500).send({message : 'Internal server error'})
  })
  
   const filteredChatList = chatListLatestMessage.filter(chat => chat !== undefined)   

   const data = { roomList : filteredChatList }

   res.status(200).json({data, message : 'Ok'});
 };