const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const assignmentSchema = {
    assignmentID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    facultyID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    assignmentName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    assignmentSubject: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    assignmentDescription: {
        type: Sequelize.STRING(4000),
        allowNull: true
    },
    assignmentFiles: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    assignmentPic: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    assignmentStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    assignmentCreatedDate: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    entityID: {
        type: Sequelize.SMALLINT,
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
}

const Assignment = sequelize.define('assignment', assignmentSchema, { freezeTableName: true, timestamps: false },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            },
        },
    }
);

Assignment.sync()
    .then(result => {
        console.log('Assignment table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Assignment = Assignment;