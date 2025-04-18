'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seasonplayer', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      season_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'season',
          key: 'id'
        }
      },
      player_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'player',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('seasonplayer');
  }
};