const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const categorylevel2Schema = {
    categorylevel2ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categorylevel1ID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    entityID: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    categorylevel2Name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    categorylevel2Remark:{
        type: Sequelize.STRING(200),
        defaultValue: null
    },
    categorylevel2Status:{
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    }
}

const Categorylevel2 = sequelize.define('categorylevel2', categorylevel2Schema, {freezeTableName: true, timestamps: false});

sequelize.sync()
.then(result =>{
    console.log('Categorylevel2 table created');
}).catch(err =>{
    console.log(err);
});

module.exports.Categorylevel2 = Categorylevel2;