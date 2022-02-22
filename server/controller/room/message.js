const { User, Article, Chat, UserArticles } = require('../../models');
const { Op } = require("sequelize");
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {

  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: "Not authorized" });
  }

  const { articleid } = req.params

  // 
  if (!articleid) {
    return res.status(400).send({ message: 'Article id required' });
  }

  const articleMessages = await Article.findAll({
    where : {
      id : articleid
    },
    order : [
      [Chat, 'createdAt', 'DESC']
    ], 
    attributes : ['title'],
    include : [
      {
      model : Chat,
      attributes : ['contents', 'createdAt'],
      include : [
        {
        model : User,
        attributes : ['name', ['profile_image_location', 'profileImage']]
      }
    ]
    }
  ]
  })
  
  let userChat = {}
  await articleMessages.map((article) => {
    article = article.toJSON()
    const chats = article.Chats.map((chat) => {
      const chatList = {};
      const userInfo = {};
      for (let prop in chat) {
          if (prop === 'User') {
            for (let p in chat[prop]) {
              userInfo[p] = chat[prop][p]
            }
          }
          else if (prop !== User){
            chatList[prop] = chat[prop]
          }
        }
      return { ...userInfo, ...chatList }
    })

    userChat = {
      title : article.title,
      messageList : chats
    }
    return userChat
  })

  const data = { ...userChat }

  return res.status(200).json({ data });
};
