const e = require('express');
const { Article, User, UserArticles } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {

  const accessTokenData = checkAccessToken(req);
  
  // 유저 확인이 안될 경우
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  } else {
    const { id } = accessTokenData;
    const { articleid } = req.params
  
    // articleid를 파라미터에 보내지 않으면
    if (!articleid) {
      return res.status(400).send({ message: 'Article id required' });
    } else {

      // all the articles with users through userArticles
      const article = await Article.findAll({
        where : {
          id : articleid
        },
        attributes : ['id', 'status', 'current_mate', 'total_mate'],
        include : [{
          model : User,
          attributes : ['id']
        }],
        raw: true, 
        nest: true  
      }).catch((err) => {
        res.status(500).send({message : 'Internal server error'})
      })
    
      // 존재하지 않는 채팅방
      if (article.length === 0) {
        return res.status(404).send({ message: 'Article not found' });
      } else {

        // 참여했으면 true, 처음이면 false
        const isJoin = userId => {
          const joinMember = article.map((user) => {
            return user.Users.id
          })
          const checkUser = joinMember.filter(userid => userid === userId)
          if(checkUser.length === 0) return false
          return true
        }
      
        const joined = isJoin(id)
      
        // 처음이면? 참여 => userarticles 레코드 만들고, article current +1, 정원 다 차면 status false
        if (!joined) {

          // 처음이고, 채팅방 존재하는데 마감됐다면?
          if (!article[0].status) {
            return res.status(403).send({ message: ' Article closed ' });
          }

          await UserArticles.create({
            user_id : id,
            article_id : articleid,
            is_host : false 
          }).catch((err) => {
            res.status(500).send({message : 'Internal server error'})
          })
      
          const articleAfter = await Article.findOne({
            where: {
              id: articleid
            }
          }).catch((err) => {
            res.status(500).send({message : 'Internal server error'})
          })
          
          await articleAfter.update({
            current_mate: articleAfter.current_mate + 1
          }).catch((err) => {
            res.status(500).send({message : 'Internal server error'})
          }).catch((err) => {
            res.status(500).send({message : 'Internal server error'})
          })
          
          if (articleAfter.current_mate === articleAfter.total_mate) {
            await articleAfter.update({
              status: false
            }).catch((err) => {
              res.status(500).send({message : 'Internal server error'})
            })
          }
          return res.status(200).send({ message: 'Ok, newcomer' });
        }
      
        // 참여중이었으면?
        return res.status(200).send({ message: 'Ok, old-timer' });
      }
    }
  }
};
