const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const countrySchema = {
    countryID: {
        type: Sequelize.SMALLINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    countryName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    countryDialCode: {
        type: Sequelize.STRING(5),
        defaultValue: ''
    },
    countryFlagImage: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: ''
    },
    countryRemark: {
        type: Sequelize.STRING(200),
        defaultValue: null
    },
    countryStatus: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    },
    countryCreatedDate: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
}

const Country = sequelize.define('country', countrySchema, { freezeTableName: true, timestamps: false },
    {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                Country.hasMany(models.City, {
                    foreignKey: 'countryID'
                })
            },
        },
    }
);

sequelize.sync()
    .then(result => {
        console.log('Country table created');
    }).catch(err => {
        console.log(err);
    });

module.exports.Country = Country;