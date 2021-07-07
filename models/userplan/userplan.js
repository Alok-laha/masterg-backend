const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../database/database');

const userplanSchema= {
userID:{
    type: DataTypes.SMALLINT(3),
    allowNull: false
},
planID:{
    type: DataTypes.SMALLINT(3),
    allowNull: false
},
offerID:{
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ""
},
planNetAmount:{
    type: DataTypes.INTEGER,
    allowNull: false
},
planCouponDiscount:{
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ""
},
planGSTCharges:{
    type: DataTypes.INTEGER,
    allowNull: false
},
planTotalPrice:{
    type: DataTypes.INTEGER,
    allowNull: false
},
couponApply:{
    type: DataTypes.ENUM("Yes","No"),
    allowNull: false,
    defaultValue: "No"
},
subsciptionID:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
},
userPlanStatus:{
    type: DataTypes.ENUM('Active', 'inactive'),
    allowNull: false,
   defaultValue: 'Active'
},
userPlanCreatedDate:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
}
}


const userplan = sequelize.define('userplan', userplanSchema, { freezeTableName: true, timestamps: false },
  {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
  }
);

userplan.sync({alter: true})
  .then(result => {
    console.log('userplan table (re)created');
  }).catch(err => {
    console.log(err);
  });

module.exports.userplan = userplan;




// "INSERT INTO `userplan`( `userID`, `planID`, `offerID`, `planNetAmount`, `planCouponDiscount`, 
// `planGSTCharges`, `planTotalPrice`, `couponApply`,`subscriptionID`) VALUES (" + req.body.loginuserID +
//  "," + req.body.planID + "," + req.body.offerID + "," + 
//  req.body.planNetAmount + "," + req.body.planCouponDiscount + "," + req.body.GST + "," + 
//  req.body.planTotalPrice + ",'Yes'," + subscriptionID + ")";