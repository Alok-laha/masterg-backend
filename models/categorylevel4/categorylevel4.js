const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const categorylevel4Schema = {
    categorylevel4ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categorylevel3ID: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    categorylevel4Name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    categorylevel4Remark:{
        type: Sequelize.STRING(200),
        defaultValue: null
    },
    categorylevel4Status:{
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    }
}

const Categorylevel4 = sequelize.define('categorylevel4', categorylevel4Schema, {freezeTableName: true, timestamps: false});

sequelize.sync()
.then(result =>{
    console.log('Categorylevel4 table created');
}).catch(err =>{
    console.log(err);
});

module.exports.Categorylevel4 = Categorylevel4;