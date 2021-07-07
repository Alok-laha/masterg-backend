const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const coursesSchema = {
    courseID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    entityID: {
        type: Sequelize.SMALLINT(2),
        allowNull: true
    },
    categorylevel1ID: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        defaultValue: 0
    },
    categorylevel2ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    categorylevel3ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    categorylevel4ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    courseType: {
        type: Sequelize.ENUM('Free', 'Paid'),
        allowNull: false
    },
    CourseName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    courseFree: {
        type: Sequelize.ENUM('Free', 'Paid'),
        allowNull: false
    },
    courseFee: {
        type: Sequelize.DECIMAL(7,2),
        allowNull: false,
        defaultValue: '700'
    },
    courseIcon: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    courseColor: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    courseDescription: {
        type: Sequelize.STRING(2000),
        allowNull: false,
        unique: true
    },
    coursePublished: {
        type: Sequelize.ENUM('Yes', 'No'),
        allowNull: false,
        defaultValue: 'No'
    },
    courseStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    courseStatus: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
}

const Courses = sequelize.define('courses', coursesSchema, { freezeTableName: true, timestamps: false },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            },
        },
    }
);

Courses.sync()
    .then(result => {
        console.log('Courses table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Courses = Courses;