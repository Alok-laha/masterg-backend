const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const categorylevel1Schema = {
    categorylevel1ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    entityID: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    categorylevel1Name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    categorylevel1Remark:{
        type: Sequelize.STRING(200),
        defaultValue: null
    },
    categorylevel1Status:{
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    }
}

const Categorylevel1 = sequelize.define('categorylevel1', categorylevel1Schema, {freezeTableName: true, timestamps: false});

sequelize.sync()
.then(result =>{
    console.log('Categorylevel1 table created');
}).catch(err =>{
    console.log(err);
});

module.exports.Categorylevel1 = Categorylevel1;