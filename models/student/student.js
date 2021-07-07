const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const Users = sequelize.define(
  'users',
  {
    userID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userFullName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    userMobile: {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true,
    },
    userEmail: {
      type: Sequelize.STRING(100),
      allowNull: true,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    userPassword: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "password"
    },
    userEntityId: {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    userCenterId: {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    userBatchId: {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    categorylevel1ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    categorylevel2ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    categorylevel3ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    categorylevel4ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userProfilePicture: {
      type: Sequelize.STRING(100),
      defaultValue: 'profile_bg.png',
    },
    userAddress: {
      type: Sequelize.STRING(300),
      defaultValue: null,
    },
    languageID: {
      type: Sequelize.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    userDeviceType: {
      type: Sequelize.STRING(10),
      allowNull: false,
      defaultValue: "web"
    },
    userDeviceID: {
      type: Sequelize.STRING(500),
      allowNull: false,
      defaultValue: "asef"
    },
    userVerified: {
      type: Sequelize.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    userNewsNotification: {
      type: Sequelize.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'Yes',
    },
    userCourseNotification: {
      type: Sequelize.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'Yes',
    },
    userOfferNotification: {
      type: Sequelize.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'Yes',
    },
    userExamNotification: {
      type: Sequelize.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'Yes',
    },
    userStatus: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active',
    },
    userOTP: {
      type: Sequelize.STRING(6),
      defaultValue: null,
    },
    userJoiningDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: new Date(),
    },
    countryID: {
      type: Sequelize.SMALLINT,
      allowNull: false,
    },
    stateID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cityID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userPincode:{
      type: Sequelize.STRING(10),
      allowNull: false,
      defaultValue: 0
    },
    userGurdianName:{
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    userGurdianMobile:{
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    userGuardianEmail:{
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    userCreatedDate: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    userSignupOTPVerified: {
      type: Sequelize.ENUM('Yes', 'No'),
      allowNull: false,
      defaultValue: 'No',
    },
    userSignupReferKey:{
      type: Sequelize.STRING(10),
      defaultValue: null
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createAt: false,
    paranoid: true,
  },
  {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
  }
);

Users
  .sync()
  .then((result) => {
    console.log('user table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Users;
