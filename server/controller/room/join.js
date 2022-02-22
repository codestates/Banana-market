const { Article } = require('../../models');
const { checkAccessToken } = require('../tokenFunction');

module.exports = async (req, res) => {

  const accessTokenData = checkAccessToken(req);
  if (!accessTokenData) {
    return res.status(401).send({ message: 'Not authorized' });
  }

  const { articleid } = req.params

  if (!articleid) {
    return res.status(400).send({ message: 'Article id required' });
  }

  const article = await Article.findByPk(articleid)

  if (!article) {
    return res.status(404).send({ message: 'Article not found' });
  }

  if (article.status === false) {
    return res.status(403).send({ message: ' Article closed ' });
  }

  res.status(200).send({ message: 'Ok' });
};
