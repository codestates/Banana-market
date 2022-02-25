const { Article, User, UserArticles } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {

  const accessTokenData = checkAccessToken(req);
  
  // 유저 확인이 안될 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }

  const { id } = accessTokenData;
  const { articleid } = req.params

  // articleid를 파라미터에 보내지 않으면
  if (!articleid) {
    return res.status(400).send({ message: 'Article id required' });
  }

  // all the articles with users through userArticles
  const article = await Article.findAll({
    where : {
      id : articleid
    },
    attributes : [],
    include : [{
      model : User,
      attributes : ['id'],
      joinTableAttributes : ['user_id']
    }]
  }).catch((err) => {
    res.status(500).send({message : 'Internal server error'})
  })

  // 존재하지 않는 채팅방
  if (!article) {
    return res.status(404).send({ message: 'Article not found' });
  }

  // 인원 모집이 마감된 채팅방
  if (article.status === false) {
    return res.status(403).send({ message: ' Article closed ' });
  }

  // article에 참여한 유저 user_id array
  const checkNewUser = article[0].Users.map((user) => {
    return user.id
  })

  for (let userid of checkNewUser) {    
    if (id === userid) {
      res.status(200).send({ message: 'Ok' });
      // return res.status(409).send({ message: ' Already participated in ' });
    }
  }

  await UserArticles.create({
    user_id : id,
    article_id : articleid,
    is_host : false 
  }).catch((err) => {
    res.status(500).send({message : 'Internal server error'})
  })

  res.status(200).send({ message: 'Ok' });
};
