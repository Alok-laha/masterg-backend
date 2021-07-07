const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const coursetopicsSchema = {
    coursetopicID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    coursechapterID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    coursetopicFileType: {
        type: Sequelize.ENUM('Video', 'Contents', 'Audio'),
        allowNull: false
    },
    coursetopicFile: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    coursetopic: {
        type: Sequelize.STRING(300),
        allowNull: true
    },
    coursetopicstatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false
    },
}

const Coursetopics = sequelize.define('coursetopics', coursetopicsSchema, { freezeTableName: true, timestamps: false },
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
        console.log('Coursetopics table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Coursetopics = Coursetopics;