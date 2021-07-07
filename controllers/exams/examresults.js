
const { Examresults } = require('../../models/exams/examresults');
const { Exams } = require('../../models/exams/exams');
const { QueryTypes } = require('sequelize');
const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');
const { on } = require('nodemon');

// this router gives us all the entities from database
exports.examresults = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") {
            if (req.body.examID != '' && req.body.examID != null && req.body.examCorrectMarks != '' && req.body.examCorrectMarks != null && req.body.examWrongMarks != '' && req.body.examWrongMarks != null && req.body.userexamStatus != '' && req.body.userexamStatus != null) {
                const findExam = await Exams.findOne({
                    where: {
                        examID: req.body.examID
                    }
                });

                if (findExam === null) {
                    return next(new AppError('Exams Not Found', 400));
                }
                let createExamResult= async ()=>{
                    var userID = req.body.loginuserID;
                    var examID = req.body.examID;
                    var courseID = findExam.courseID;
                    var coursesubjID = findExam.coursesubjID;
                    var coursechapterIDs = findExam.coursechapterIDs;
                    var examTotalQs = findExam.examTotalQs;
                    var examQualifyingMarks = findExam.examQualifyingMarks;
                    var examCorrectMarks = req.body.examCorrectMarks;
                    var examWrongMarks = req.body.examWrongMarks;
                    var userexamStatus = req.body.userexamStatus;

                    let result= {userID: userID, examID: examID, courseID: courseID,
                    coursesubjID: coursesubjID, coursechapterIDs: coursechapterIDs,
                    examTotalQs: examTotalQs,examQualifyingMarks: examQualifyingMarks,
                    examCorrectMarks: examCorrectMarks, examWrongMarks: examWrongMarks,
                    userexamStatus: userexamStatus};

                    // var statement = "INSERT INTO `examresults` (`examID`,`userID` ,`courseID`, `coursesubjID`, `coursechapterIDs`, `examTotalQs`, `examQualifyingMarks`, `examCorrectMarks`, `examWrongMarks`, `userexamStatus`) VALUES ('" + examID + "', '" + loginuserID + "','" + courseID + "' ,'" + coursesubjID + "', '" + coursechapterIDs + "', '" + examTotalQs + "', '" + examQualifyingMarks + "', '" + examCorrectMarks + "', '" + examWrongMarks + "', '" + userexamStatus + "')";

                    // var object = await sequelize.query(statement);

                    let object = await Examresults.create(result);
                    
                    data= object.toString();
                    return data;
                }
                var result;
                try {
                    result = await Examresults.findAll({ where: { examID: req.body.examID, loginuserID: req.body.loginuserID } });
                    if (typeof result != "undefined" && result != null && result.length != null && result.length > 0 && result != '') {
                        return next(new AppError('You have already done these exams.', 400));
                    }
                    else{
                        let { data }=createExamResult();
                        res.status(200).json({
                            status: true,
                            message: 'Exam submitted successFully',
                            data: data
                        });
                    }
                } catch (error) {
                    let { data }=createExamResult();
                    console.log(error);
                    res.status(200).json({
                        status: true,
                        message: 'Exam submitted successFully',
                        data: {data},
                    });
                    //return next(new AppError('Error while loading the exam'));
                }

                
                // if (typeof result != "undefined" && result != null && result.length != null && result.length > 0 && result != '') {
                //     return next(new AppError('You have already done these exams.', 400));
                // }
                // else {
                    // var loginuserID = req.body.loginuserID;
                    // var examID = req.body.examID;
                    // var courseID = findExam.courseID;
                    // var coursesubjID = findExam.coursesubjID;
                    // var coursechapterIDs = findExam.coursechapterIDs;
                    // var examTotalQs = findExam.examTotalQs;
                    // var examQualifyingMarks = findExam.examQualifyingMarks;
                    // var examCorrectMarks = req.body.examCorrectMarks;
                    // var examWrongMarks = req.body.examWrongMarks;
                    // var userexamStatus = req.body.userexamStatus;

                    // let result= {loginuserID: loginuserID, examID: examID, courseID: courseID,
                    // coursesubjID: coursesubjID, coursechapterIDs: coursechapterIDs,
                    // examTotalQs: examTotalQs,examQualifyingMarks: examQualifyingMarks,
                    // examCorrectMarks: examCorrectMarks, examWrongMarks: examWrongMarks,
                    // userexamStatus: userexamStatus};

                    // // var statement = "INSERT INTO `examresults` (`examID`,`userID` ,`courseID`, `coursesubjID`, `coursechapterIDs`, `examTotalQs`, `examQualifyingMarks`, `examCorrectMarks`, `examWrongMarks`, `userexamStatus`) VALUES ('" + examID + "', '" + loginuserID + "','" + courseID + "' ,'" + coursesubjID + "', '" + coursechapterIDs + "', '" + examTotalQs + "', '" + examQualifyingMarks + "', '" + examCorrectMarks + "', '" + examWrongMarks + "', '" + userexamStatus + "')";

                    // // var object = await sequelize.query(statement);

                    // let object = async()=>{
                    //     return await Examresults.create(result);
                    // }
                    // data= object.toString();
                //}
            }
            else {
                return next(new AppError('Required parameter is missing', 400));
            }
        }
        else {
            return next(new AppError('Token and userId not a match', 400));
        }
    }
    catch (error) {
        return next(error);
    }

}
