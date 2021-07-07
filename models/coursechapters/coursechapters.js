const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const coursechaptersSchema = {
    coursechapterID: {
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
    coursechapterNo: {
        type: Sequelize.SMALLINT(3),
        allowNull: true
    },
    coursechapterName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    coursechapterDescription: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    coursechapeterVideoFileCount: {
        type: Sequelize.SMALLINT(2),
        allowNull: true
    },
    coursechapeterContentFileCount: {
        type: Sequelize.SMALLINT(2),
        allowNull: true
    },
    coursechapterStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    coursechapterCreatedDate: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
}

const Coursechapters = sequelize.define('coursechapters', coursechaptersSchema, { freezeTableName: true, timestamps: false },
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
        console.log('Coursechapters table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Coursechapters = Coursechapters;