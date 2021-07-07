const sequelize = require("../../database/database");
const {Sequelize, DataTypes} = require('sequelize');


const notificationSchema={
    userID:{
        type: DataTypes.SMALLINT(3),
        allowNull: false
    },
    notificationNewVideos:{
        type: DataTypes.ENUM('Active','InActive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    notificationTests:{
        type: DataTypes.ENUM('Active','InActive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    notificationResults:{
        type: DataTypes.ENUM('Active','InActive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    notificationNews:{
        type: DataTypes.ENUM('Active','InActive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    notificationEvents:{
        type: DataTypes.ENUM('Active','InActive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    notificationNotices:{
        type: DataTypes.ENUM('Active','InActive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    notificationAssignment:{
        type: DataTypes.ENUM('Active','InActive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    notificationFormus:{
        type: DataTypes.ENUM('Active','InActive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    notificationAdminAnnouncement:{
        type: DataTypes.ENUM('Active','InActive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    notificationSettingCreatedDate:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}




const notificationSetting = sequelize.define('notificationSetting', notificationSchema, { freezeTableName: true, timestamps: false },
  {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
  }
);

notificationSetting.sync()
  .then(result => {
    console.log('notificationSettingtable created');
  }).catch(err => {
    console.log(err);
  });

module.exports.notificationSetting = notificationSetting;

// INSERT INTO `notificationSetting` (`userID`, `notificationNewVideos`,
//  `notificationTests`, `notificationResults`, `notificationNews`, `notificationEvents`,
//   `notificationNotices`, `notificationAssignment`, `notificationFormus`, `notificationAdminAnnouncement`,
//    `notificationSettingCreatedDate`) VALUES ( '"+ req.user +"', 'Active', 'Active', 'Active', 'Active', 
//    'Active', 'Active','Active', 'Active', 'Active', current_timestamp())