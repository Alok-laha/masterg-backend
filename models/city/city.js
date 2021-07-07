const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const citySchema = {
    cityID: {
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
    stateID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    cityName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cityRemarks: {
        type: Sequelize.STRING(200),
        defaultValue: null
    },
    cityStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    cityCreatedDate: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}

const City = sequelize.define('city', citySchema, {freezeTableName: true, timestamps: false});

sequelize.sync()
.then(result =>{
    console.log('City table created');
}).catch(err =>{
    console.log(err);
});

module.exports.City = City;