
const { Questionbank } = require('../../models/questionbank/questionbank');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');
const { on } = require('nodemon');

exports.getQuestionbank = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") {
            var pageNo = parseInt(req.query.pageNo)
            var limit =  parseInt(req.query.size)

            let startindex = (pageNo - 1) * limit;
            let endindex = pageNo * limit;

            if (pageNo < 0 || pageNo === 0) {
                return next(new AppError('invalid page number, should start with 1', 400));
            }
            var Questionbank;
            if (req.body.questionbankName != "" && req.body.questionbankName != null) 
            {
                
                var statment = "SELECT *  FROM `questionbank`  WHERE `questionbankName` LIKE '"+ req.body.questionbankName +"%' AND questionbankStatus = 'Active'";
               
                var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(result.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }

                Questionbank = result.slice(startindex, endindex)
            }
            else 
            {
                var statment = "SELECT *  FROM `questionbank` WHERE questionbankStatus = 'Active'";

                var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(result.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                Questionbank = result.slice(startindex, endindex)
            }
            

            var msg = {}
            msg['status'] = true;
            msg['message'] = 'Questionbank given';
            msg['data'] = Questionbank
            res.json(msg);

        }
        else {
            return next(new AppError('Token and userId not a match', 400));
        }
    }
    catch (error) {
        return next(error);
    }

}

exports.getQuestionbankAnswer = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            var pageNo = parseInt(req.query.pageNo)
            var limit = parseInt(req.query.size)

            let startindex = (pageNo - 1) * limit;
            let endindex = pageNo * limit;

            if (pageNo < 0 || pageNo === 0) 
            {
                return next(new AppError('invalid page number, should start with 1', 400));
            }
            var Answerbank;

            if (req.body.answerbankName != "" && req.body.answerbankName != null) 
            {
                var QuestionbankID = [];
                var statment = "SELECT *  FROM `questionbank`  WHERE `questionbankName` LIKE '"+ req.body.answerbankName +"%' AND questionbankStatus = 'Active'";
                
                
                var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(result.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                result.forEach(element => {
                    QuestionbankID.push(element.questionbankID);
                });
                
                var x = QuestionbankID.toString();

                let statment1 = "SELECT *  FROM `questionbank` INNER JOIN `answerbank` ON answerbank.answerbankID = questionbank.questionbankID WHERE questionbank.questionbankStatus = 'Active' AND questionbank.questionbankID IN ("+ x +")";

                var result1 = await sequelize.query(statment1, { type: QueryTypes.SELECT });
                if(result1.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                Answerbank = result1.slice(startindex, endindex)

            }
            else 
            {
                var statment = "SELECT *  FROM `questionbank` INNER JOIN `answerbank` ON answerbank.answerbankID = questionbank.questionbankID WHERE questionbank.questionbankStatus = 'Active'";

                var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(result.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                Answerbank = result.slice(startindex, endindex)
            }
            

            var msg = {}
            msg['status'] = true;
            msg['message'] = 'answerbank given';
            msg['data'] = Answerbank
            res.json(msg);

        }
        else {
            return next(new AppError('Token and userId not a match', 400));
        }
    }
    catch (error) {
        return next(error);
    }

}
