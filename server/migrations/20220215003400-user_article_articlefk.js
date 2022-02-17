"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_image: {
        type: Sequelize.BLOB,
      },
      region_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Regions', key: 'id' },
        // allowNull: false,
      },
      block: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "USER",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
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