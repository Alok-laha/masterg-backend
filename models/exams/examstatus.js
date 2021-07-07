const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const examstatusSchema = {
    checkqueID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    queID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    queAnswered: {
        type: Sequelize.ENUM('Yes', 'No'),
        allowNull: false,
        defaultValue: 'No'
    },
    queAnsweredCorrect: {
        type: Sequelize.ENUM('Yes', 'No'),
        allowNull: false,
        defaultValue: 'No'
    },
}

const Examstatus = sequelize.define('checkquestions', examstatusSchema, { freezeTableName: true, timestamps: false },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            },
        },
    }
);

Examstatus.sync()
    .then(result => {
        console.log('Examstatus table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Examstatus = Examstatus;