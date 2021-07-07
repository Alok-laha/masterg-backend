const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const refreshTokenSchema = {
    userEmail:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    refreshToken:{
        type: Sequelize.STRING,
        allowNull: false
    }
};

const RefreshToken = sequelize.define('refreshToken', refreshTokenSchema, {freezeTableName: true, timestamps: false});

sequelize.sync()
.then(result =>{
    console.log('refreshToken table created');
}).catch(err =>{
    console.log(err);
});

module.exports.RefreshToken = RefreshToken;