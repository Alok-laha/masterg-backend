const Sequelize = require('sequelize');
// const uuid = require('uuid/dist/v4');

const sequelize = require('../database/database');

const ApiLog = sequelize.define(
  'apilog',
  {
    apiID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    apiName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apiIP: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    apiRequest: {
      type: Sequelize.TEXT,
      defaultValue: null,
    },
    apiResponse: {
      type: Sequelize.TEXT,
    },
    apiType: {
      type: Sequelize.ENUM('iphone', 'android', 'web'),
      allowNull: false,
    },
    apiVersion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apiCallDate: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = ApiLog;
