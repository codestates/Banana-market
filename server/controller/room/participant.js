const { User, Article } = require('../../models')
const { checkAccessToken } = require('../tokenFunction')

module.exports = async (req, res) => {

  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }
  
  const articleId = req.params.articleid

  const article = await Article.findOne({
    where : {
      id : articleId
    },
    attributes : ['id', 'title'],
    include : {
      model : User,
      attributes : ['id', 'name', ['profile_image_location', 'profileImage']],
      through : {
        attributes : [['is_host', 'isHost']]
      }
    }
  }).catch((err) => {
    console.log(err)
    res.status(500).send({ message: 'Internal server error' })
  })

  // 요청한 article이 존재하지 않을 경우
  if (!article) {
    return res.status(401).send({ message: 'Article not found' });
  }

  const users = article.Users.map(user => {
    user = user.toJSON()
    const userinfo = {}
    for (let prop in user) {
      if (typeof user[prop] === 'object' && user[prop] !== null) {
        userinfo.isHost = user[prop].isHost
      } else {
        userinfo[prop] = user[prop]
      }
    }
    userinfo.articleId = articleId
    return userinfo
  })

  const data = { participant : users };

  // participant list 전달
  res.status(200).json({ data, message : 'Ok'});
};
