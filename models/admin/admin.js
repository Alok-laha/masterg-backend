const Sequelize = require('sequelize');

const sequelize = require('../../database/database');

const Admin = sequelize.define(
  'admin',
  {
    Admin_ID: {
      type: Sequelize.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    instituteID: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    Admin_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Admin_Email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    Admin_Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Admin_Mobile: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Admin_Type: {
      type: Sequelize.ENUM('Admin', 'Subadmin'),
      allowNull: false,
    },
    Admin_Address: {
      type: Sequelize.STRING,
    },
    Admin_Status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Active',
    },
    Admin_Last_Login: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    Created_Date: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  { freezeTableName: true, timestamps: false }
);


Admin.sync()
    .then(result => {
        console.log('Assignment table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Admin = Admin;

