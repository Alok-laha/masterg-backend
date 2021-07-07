const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const   examresultsSchema = {
    ID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    examID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    uniqueNumber:{
        type: Sequelize.STRING,
        allowNull: false
    },
    TotalQuestions: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    AttendedQuestions: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CorrectAnswer: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    WrongAnswer: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    RewardPoints: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userPercentage: {
        type: Sequelize.FLOAT(5,2),
        allowNull: false,
        defaultValue: 0.00
    },
    examColor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userexamStatus:{
        type: Sequelize.ENUM('Pass','Fail'),
        allowNull: false,
        defaultValue: 'Fail'
    },
    examCreatedDate: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}

const examresults = sequelize.define('examresults', examresultsSchema, { freezeTableName: true, timestamps: false },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            },
        },
    }
);

examresults.sync({alter:true})
    .then(result => {
        console.log('Examresults table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Examresults = examresults;