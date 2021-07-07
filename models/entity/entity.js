const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const entitySchema = {
    entityID: {
        type: Sequelize.SMALLINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    entityName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    entityRemark: {
        type: Sequelize.STRING(200),
        defaultValue: null
    },
    entityStatus:{
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    }
}

const Entity = sequelize.define('entity', entitySchema, {freezeTableName: true, timestamps: false});

sequelize.sync()
.then(result =>{
    console.log('Entity table created');
}).catch(err =>{
    console.log(err);
});

module.exports.Entity = Entity;