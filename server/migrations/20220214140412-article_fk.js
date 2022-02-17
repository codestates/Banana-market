'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB
      },
      content: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Categories', key: 'id' },
      },
      market: {
        type: Sequelize.STRING
      },
      region_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Regions', key: 'id' },
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.STRING
      },
      total_mate: {
        type: Sequelize.INTEGER
      },
      current_mate: {
        type: Sequelize.INTEGER
      },
      trade_type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Articles');
  }
};