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
            player_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unique: true,
            },
            overall: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            cost: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            sprintspeed: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            acceleration: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            finishing: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            shotpower: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            longshots: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            positioning: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            volleys: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            penalties: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            shortpassing: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            vision: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            crossing: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            longpassing: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            freekickaccuracy: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            curve: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            dribbling: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            ballcontrol: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            agility: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            balance: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            reactions: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            marking: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            standingtackle: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            interceptions: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            headingaccuracy: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            slidingtackle: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            strength: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            stamina: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            aggression: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            jumping: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            composure: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            gkdiving: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            gkhandling: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            gkkicking: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            gkreflexes: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            gkpositioning: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Playerstat',
            tableName: 'playerstats',
            timestamps: true,
            updatedAt: false
        },
    );

    return User;
};
