'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profile_image: {
        type: Sequelize.BLOB
      },
      region_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Regions', key: 'id' },
      },
      block: {
        type: Sequelize.BOOLEAN
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function(){
      queryInterface.addColumn('UserArticles', 'article_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Articles',
            key: 'id'
          }
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};