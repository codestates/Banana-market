'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Articles', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'articles_category_id_fk',
      references: {
        table: 'Categories',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }),
      await queryInterface.addConstraint('Articles', {
        fields: ['region_id'],
        type: 'foreign key',
        name: 'articles_region_id_fk',
        references: {
          table: 'Regions',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('Articles', 'articles_category_id_fk');
    // await queryInterface.removeConstraint('Articles', 'articles_region_id_fk');
  },
};
