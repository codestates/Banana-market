'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const articleNum = 6
    const userArticles = []

    for ( let i = 1; i < articleNum; i++ ) {
      const obj = {
        user_id : i+1,
        article_id : i,
        is_host : true
      }
      userArticles.push(obj)
    }

    for ( let i = 2; i < articleNum; i++ ) {
      let obj = {
        user_id : i,
        article_id : i,
        is_host : false
      }
      userArticles.push(obj)
    }

    await queryInterface.bulkInsert('UserArticles', userArticles, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserArticles', null, {});
  }
};