const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../database/database');

const subscriptionplanSchema= {
    planID:{
        type: DataTypes.SMALLINT(3),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    courseID:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    coursesubjID:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    entityID:{
        type: DataTypes.SMALLINT(3),
        allowNull:false
    },
    categorylevel1ID:{
        type: DataTypes.INTEGER(11),
        allowNull:false
    },
    categorylevel2ID:{
        type: DataTypes.INTEGER(11),
        allowNull:false
    },
    categorylevel3ID:{
        type: DataTypes.INTEGER(11),
        allowNull:false
    },
    categorylevel4ID:{
        type: DataTypes.INTEGER(11),
        allowNull:false
    },
    planName:{
        type: DataTypes.STRING(100),
        allowNull:false
    },
    planDescription:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    planPrice:{
        type: DataTypes.FLOAT(7,2),
        allowNull:false
    },
    subscriptionColor:{
        type: DataTypes.STRING(20),
        allowNull:false
    },
    planDiscountPrice:{
        type: DataTypes.FLOAT(7,2),
        allowNull:false
    },
    planDuration:{
        type: DataTypes.SMALLINT(2),
        allowNull:false
    },
    planStatus:{
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
       defaultValue: 'Active'
    },
    planCreatedDate:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}


const subscriptionplan = sequelize.define('subscriptionplan', subscriptionplanSchema, { freezeTableName: true, timestamps: false },
  {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
  }
);

subscriptionplan.sync()
  .then(result => {
    console.log('subscriptionplan table created');
  }).catch(err => {
    console.log(err);
  });

module.exports.subscriptionplan = subscriptionplan;