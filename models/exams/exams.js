const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const examsSchema = {
    examID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    examType: {
        type: Sequelize.ENUM('MCQ', 'MMCQ', 'Both'),
        allowNull: false
    },
    entityID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categorylevel1ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categorylevel2ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categorylevel3ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categorylevel4ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    coursesubjID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    courseID: {
        type: Sequelize.SMALLINT(3),
        allowNull: false
    },
    coursechapterIDs: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    examIcon: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    examColor: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    examName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    examContains: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    examSections: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    examDuration: {
        type: Sequelize.TIME,
        allowNull: false
    },
    examStartDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    examStartTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    examEndDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    examEndTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    examQsL1: {
        type: Sequelize.SMALLINT(3),
        allowNull: false
    },
    examQsL2: {
        type: Sequelize.SMALLINT(3),
        allowNull: false
    },
    examQsL3: {
        type: Sequelize.SMALLINT(3),
        allowNull: false
    },
    examTotalQs: {
        type: Sequelize.SMALLINT(3),
        allowNull: false
    },
    examQualifyingMarks: {
        type: Sequelize.SMALLINT(3),
        allowNull: false
    },
    examMaxAttempt: {
        type: Sequelize.SMALLINT(2),
        allowNull: false
    },
    examMaxDaysReschedule: {
        type: Sequelize.SMALLINT(2),
        allowNull: false
    },
    examCorrectAnswer: {
        type: Sequelize.FLOAT(5, 2),
        allowNull: false
    },
    examWrongAnswer: {
        type: Sequelize.FLOAT(5, 2),
        allowNull: false
    },
    examInstruction: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    examStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
    },
}

const Exams = sequelize.define('exams', examsSchema, { freezeTableName: true, timestamps: false },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            },
        },
    }
);

Exams.sync()
    .then(result => {
        console.log('Exams table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Exams = Exams;