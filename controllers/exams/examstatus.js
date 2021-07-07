
const { Examstatus } = require('../../models/exams/examstatus');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');
const { on } = require('nodemon');

// this router gives us all the entities from database
exports.examstatus = async (req, res, next) => {
    try 
    {
        if(req.user == req.body.loginuserID && req.body.loginuserID != "")
        {
            if(req.body.queID != '' && req.body.queID != null && req.body.queAnswered != '' && req.body.queAnswered != null && req.body.queAnsweredCorrect != '' && req.body.queAnsweredCorrect != null)
            {
                var values = {queAnswered: req.body.queAnswered , queAnsweredCorrect : req.body.queAnsweredCorrect };
                var condition = { where :{queID: req.body.queID,userID: req.body.loginuserID} }; 
                options = { multi: true };

               const result = Examstatus.update(values, condition , options)
               res.status(200).json({
                status: true,
                message: 'Exam Status successFully updated',
                data: {},
            });
            }
            else
            {
                return next(new AppError('Required parameter is missing', 400));
            }
        }
        else
        {
            return next(new AppError('Token and userId not a match', 400));
        }
    }
    catch (error) 
    {
        return next(error);
    }

}
