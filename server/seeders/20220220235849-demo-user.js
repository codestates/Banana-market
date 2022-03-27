'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const regionId = 6;
    const character = ['다오', '배찌', '디지니', '로두마니', '모스', '네오'];
    const regionIdNum = 25;

    const saltRounds = 10;
    const hashAdmin = bcrypt.hashSync('admin', saltRounds);

    let users = [
      {
        name: 'admin',
        email: 'admin@bananamarket.tk',
        password: hashAdmin,
        profile_image_key: null,
        region_id: '1',
        block: false,
        type: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    for (let i = 0; i < regionId; i++) {
      const hash = bcrypt.hashSync(character[i], saltRounds);
      let obj = {
        name: character[i],
        email: character[i],
        password: hash,
        profile_image_key: null,
        region_id: i + 1,
        block: false,
        type: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(obj);
    }

    const hashTutu = bcrypt.hashSync('xnxn', saltRounds);
    const engUser = {
      name: '투투',
      email: '투투',
      password: hashTutu,
      profile_image_key: null,
      region_id: '1',
      block: false,
      type: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(engUser);

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
