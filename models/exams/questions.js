const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const questionsSchema = {
    queID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    courseID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    coursesubjID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    coursechapterID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    queDifficultyevel: {
        type: Sequelize.ENUM('Level1', 'Level2','Level3'),
        allowNull: false
    },
    queQuestion: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    queOption1: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    queOption2: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    queOption3: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    queOption4: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    queCorrectAns: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    queSolution: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    queStatus:{
        type: Sequelize.ENUM('Active','Inactive'),
        defaultValue: 'Active',
        allowNull: false
    }
}

const Questions = sequelize.define('questions', questionsSchema, { freezeTableName: true, timestamps: false },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            },
        },
    }
);

Questions.sync()
    .then(result => {
        console.log('Questions table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Questions = Questions;