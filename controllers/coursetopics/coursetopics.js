const { Coursetopics } = require('../../models/coursetopics/coursetopics')
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../../database/database');
const Op = Sequelize.Op
const AppError = require('../../utils/appError');
const courseTopicsFile= require("../../models/coursetopicfile/courseTopicsFile");

// this router gives us all the entities from database
exports.getcoursetopics = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID) 
        {
            if (req.body.coursesubjID != "" && req.body.coursesubjID != "0" && req.body.coursechapterID != "" && req.body.coursechapterID != "0") 
            {
                var statement = "SELECT coursetopics.coursetopicID,coursechapters.coursechapterID,coursetopics.coursetopic,coursetopics.coursetopicFileType,coursechapters.coursechapterDescription,coursetopics.coursetopicFile FROM `coursechapters`INNER JOIN coursetopics ON coursechapters.coursechapterID = coursetopics.coursechapterID WHERE coursetopics.coursetopicstatus = 'Active' AND coursechapters.coursesubjID  = " + req.body.coursesubjID;
                statement += " AND coursechapters.coursechapterID = " + req.body.coursechapterID;

                const getcoursechapters = await sequelize.query(statement, { type: QueryTypes.SELECT });

                var Coursetopics = [];
                counter = 0;
                getcoursechapters.forEach(element => {
                    counter++;
                    element.TopicNo = counter;
                    Coursetopics.push(element)
                });

                res.status(200).json({
                    status: true,
                    message: 'Coursetopics given',
                    data: {
                        Coursetopics,
                    },
                });
            }
            else if (req.body.coursesubjID == '0' && req.body.coursechapterID == "0") 
            {
                var statement = "SELECT coursetopics.coursetopicID,coursetopics.coursetopicFileType,coursetopics.coursetopic,coursechapters.coursechapterDescription,coursetopics.coursetopicFile FROM `coursetopics` INNER JOIN coursechapters ON coursechapters.coursechapterID = coursetopics.coursechapterID  WHERE coursetopics.coursetopicstatus = 'Active'";

                const getcoursechapters = await sequelize.query(statement, { type: QueryTypes.SELECT });
                var Coursetopics = [];
                counter = 0;
                getcoursechapters.forEach(element => {
                    counter++;
                    element.TopicNo = counter;
                    Coursetopics.push(element)
                });
                res.status(200).json({
                    status: true,
                    message: 'Coursechapters given',
                    data: {
                        Coursetopics,
                    },
                });
            }
            else {
                return next(new AppError('coursesubjID and coursechapterNo not properly matched ', 400));
            }
        }
        else {
            return next(new AppError('Token and userId not a match', 400));
        }
    } catch (error) {
        return next(error);
    }

}

exports.getcoursetopicsFile = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID) 
        {
            if (req.body.coursesubjID != "" && req.body.coursesubjID != "0" && req.body.coursechapterID != "" && req.body.coursechapterID != "0" && req.body.coursetopicID != "" && req.body.coursetopicID != "0") 
            {
                var statement = "SELECT courseTopicsFile.courseTopicsFileID,courseTopicsFile.coursetopicFileType,courseTopicsFile.courseTopicFileName,courseTopicsFile.coursetopicFile FROM `courseTopicsFile` INNER JOIN coursechapters ON coursechapters.coursechapterID = courseTopicsFile.coursechapterID  WHERE courseTopicsFile.courseTopicFilesatus = 'Active' AND coursechapters.coursesubjID  = "+ req.body.coursesubjID;
                statement += " AND coursechapters.coursechapterID = " + req.body.coursechapterID;
                statement += " AND courseTopicsFile.coursetopicID = "+req.body.coursetopicID;
                
                const getcoursechapters = await sequelize.query(statement, { type: QueryTypes.SELECT });

                if(getcoursechapters.length==0){
                    console.log(getcoursechapters.toString());
                    res.status(200).json({
                        status: true,
                        message: 'No files found'
                    });
                }
               
                var Coursetopics = [];
                counter = 0;
                getcoursechapters.forEach(element => {
                    counter++;
                    element.TopicNo = counter;
                    Coursetopics.push(element)
                });

                res.status(200).json({
                    status: true,
                    message: 'Coursetopics given',
                    data: {
                        Coursetopics,
                    },
                });
            }
            else 
            {
                return next(new AppError('coursesubjID and coursechapterNo not properly matched ', 400));
            }
        }
        else {
            return next(new AppError('Token and userId not a match', 400));
        }
    } catch (error) {
        return next(error);
    }

}