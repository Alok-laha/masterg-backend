const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const ForumsSchema = {
  forumID: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  forumName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  forumSubject: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  AssiDescription: {
    type: Sequelize.TEXT("long"),
    allowNull: false
  },
  forumFiles: {
    type: Sequelize.STRING(4000),
    allowNull: false
  },
  forumPic: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  forumStatus: {
    type: Sequelize.ENUM('Active', 'Inactive'),
    allowNull: false,
    defaultValue: 'Active'
  },
  forumCreatedDate: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  entityID: {
    type: Sequelize.SMALLINT(2),
    allowNull: false
  },
  categorylevel1ID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  categorylevel2ID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  categorylevel3ID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  categorylevel4ID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  coursesubjID: {
    type: Sequelize.SMALLINT(3),
    allowNull: false
  },
  facultyID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}

const Forums = sequelize.define('forum', ForumsSchema, { freezeTableName: true, timestamps: false },
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
    console.log('Forum table created');
  }).catch(err => {
    console.log(err);
  });

module.exports.Forums = Forums;





