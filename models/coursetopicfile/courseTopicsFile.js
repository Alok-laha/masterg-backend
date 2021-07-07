const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../database/database');


const courseTopicFileSchema={
    courseTopicsFileID:{
        type: DataTypes.SMALLINT(3),
        allowNull: false
    },
    coursetopicFileType: {
        type: DataTypes.STRING
    },
    courseTopicFileName:{
        type: DataTypes.STRING
    },
    coursetopicFile:{
        type: DataTypes.STRING
    },
    coursechapterID:{
        type: DataTypes.INTEGER(3)
    },
    courseTopicFilesatus:{
        type: DataTypes.ENUM("Active","Inactive"),
        allowNull: false,
        defaultValue: "Active"
    },
    coursetopicID:{
         type: DataTypes.SMALLINT(3)
    }
}
const courseTopicsFile = sequelize.define('courseTopicsFile', courseTopicFileSchema, { freezeTableName: true, timestamps: false },
  {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      },
    },
  }
);

courseTopicsFile.sync()
  .then(result => {
    console.log('courseTopicsFile table created');
  }).catch(err => {
    console.log(err);
  });

module.exports.courseTopicsFile = courseTopicsFile;

// var statement = "SELECT courseTopicsFile.courseTopicsFileID,courseTopicsFile.coursetopicFileType,
//courseTopicsFile.courseTopicFileName,courseTopicsFile.coursetopicFile FROM 
//`courseTopicsFile` INNER JOIN coursechapters ON coursechapters.coursechapterID =
// courseTopicsFile.coursechapterID  WHERE courseTopicsFile.courseTopicFilesatus = 'Active' 
//AND coursechapters.coursesubjID  = "+ req.body.coursesubjID;
// statement += " AND coursechapters.coursechapterID = " + req.body.coursechapterID;
// statement += " AND courseTopicsFile.coursetopicID = "+req.body.coursetopicID;