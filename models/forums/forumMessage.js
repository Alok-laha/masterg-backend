const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const forumMessagesSchema = {
  forummessID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  forumID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  userID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  forummessMessage: {
    type: Sequelize.STRING(4000),
    allowNull: false
  },
  forummessAttachment: {
    type: Sequelize.STRING(4000),
    allowNull: true
  },
  forummessCreatedDateTime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
}

const forumMessages = sequelize.define('forummessages', forumMessagesSchema, { freezeTableName: true, timestamps: false },
  {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
  }
);

sequelize.sync()
  .then(result => {
    console.log('Forummessages table created');
  }).catch(err => {
    console.log(err);
  });

module.exports.forumMessages = forumMessages;





