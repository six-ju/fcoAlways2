'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SeasonPlayer extends Model {
        static associate(models) {
            this.belongsTo(models.Season, { foreignKey: 'season_id' });
            this.belongsTo(models.Player, { foreignKey: 'player_id' });
        }
    }

    SeasonPlayer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            season_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            player_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'SeasonPlayer',
            tableName: 'season_players',
            timestamps: true,
            updatedAt: false,
        },
    );

    return SeasonPlayer;
};
