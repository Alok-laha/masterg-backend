const { Courses } = require('../../models/courses/courses')
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../../database/database');
const Op = Sequelize.Op
const AppError = require('../../utils/appError');

// this router gives us all the entities from database
exports.getcourses = async (req, res, next) => {
    try {
       
        if (req.user == req.body.loginuserID) 
        {                                                                                                                                              //count(coursesubjects.courseID) as totalSubjects                                                                                                                                                                                                                                                LEFT JOIN coursesubjects on courses.courseID= coursesubjects.courseID
            const courses= await sequelize.query("select users.userFullName, courses.courseID, courses.CourseName, courses.courseIcon, courses.courseColor from users inner join courses on users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID  where courses.courseStatus= 'Active' AND users.userID= "+req.user,{type: QueryTypes.SELECT});
                 
            //const courses = await sequelize.query("select users.userFullName, courses.courseID, courses.CourseName, courses.courseIcon, courses.courseColor, count(coursesubjects.courseID) as totalSubjects from coursesubjects, courses LEFT JOIN users on users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID  where courses.courseStatus = 'Active' AND courses.courseID= coursesubjects.courseID AND users.userID = "+req.user, { type: QueryTypes.SELECT });
           // const totalSubject= await sequelize.query("select count(coursesubjects.courseID) as totalSubjects from coursesubjects INNER JOIN courses on coursesubjects.courseID= courses.courseID  where courses.courseStatus = 'Active' AND coursesubjects.coursesubjStatus='Active'", { type: QueryTypes.SELECT});                                                                                 // HEX(courses.courseColor)  courses.courseID                                      INNER                                                                                                                                                                                                        +"GROUP BY coursesubjects.courseID"                 
           // const courses = await sequelize.query("SELECT courses.courseID,courses.CourseName,courses.courseIcon,courses.courseColor,COUNT(coursesubjects.courseID) AS totalSubjects FROM courses INNER JOIN coursesubjects ON courses.courseID = coursesubjects.courseID inner join users on users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID WHERE coursesubjects.coursesubjStatus='Active' AND courses.courseStatus = 'Active' AND courses.coursePublished = 'Yes' AND users.userID= " +req.user, { type: QueryTypes.SELECT });
        //     "select users.userID,users.userFullName,users.userProfilePicture,users.userMobile,users.userEmail,users.userPassword,users.userEntityId,users.userEntityId,users.userCenterId,users.userBatchId,users.categorylevel1ID,users.categorylevel2ID,users.categorylevel3ID,users.categorylevel4ID,users.userAddress,users.languageID,users.userDeviceType,users.userDeviceID,users.userVerified,users.userNewsNotification,users.userCourseNotification,users.userOfferNotification,users.userExamNotification,users.userStatus,users.userJoiningDate,users.countryID,users.stateID,users.cityID,users.userCreatedDate,users.userSignupOTPVerified,courses.courseID,courses.CourseName,courses.courseType,courses.coursePublished,courses.courseStatus,courses.courseDescription,courses.courseIcon,courses.courseColor from users,courses where users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID AND courses.courseStatus = 'Active' AND courses.courseType='Free' AND users.userID = "+req.user;
        //     "select courses.courseID, coures.CourseName, courses.courseIcon, courses.courseColor from courses where users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID AND courses.courseStatus = 'Active' AND users.userID = "+req.user;
         
        for(let i in courses){
            let id = courses[i].courseID;
            let result= await sequelize.query("select count(coursesubjects.courseID) as totalSubjects from coursesubjects where coursesubjects.coursesubjStatus= 'Active' AND coursesubjects.courseID= "+id,{type: QueryTypes.SELECT});
            courses[i].totalSubjects= result[0].totalSubjects;
        }

        
        res.status(200).json({
                status: true,
                message: 'Courses given',
                data: {
                    courses
                },
            });
        }
        else {
            return next(new AppError('Token and userId not a match', 400));
        }
    } catch (error) {
        return next(error);
    }

}