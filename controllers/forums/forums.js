
const { Forums } = require('../../models/forums/forums');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');
const { on } = require('nodemon');
const fileHelper = require('../../utils/file');
const { forumMessages } = require('../../models/forums/forumMessage')

exports.getForums = async (req, res, next) => {
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

            var findForums;

            if(req.body.forumName !="" && req.body.forumName != null)
            {   
                var forumID = [];
                var statment = "SELECT * FROM `forum` WHERE `forumName` LIKE '"+ req.body.forumName +"%' AND forumStatus = 'Active'";
               
                var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(result.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                result.forEach(element => {
                    forumID.push(element.forumID);
                });
                
                var x = forumID.toString();

                let statment1 = "SELECT forum.forumID,forum.forumName,forum.forumSubject,forum.forumPic,forum.forumCreatedDate,faculty.facultyFullName,COUNT(forummessages.forummessID) AS totalComments  FROM `forum` INNER JOIN `faculty` ON forum.facultyID = faculty.facultyID LEFT JOIN forummessages ON forum.forumID = forummessages.forumID  WHERE forum.forumStatus = 'Active' AND forum.forumID IN ("+ x +")";
                
                var result1 = await sequelize.query(statment1, { type: QueryTypes.SELECT });
                
                findForums = result1.slice(startindex, endindex)
            }
            else
            {
                var statment = "SELECT forum.forumID,forum.forumName,forum.forumSubject,forum.forumPic,forum.forumCreatedDate,faculty.facultyFullName,COUNT(forummessages.forummessID) AS totalComments FROM forum JOIN faculty ON forum.facultyID = faculty.facultyID LEFT JOIN forummessages ON forum.forumID = forummessages.forumID WHERE forum.forumStatus = 'Active' GROUP BY forum.forumID";

                var result = await sequelize.query(statment, { type: QueryTypes.SELECT });

                findForums = result.slice(startindex, endindex)
            }

            res.status(200).json({
                status: true,
                message: 'Forums given',
                data: {
                    findForums,
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

exports.getForumsDetils = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            if (req.body.forumID != '' && req.body.forumID != null) 
            {
                var statment = "SELECT forum.forumID,forum.forumName,forum.forumSubject,forum.forumPic,forum.forumCreatedDate,faculty.facultyFullName,forum.AssiDescription,COUNT(forummessages.forummessID) AS totalComments FROM forum JOIN faculty ON forum.facultyID = faculty.facultyID LEFT JOIN forummessages ON forum.forumID = forummessages.forumID WHERE forum.forumStatus = 'Active' AND forum.forumID = "+req.body.forumID;

                var getForumsDetils = await sequelize.query(statment, { type: QueryTypes.SELECT });
                
                var statment1 = "SELECT users.userFullName,users.userProfilePicture,forummessages.forummessCreatedDateTime,forummessages.forummessMessage,forummessages.forummessAttachment FROM `forummessages` INNER JOIN users ON forummessages.userID = users.userID WHERE forummessages.forumID = "+req.body.forumID;

                var getForumsComments = await sequelize.query(statment1, { type: QueryTypes.SELECT });

               if(getForumsDetils && getForumsDetils.length > 0) {
                    getForumsDetils[0]['getForumsComments'] = getForumsComments;
               }
                res.status(200).json({
                    status: true,
                    message: 'getForumsDetils given',
                    data: {
                        getForumsDetils
                    },
                });
            }
            else 
            {
                return next(new AppError('Required parameters are missing', 400));
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
exports.forumMessagesAdd = async (req, res, next) => {
        try {
            
            if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
            {
                if (req.body.forumID != '' && req.body.forumID != null && req.body.userComments != '' && req.body.userComments != null ) 
                {
                    
                   
                    if(req.body.image!='' && req.body.image!= null)
                    {
                        var statement = "INSERT INTO `forummessages`(`forumID`, `userID`, `forummessMessage`,`forummessAttachment`) VALUES ("+ req.body.forumID +","+ req.body.loginuserID +",'"+ req.body.userComments +"','"+req.body.image+"')";

                        await sequelize.query(statement)
                        
                    }
                    else
                    {
                        var statement = "INSERT INTO `forummessages`(`forumID`, `userID`, `forummessMessage`) VALUES ("+ req.body.forumID +","+ req.body.loginuserID +",'"+ req.body.userComments +"')";

                        await sequelize.query(statement)
                        
                        
                    }

                    res.status(200).json({
                        status: true,
                        message: 'Your comment has been sent successfully.',
                        data: {},
                    });
                    
                }
                else 
                {
                    return next(new AppError('Required parameters are missing', 400));
                }
            }
            else {
                return next(new AppError('Token and userId not a match', 400));
            }
        }
        catch (error) {
            return next(error);
        }
    };
