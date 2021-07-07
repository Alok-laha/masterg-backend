const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const  userexamsSchema={
    examID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    queID:{
        type: Sequelize.STRING,
        allowNull: false
    },
    uniqueNumber:{
        type: Sequelize.STRING,
        allowNull: false
    },
    resultsID:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    userexamSkipped:{
        type:Sequelize.ENUM('Yes','No'),
        allowNull: false,
        defaultValue: 'No'
    },
    userexamAnswer:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    CreatedDate: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}

const userexams = sequelize.define('userexams', userexamsSchema, { freezeTableName: true, timestamps: false },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            },
        },
    }
);

userexams.sync()
    .then(result => {
        console.log('userexams table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.userexams = userexams;