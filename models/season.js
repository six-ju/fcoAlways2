'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Season extends Model {
        static associate(models) {
            this.hasMany(models.SeasonPlayer, { foreignKey: 'season_id' });
        }
    }

    Season.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            seasonName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Season',
            tableName: 'seasons',
            timestamps: true,
            updatedAt: false,
        },
    );

    return Season;
};
