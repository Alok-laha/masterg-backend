const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

const Faqs = sequelize.define(
  'faq',
  {
    faqID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    faqtypeID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    faqQuestion: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    faqAnswer: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    faqStatus: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);

sequelize
  .sync()
  .then((result) => {
    console.log('Faqs table created');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Faqs;
