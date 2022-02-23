'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Chats', [{
      user_id: 2,
      article_id: 1,
      contents: '사과 몇 개 살건가요?',
      createdAt: '2022-02-21 22:34:13',
      updatedAt: '2022-02-21 22:34:13',
    },{
      user_id: 2,
      article_id: 2,
      contents: '몇 리터 인가요?',
      createdAt: '2022-02-21 22:34:14',
      updatedAt: '2022-02-21 22:34:14',
    },{
      user_id: 3,
      article_id: 2,
      contents: '천리터 2병입니다',
      createdAt: '2022-02-21 22:35:13',
      updatedAt: '2022-02-21 22:35:13',
    },{
      user_id: 2,
      article_id: 2,
      contents: '1인 2병씩이요?',
      createdAt: '2022-02-21 22:36:13',
      updatedAt: '2022-02-21 22:36:13',
    },{
      user_id: 3,
      article_id: 3,
      contents: '안녕하세요!',
      createdAt: '2022-02-22 22:34:13',
      updatedAt: '2022-02-22 22:34:13',
    },{
      user_id: 3,
      article_id: 3,
      contents: '손질 대파인가요??',
      createdAt: '2022-02-22 23:34:13',
      updatedAt: '2022-02-22 23:34:13',
    },{
      user_id: 4,
      article_id: 3,
      contents: '네 안녕하세요',
      createdAt: '2022-02-22 23:44:13',
      updatedAt: '2022-02-22 23:44:13',
    },{
      user_id: 2,
      article_id: 1,
      contents: '아뇨 다진거예요',
      createdAt: '2022-02-22 23:45:13',
      updatedAt: '2022-02-22 23:45:13',
    }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Chats', null, {})
  }
}
