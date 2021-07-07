
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');
const { on } = require('nodemon');
const {Examresults}= require("../../models/exams/examresults");
const {userexams} = require("../../models/exams/userexams");
const {Questions} = require("../../models/exams/questions");

exports.userresults = async (req, res, next) => {
    try {

        if (req.body.loginuserID != "" && req.body.loginuserID != null) 
        {
            if (req.body.loginuserID == req.user) 
            {
                //exams.examName,examresults.
                const statement = "SELECT * FROM examresults INNER JOIN exams ON examresults.examID = exams.examID WHERE userID = " + req.body.loginuserID + " ORDER BY ID DESC";
                
                var getMyResults = await sequelize.query(statement, { type: QueryTypes.SELECT });
                
                if(getMyResults.length==0){
                    res.status(200).json({
                        ststus:true,
                        message:'Results not found'
                    });
                }
                res.status(200).json({
                    status: true,
                    message: 'My Results are given',
                    data: {
                        getMyResults,
                    },
                });
            }
            else 
            {
                return next(new AppError('Token and userId not a match', 400));
            }
        }
        else 
        {
            return next(new AppError('loginuserID and examID missing', 400));
        }
    }
    catch (error) 
    {
        return next(error);
    }

}


exports.userViewResults = async (req, res, next) => {
    try {

        if (req.body.loginuserID != "" && req.body.loginuserID != null) {

        if(req.body.resultsID != '' && req.body.resultsID != null){ 
            if (req.body.loginuserID == req.user) {


                Examresults.findAll({
                    where:{
                        userID: req.body.loginuserID,
                        examID: req.body.resultsID
                    }
                }).then(async getMyResult=>{
                    if (getMyResult.length > 0) {
                        var AllQuestions=[];
                        for(let i=0;i<getMyResult.length;i++){
                            const statement = "SELECT * FROM `userexams` INNER JOIN questions ON userexams.queID = questions.queID WHERE userexams.userID = " + req.body.loginuserID + " AND userexams.uniqueNumber = '" + getMyResult[i].uniqueNumber + "' AND userexams.resultsID = " + getMyResult[i].ID;
                      
                            var getMyquestion = await sequelize.query(statement, { type: QueryTypes.SELECT });
                            AllQuestions.push(getMyquestion);
                        }
                        
                        var ResultQuestions=[];
                        let count=0;
                        for(let i=0;i<AllQuestions.length;i++){
                            for(let j=0;j<AllQuestions[i].length;j++){
                                ResultQuestions[count]= AllQuestions[i][j];
                                count++;
                            }
                        }
                        //console.log(ResultQuestions);
                        if (ResultQuestions.length > 0) 
                        {
                            console.log(ResultQuestions.length);
                             for (let i = 0; i < ResultQuestions.length; i++) 
                             {
                            //     ResultQuestions.push(AllQuestions[i]);
                            //     //console.log(ResultQuestions[i]);
                            //     var getMyquestion=[];
                            //     for(let j=0;j<ResultQuestions[i].length;j++){
                            //         getMyquestion.push( ResultQuestions[i][j]);

                            //         for(let k=0;k<getMyquestion.length;k++){
                                ResultQuestions[i].queOptions = [
                                             {
                                                 "queOption": ResultQuestions[i].queOption1,
                                                 "queOptionId": 1
                                             }, 
                                             {
                                                  "queOption": ResultQuestions[i].queOption2,
                                                  "queOptionId": 2
                                             }, 
                                             {
                                                 "queOption": ResultQuestions[i].queOption3,
                                                 "queOptionId": 3
                                             }, 
                                             {
                                                 "queOption": ResultQuestions[i].queOption4,
                                                 "queOptionId": 4
                                             }
                                        ];
                            //             count++;
                                     }
    
                            //     }
                            //     console.log(getMyquestion);
                            //     count=0;
                            // }
                        }
                        else
                        {
                            return next(new AppError('Data Not Found', 400));
                        }
                        var getMyquestion = ResultQuestions; 
                        res.status(200).json({
                            status: true,
                            message: 'Result Views',
                            data: {
                                getMyquestion,
                            },
                        });
                    }
                    else{
                        return next(new AppError('Data not found',400));
                    }
                })
                //const statement = "SELECT * FROM examresults WHERE userID = " + req.body.loginuserID + " AND examID = " + req.body.resultsID;

                //var getMyResult = await sequelize.query(statement, { type: QueryTypes.SELECT });
                
                // if(req.body.examID!='' && req.body.examID!=null){
                // const statement = "SELECT * FROM examresults WHERE userID = " + req.body.loginuserID + " AND examID = " + req.body.examID;

                // var getMyResult = await sequelize.query(statement, { type: QueryTypes.SELECT });
                // }

                
                }
                else {
                    return next(new AppError('Token and userId not a match', 400));
                }
            }
            else 
            {
                return next(new AppError('resultID not provided', 400));
            }
        }
        else 
        {
            return next(new AppError('loginuserID missing', 400));
        }
    }
    catch (error) 
    {
        return next(error);
    }

}