'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Player extends Model {
        static associate(models) {
            Player.belongsTo(models.Season, { foreignKey: 'season_id' });
        }
    }

    Player.init(
        {
            player_id: {
                type: DataTypes.STRING, // ✅ 문자열 PK
                allowNull: false,
            },
            season_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'season',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            playerName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            playerImg: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Player',
            tableName: 'player',
            timestamps: true,
            updatedAt: false,
        },
    );

    return Player;
};
