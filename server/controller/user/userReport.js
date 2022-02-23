const { User, Report } = require('../../models');

module.exports = async (req, res) => {
  // res.status(200).send('');

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send({ message: 'Incorrect parameters supplied' });
  }

  const reportUser = (userId) => {
    return Report.findOne({
      where: { user_id: userId },
    }).then((reportData) => {
      if (reportData) {
        const { count } = reportData.dataValues;
        return reportData.update(
          { count: count + 1 },
          {
            where: {
              user_id: userId,
            },
          }
        );
      }
      return Report.create({
        user_id: userId,
      });
    });
  };

  reportUser(userId)
    .then(() => {
      return res.status(200).send({ message: 'ok' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Internal server error' });
    });
};
