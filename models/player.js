'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Player extends Model {
        static associate(models) {
            this.hasMany(models.SeasonPlayer, { foreignKey: 'player_id' });
        }
    }

    Player.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            playerName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Player',
            tableName: 'players',
            timestamps: true,
            updatedAt: false,
        },
    );

    return Player;
};
