'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('playerstats', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      player_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      overall: Sequelize.INTEGER,
      cost: Sequelize.INTEGER,
      sprintspeed: Sequelize.INTEGER,
      acceleration: Sequelize.INTEGER,
      finishing: Sequelize.INTEGER,
      shotpower: Sequelize.INTEGER,
      longshots: Sequelize.INTEGER,
      positioning: Sequelize.INTEGER,
      volleys: Sequelize.INTEGER,
      penalties: Sequelize.INTEGER,
      shortpassing: Sequelize.INTEGER,
      vision: Sequelize.INTEGER,
      crossing: Sequelize.INTEGER,
      longpassing: Sequelize.INTEGER,
      freekickaccuracy: Sequelize.INTEGER,
      curve: Sequelize.INTEGER,
      dribbling: Sequelize.INTEGER,
      ballcontrol: Sequelize.INTEGER,
      agility: Sequelize.INTEGER,
      balance: Sequelize.INTEGER,
      reactions: Sequelize.INTEGER,
      marking: Sequelize.INTEGER,
      standingtackle: Sequelize.INTEGER,
      interceptions: Sequelize.INTEGER,
      headingaccuracy: Sequelize.INTEGER,
      slidingtackle: Sequelize.INTEGER,
      strength: Sequelize.INTEGER,
      stamina: Sequelize.INTEGER,
      aggression: Sequelize.INTEGER,
      jumping: Sequelize.INTEGER,
      composure: Sequelize.INTEGER,
      gkdiving: Sequelize.INTEGER,
      gkhandling: Sequelize.INTEGER,
      gkkicking: Sequelize.INTEGER,
      gkreflexes: Sequelize.INTEGER,
      gkpositioning: Sequelize.INTEGER,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('playerstats');
  },
};
