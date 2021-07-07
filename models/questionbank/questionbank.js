const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const questionbankSchema = {
    questionbankID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    questionbankName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    questionbankDescription: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },
    questionbankFile: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    questionbankStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    questionbankCreatedDate: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    entityID: {
        type: Sequelize.SMALLINT(2),
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

const Questionbank = sequelize.define('questionbank', questionbankSchema, { freezeTableName: true, timestamps: false },
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
        console.log('Questionbank table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Questionbank = Questionbank;