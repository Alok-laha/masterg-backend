
const { Assignment } = require('../../models/assignment/assignment');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');
const { on } = require('nodemon');

exports.getAssignment = async (req, res, next) => {
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

            var findAssignment;
            if(req.body.assignment != '' && req.body.assignment != null)
            {
                var statment = "SELECT  *  FROM `assignment`  WHERE `assignmentName` LIKE '"+ req.body.assignment +"%' AND assignmentStatus = 'Active'";

                var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(result.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                findAssignment = result.slice(startindex, endindex)
            }
            else
            {
                var statment = "SELECT  *  FROM `assignment`  WHERE assignmentStatus = 'Active'";

                var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(result.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                findAssignment = result.slice(startindex, endindex)
            }
            res.status(200).json({
                status: true,
                message: 'Assignment given',
                data: {
                    findAssignment,
                },
            });
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

exports.getAssignmentDetails = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            if(req.body.assignmentID != '' && req.body.assignmentID != null)
            {
                var statment = "SELECT  *  FROM assignment INNER JOIN faculty ON assignment.facultyID = faculty.facultyID  WHERE assignmentStatus = 'Active' AND assignmentID = "+req.body.assignmentID;

                var getAssignmentDetails = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(getAssignmentDetails.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                res.status(200).json({
                status: true,
                message: 'Assignment given',
                data: {
                    getAssignmentDetails,
                },
            });

            }
            else
            {
                return next(new AppError('Please enter the required parameters', 400));
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

