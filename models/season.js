'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Season extends Model {
        static associate(models) {
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
            img: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Season',
            tableName: 'season',
            timestamps: true,
            updatedAt: false,
        },
    );

    return Season;
};
