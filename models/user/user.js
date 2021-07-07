// const Sequelize = require('sequelize');
// const sequelize = require('../../database/database');

// const userSchema = {
//   userID: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   userFullName: {
//     type: Sequelize.STRING(100),
//     allowNull: false,
//   },
//   userCountryCode: {
//     type: Sequelize.STRING(5),
//     allowNull: false,
//   },
//   userMobile: {
//     type: Sequelize.STRING(10),
//     allowNull: false,
//     unique: true,
//   },
//   userEmail: {
//     type: Sequelize.STRING(100),
//     allowNull: false,
//     unique: true,
//   },
//   userPassword: {
//     type: Sequelize.STRING(100),
//     allowNull: false,
//   },
//   userBirthDate: {
//     type: Sequelize.DATEONLY,
//     allowNull: false,
//   },
//   userGender: {
//     type: Sequelize.ENUM('Male', 'Female'),
//     allowNull: false,
//   },
//   userProfilePicture: {
//     type: Sequelize.STRING(100),
//     defaultValue: 'profile_bg.png',
//   },
//   userAddress: {
//     type: Sequelize.STRING(300),
//     defaultValue: null,
//   },
//   languageID: {
//     type: Sequelize.SMALLINT,
//     allowNull: false,
//   },
//   userDeviceType: {
//     type: Sequelize.STRING(10),
//     allowNull: false,
//   },
//   userDeviceID: {
//     type: Sequelize.STRING(500),
//     allowNull: false,
//   },
//   userReferKey: {
//     type: Sequelize.STRING(10),
//     defaultValue: null,
//   },
//   userVerified: {
//     type: Sequelize.ENUM('Yes', 'No'),
//     allowNull: false,
//     defaultValue: 'No',
//   },
//   userNewsNotification: {
//     type: Sequelize.ENUM('Yes', 'No'),
//     allowNull: false,
//     defaultValue: 'Yes',
//   },
//   userCourseNotification: {
//     type: Sequelize.ENUM('Yes', 'No'),
//     allowNull: false,
//     defaultValue: 'Yes',
//   },
//   userOfferNotification: {
//     type: Sequelize.ENUM('Yes', 'No'),
//     allowNull: false,
//     defaultValue: 'Yes',
//   },
//   userExamNotification: {
//     type: Sequelize.ENUM('Yes', 'No'),
//     allowNull: false,
//     defaultValue: 'Yes',
//   },
//   userStatus: {
//     type: Sequelize.ENUM('Active', 'Inactive'),
//     allowNull: false,
//     defaultValue: 'Active',
//   },
//   userOTP: {
//     type: Sequelize.STRING(6),
//     defaultValue: null,
//   },
//   userJoiningDate: {
//     type: Sequelize.DATEONLY,
//     allowNull: false,
//   },
//   countryID: {
//     type: Sequelize.SMALLINT,
//     allowNull: false,
//   },
//   stateID: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   cityID: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   userPincode: {
//     type: Sequelize.STRING(10),
//     allowNull: false,
//   },
//   userGurdianName: {
//     type: Sequelize.STRING(100),
//     allowNull: false,
//   },
//   userGurdianMobile: {
//     type: Sequelize.STRING(20),
//     allowNull: false,
//   },
//   userGuardianEmail: {
//     type: Sequelize.STRING(100),
//     allowNull: false,
//   },
//   userCreatedDate: {
//     type: 'TIMESTAMP',
//     allowNull: false,
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//   },
//   userSignupOTPVerified: {
//     type: Sequelize.ENUM('Yes', 'No'),
//     allowNull: false,
//     defaultValue: 'No',
//   },
// };

// const User = sequelize.define('users', userSchema, { freezeTableName: true, timestamps: false });

// // sequelize
// //   .sync()
// //   .then((result) => {
// //     console.log('User table created');
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// module.exports.User = User;
