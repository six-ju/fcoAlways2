'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here if needed
        }
    }

    User.init(
        {
            nickname: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            ouid: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
            updatedAt: false
        },
    );

    return User;
};
