'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const regionId = 6;
    const character = ['다오', '배찌', '디지니', '로두마니', '모스', '네오'];

    let users = [
      {
        name: 'admin',
        email: 'admin@bananamarket.tk',
        password: 'admin',
        profile_image_key: '1645110272558.png',
        profile_image_location:
          'https://banana-profile-img.s3.ap-northeast-2.amazonaws.com/1645110272558.png',
        region_id: '1',
        block: false,
        type: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    for (let i = 0; i < regionId; i++) {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(character[i], saltRounds);
      let obj = {
        name: character[i],
        email: character[i],
        password: hash,
        profile_image_key: '1645110272558.png',
        profile_image_location:
          'https://banana-profile-img.s3.ap-northeast-2.amazonaws.com/1645110272558.png',
        region_id: i + 1,
        block: false,
        type: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(obj);
    }

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
