const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const subjectsSchema = {
    coursesubjID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    courseID: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
    },
    coursesubjName: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true  
    },
    coursesubjIcon: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    coursesubjColor: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    coursesubjDescription: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    coursesubjChapters: {
        type: Sequelize.SMALLINT(3),
        allowNull: true
    },
    coursesubjStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false
    },
    coursesubjCreatedDate: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
}

const Subjects = sequelize.define('coursesubjects', subjectsSchema, { freezeTableName: true, timestamps: false },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            },
        },
    }
);

sequelize.sync()
    .then(result => {
        console.log('Subjects table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Subjects = Subjects;