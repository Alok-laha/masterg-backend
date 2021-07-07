const { Coursechapters } = require('../../models/coursechapters/coursechapters')
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../../database/database');
const Op = Sequelize.Op
const AppError = require('../../utils/appError');

// this router gives us all the entities from database
exports.getcoursechapters = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID) {
            if (req.body.coursesubjID != "" && req.body.coursesubjID != "0") 
            {
                var statement = "SELECT coursechapters.coursesubjID,coursechapters.coursechapterID,coursechapters.coursechapterName FROM `coursechapters` WHERE coursechapters.coursechapterStatus = 'Active' AND coursechapters.coursesubjID =" + req.body.coursesubjID;
                statement += " GROUP BY coursechapters.coursechapterID ORDER BY coursechapters.coursechapterID ASC";
                console.log(statement)
                const coursechapters = await sequelize.query(statement, { type: QueryTypes.SELECT });

                for(let i in coursechapters){
                    let id = coursechapters[i].coursechapterID;
                    let result= await sequelize.query("select count(coursetopics.coursechapterID) as totalTopics from coursetopics where coursetopics.coursetopicstatus= 'Active' AND coursetopics.coursechapterID= "+id,{type: QueryTypes.SELECT});
                    coursechapters[i].totalTopics= result[0].totalTopics;
                }

                res.status(200).json({
                    status: true,
                    message: 'Coursechapters given',
                    data: {
                        coursechapters,
                    },
                });
            }
            else if (req.body.coursesubjID == '0') 
            {
                var statement = "SELECT coursechapters.coursesubjID,coursechapters.coursesubjID,coursechapters.coursechapterID,coursechapters.coursechapterName FROM `coursechapters` WHERE coursechapters.coursechapterStatus = 'Active' GROUP BY coursechapters.coursechapterID ORDER BY coursechapters.coursesubjID ASC";

                const coursechapters = await sequelize.query(statement, { type: QueryTypes.SELECT });

                for(let i in coursechapters){
                    let id = coursechapters[i].coursechapterID;
                    let result= await sequelize.query("select count(coursetopics.coursechapterID) as totalTopics from coursetopics where coursetopics.coursetopicstatus= 'Active' AND coursetopics.coursechapterID= "+id,{type: QueryTypes.SELECT});
                    coursechapters[i].totalTopics= result[0].totalTopics;
                }

                res.status(200).json({
                    status: true,
                    message: 'Coursechapters given',
                    data: {
                        coursechapters,
                    },
                });
            }
            else {
                return next(new AppError('coursesubjID Messing', 400));
            }
        }
        else {
            return next(new AppError('Token and userId not a match', 400));
        }
    } catch (error) {
        return next(error);
    }

}