'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notice extends Model {
        static associate(models) {
        }
    }

    Notice.init(
        {
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Notice',
            tableName: 'notice',
            timestamps: true,
        },
    );

    return Notice;
};
