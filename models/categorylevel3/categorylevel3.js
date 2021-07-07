const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const categorylevel3Schema = {
    categorylevel3ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categorylevel2ID : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categorylevel1ID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    entityID: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    categorylevel3Name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    categorylevel3Remark:{
        type: Sequelize.STRING(200),
        defaultValue: null
    },
    categorylevel3Status:{
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    }
}

const Categorylevel3 = sequelize.define('categorylevel3', categorylevel3Schema, {freezeTableName: true, timestamps: false});

sequelize.sync()
.then(result =>{
    console.log('Categorylevel3 table created');
}).catch(err =>{
    console.log(err);
});

module.exports.Categorylevel3 = Categorylevel3;