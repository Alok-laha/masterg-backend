const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const stateSchema = {
    stateID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    countryID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stateName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    stateRemark: {
        type: Sequelize.STRING(200),
        defaultValue: null
    },
    stateStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    stateCreatedDate:{
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
} 

const State = sequelize.define('state', stateSchema,  {freezeTableName: true, timestamps: false});

sequelize.sync()
.then(result =>{
    console.log('State table created');
}).catch(err =>{
    console.log(err);
});

module.exports.State = State;