const { Examresults } = require("../../models/exams/examresults");
const { Exams } = require('../../models/exams/exams');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');
const { on } = require('nodemon');

// this router gives us all the entities from database
exports.getexams = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            const statement = "SELECT * FROM exams INNER JOIN users ON exams.entityID = users.userEntityId AND exams.categorylevel1ID = users.categorylevel1ID AND exams.categorylevel2ID = users.categorylevel2ID AND exams.categorylevel3ID = users.categorylevel3ID AND exams.categorylevel4ID = users.categorylevel4ID WHERE exams.examID NOT IN (SELECT examID FROM examresults WHERE userID = "+req.body.loginuserID+") AND exams.examStatus = 'Active' AND users.userID = " + req.body.loginuserID;
            
            var getExams = await sequelize.query(statement, { type: QueryTypes.SELECT });

            if (getExams.length <= 0) 
            {
                console.log(getExams.length);
                return next(new AppError('Exams not found', 400));
            }

            var numbers = [];

            getExams.forEach((element) => {

                var dateFrom = new Date(element.examStartDate);
                var dateTo = new Date(element.examEndDate);
                var dateCheck = new Date();
                var a = GetFormattedDate(dateFrom);
                var b = GetFormattedDate(dateTo);
                var c = GetFormattedDate(dateCheck);
                var d1 = a.split("/");
                var d2 = b.split("/");
                var c = c.split("/");
                var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
                var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
                var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

                var ceheking = check >= from && check <= to;

                if (ceheking == true) 
                {
                    numbers.push(element.examID)
                }

            })
            var getExam = [];
            var counter = 1;
            if (numbers.length <= 0) {
                console.log("Say hi "+numbers.length);
                return next(new AppError('Exams not found', 400));
            }
            numbers.forEach(async (element) => {

                const statement = "SELECT * FROM exams WHERE examID = " + element;
                
                var object1 = await sequelize.query(statement, { type: QueryTypes.SELECT });
                getExam.push(object1[0])

                if (counter == numbers.length) {
                    res.status(200).json({
                        status: true,
                        message: 'Exams given',
                        data: {
                            getExam,
                        },
                    });
                }
                else {
                    counter++;
                }
            });
        }
        else {
            return next(new AppError('Token and userId not a match', 400));
        }
    }
    catch (error) {
        return next(error);
    }

}

exports.getexamdetails = async (req, res, next) => {
    try {
        const Examdetails = await Exams.findAll({
            where: [{ examID: req.body.examID }]
        });
        if (Examdetails.length <= 0) 
        {
            return next(new AppError('Exams detiles not found', 400));
        }
        if (req.body.loginuserID != "" && req.body.examID != "") 
        {
            if (req.body.loginuserID == req.user) 
            {
                res.status(200).json({
                    status: true,
                    message: 'Examdetails given',
                    data: {
                        Examdetails,
                    },
                });
            }
            else 
            {
                return next(new AppError('Token and userId not a match', 400));
            }
        }
        else {
            return next(new AppError('loginuserID and examID missing', 400));
        }
    }
    catch (error) {
        return next(error);
    }

}


function GetFormattedDate(date) {
    var b = (date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    var a = (date.getDate() > 9) ? date.getDate() : ('0' + date.getDate());
    var c = date.getFullYear();

    var d = a + '/' + b + '/' + c;
    return d;
}