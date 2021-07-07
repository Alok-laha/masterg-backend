const Users= require('../../models/student/student');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');


exports.getLifeAtPnc = async (req, res, next) => {
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
            var LifeATPnc;
            if(req.body.lifeatpnc !="" && req.body.lifeatpnc != null)
            { 
                var statment = "SELECT * FROM `lifepnc` WHERE `lifepncStatus` = 'Active' AND lifepncName LIKE '"+ req.body.lifeatpnc +"%'";
                var result1 = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(result1.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                LifeATPnc = result1.slice(startindex, endindex)
            }
            else
            {
                var statment = "SELECT * FROM `lifepnc` WHERE `lifepncStatus` = 'Active'";
                var result1 = await sequelize.query(statment, { type: QueryTypes.SELECT });
                if(result1.length <= 0)
                {
                    return next(new AppError('Data Not Found', 400));
                }
                LifeATPnc = result1.slice(startindex, endindex)

            }
            
            res.status(200).json({
                status: true,
                message: 'Life At Pnc given',
                data: {
                    LifeATPnc,
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

exports.getLifeAtPncDetils = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            if (req.body.lifepncID != '' && req.body.lifepncID != null) 
            {
                var statment = "SELECT * FROM `lifepnc` WHERE `lifepncStatus` = 'Active' AND `lifepncID` = "+req.body.lifepncID;
                var getLifeAtPncDetils = await sequelize.query(statment, { type: QueryTypes.SELECT });
                res.status(200).json({
                    status: true,
                    message: 'Life At Pnc Detils given',
                    data: {
                        getLifeAtPncDetils,
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
exports.selectFacultyList = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            var feedFacultyFor;
            if(req.body.feedbackfor != '' && req.body.feedbackfor == '1')
            {
                return next(new AppError('Test temporary not found', 400));
            }
            else if(req.body.feedbackfor != '' && req.body.feedbackfor == '2')
            {
                feedFacultyFor = await sequelize.query("SELECT * FROM `courses` WHERE courseStatus = 'Active'", { type: QueryTypes.SELECT });
        
            }
            else
            {
                feedFacultyFor = await sequelize.query("SELECT * FROM `faculty` WHERE facultytatus = 'Active'", { type: QueryTypes.SELECT });
                
            }

            res.status(200).json({
                status: true,
                message: 'Feed faculty for given',
                data: {
                    feedFacultyFor,
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

exports.addFeedBack = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            
            if(req.body.feedbackfor != "" && req.body.feedbackMessage != "")
            {
                if(req.body.feedbackfor != '' && req.body.feedbackfor == '1')
                {
                    var statment = "INSERT INTO `feedback`(`userID`, `feedbackType`,`examID`, `feedbackMessage`) VALUES ("+ req.body.loginuserID +","+ req.body.feedbackfor +","+ req.body.examID +",'"+ req.body.feedbackMessage +"')";
                    
                    await sequelize.query(statment);
                }
                else if(req.body.feedbackfor != '' && req.body.feedbackfor == '2')
                {
                    var statment = "INSERT INTO `feedback`(`userID`, `feedbackType`,`courseID`, `feedbackMessage`) VALUES ("+ req.body.loginuserID +","+ req.body.feedbackfor +","+ req.body.courseID +",'"+ req.body.feedbackMessage +"')";
                    
                     await sequelize.query(statment);
                }   
                else
                {
                    var statment = "INSERT INTO `feedback`(`userID`, `feedbackType`,`facultyID`, `feedbackMessage`) VALUES ("+ req.body.loginuserID +","+ req.body.feedbackfor +","+ req.body.facultyID +",'"+ req.body.feedbackMessage +"')";

                     await sequelize.query(statment);
                   
                }

                res.status(200).json({
                    status: true,
                    message: 'Feedback Add SuccessFully',
                    data: {},
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

exports.feedBackList = async (req, res, next) => {
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

            var statment = "SELECT courses.CourseName,faculty.facultyFullName,feedback.feedbackType,feedback.feedbackMessage,feedback.feedbackCreatedDate FROM feedback LEFT JOIN courses ON feedback.courseID = courses.courseID LEFT JOIN faculty ON feedback.facultyID = faculty.facultyID WHERE feedback.feedbackStatus = 'Active' ORDER BY feedback.feedbackID DESC";

            var getlist = await sequelize.query(statment,{ type: QueryTypes.SELECT });
            var GetfeedBackList = getlist.slice(startindex, endindex)
            res.status(200).json({
                status: true,
                message: 'Feedback list given',
                data: {
                    GetfeedBackList
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

exports.homeList = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            var getUsers = "SELECT  CASE WHEN users.userBatchId = 1 THEN 'Morning' WHEN users.userBatchId = 2 THEN 'Afternoon' ELSE 'Evening' END AS BatchTime,categorylevel1.categorylevel1Name,categorylevel2.categorylevel2Name,categorylevel3.categorylevel3Name,categorylevel4.categorylevel4Name,language.languageName,users.* FROM `users` LEFT JOIN entity ON users.userEntityId = entity.entityID LEFT JOIN center ON users.userCenterId = center.userCenterId LEFT JOIN categorylevel1 ON users.categorylevel1ID = categorylevel1.categorylevel1ID LEFT JOIN categorylevel2 ON users.categorylevel2ID = categorylevel2.categorylevel2ID LEFT JOIN categorylevel3 ON users.categorylevel3ID = categorylevel3.categorylevel3ID LEFT JOIN categorylevel4 ON users.categorylevel4ID = categorylevel4.categorylevel4ID LEFT JOIN language ON users.languageID = language.languageID WHERE users.userID = "+req.user;

            var getHomeDetils = await sequelize.query(getUsers, { type: QueryTypes.SELECT });

            var bannerGet = "SELECT * FROM `banner` WHERE bannerStatus = 'Active' order by bannerPosition asc ";
            var getbannerDetils = await sequelize.query(bannerGet, { type: QueryTypes.SELECT });
                                                                                                            //,COUNT(courses.courseID) AS totalSubjects 
            var courseGet = "SELECT users.userID,courses.courseID,courses.CourseName,courses.courseIcon,courses.courseColor FROM users,courses WHERE courses.courseStatus = 'Active'  AND courses.coursePublished = 'Yes' AND users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID  AND users.userID = "+req.user;
            var getcoursesDetils = await sequelize.query(courseGet, { type: QueryTypes.SELECT });

            for(let i in getcoursesDetils){
                let id = getcoursesDetils[i].courseID;
                let result= await sequelize.query("select count(coursesubjects.courseID) as totalSubjects from coursesubjects where coursesubjects.coursesubjStatus= 'Active' AND coursesubjects.courseID= "+id,{type: QueryTypes.SELECT});
                getcoursesDetils[i].totalSubjects= result[0].totalSubjects;
            }

            //var subjectGet = "SELECT coursesubjects.* FROM `courses` INNER JOIN coursesubjects ON courses.courseID = coursesubjects.courseID WHERE courses.courseStatus = 'Active' AND coursesubjects.coursesubjStatus = 'Active'";
 
            let subjectGet= "select users.userID,users.userFullName,users.userProfilePicture,users.userMobile,users.userEmail,users.userPassword,users.userEntityId,users.userEntityId,users.userCenterId,users.userBatchId,users.categorylevel1ID,users.categorylevel2ID,users.categorylevel3ID,users.categorylevel4ID,users.userAddress,users.languageID,users.userDeviceType,users.userDeviceID,users.userVerified,users.userNewsNotification,users.userCourseNotification,users.userOfferNotification,users.userExamNotification,users.userStatus,users.userJoiningDate,users.countryID,users.stateID,users.cityID,users.userCreatedDate,users.userSignupOTPVerified,courses.courseID,courses.CourseName,courses.courseType,courses.coursePublished,courses.courseStatus,courses.courseDescription,courses.courseIcon,courses.courseColor from users,courses where users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID AND courses.courseStatus = 'Active' AND courses.courseType='Free' AND users.userID = "+req.user;

           //let subjectGet = "SELECT * FROM `users` LEFT JOIN ((SELECT courses.courseID,courses.CourseName,courses.courseIcon,HEX(courses.courseColor))AS coursedetails FROM courses) ON users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID  WHERE courses.courseStatus = 'Active' AND courses.courseType='Free' AND users.userID = "+req.user;
            //courses.
            //let subjectGet= "SELECT * FROM `users` LEFT JOIN  `courses` ON users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID  WHERE courses.courseStatus = 'Active' AND courses.courseType='Free' AND users.userID = "+req.user;
            // var courseGet = "SELECT * FROM `courses` WHERE courseStatus = 'Active' AND courseType = 'Paid'";
            // var getcoursesDetils = await sequelize.query(courseGet, { type: QueryTypes.SELECT });

            // var subjectGet = "SELECT * FROM `courses` WHERE courseStatus = 'Active' AND courseType = 'Free'";

            var getsubjectDetils = await sequelize.query(subjectGet, { type: QueryTypes.SELECT });

            for(let i in getsubjectDetils){
                let id = getsubjectDetils[i].courseID;
                let result= await sequelize.query("select count(coursesubjects.courseID) as totalSubjects from coursesubjects where coursesubjects.coursesubjStatus= 'Active' AND coursesubjects.courseID= "+id,{type: QueryTypes.SELECT});
                getsubjectDetils[i].totalSubjects= result[0].totalSubjects;
            }

           // "SELECT * FROM `users` LEFT JOIN (SELECT courses.courseID,courses.CourseName,courses.courseIcon,HEX(courses.courseColor) FROM courses) ON users.categorylevel1ID = courses.categorylevel1ID AND users.userEntityId = courses.entityID AND users.categorylevel2ID = courses.categorylevel2ID AND  users.categorylevel3ID = courses.categorylevel3ID AND  users.categorylevel4ID = courses.categorylevel4ID  WHERE courses.courseStatus = 'Active' AND courses.courseType='Free' AND users.userID = "+req.user;
            
            getHomeDetils[0]['bannerDetils'] = getbannerDetils;
            getHomeDetils[0]['AdvanceCourse'] = getcoursesDetils;
            getHomeDetils[0]['FreeLibrary'] = getsubjectDetils;

            res.status(200).json({
                status: true,
                message: 'Home list given',
                data: {
                    getHomeDetils
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

exports.liveSessions= async (req, res, next)=>{
    try {
        if(req.user === req.body.loginuserID && req.body.loginuserID!=''){
            const findPlanStatement= " Select * from subscriptionplan INNER JOIN userplan ON subscriptionplan.planID = userplan.planID where userplan.userID= "+req.user;
            var foundPlans= await sequelize.query(findPlanStatement, {type: QueryTypes.SELECT});

            console.log(foundPlans);

            if(foundPlans==0 || foundPlans=='' || foundPlans==[]){
                res.status(200).json({
                    status: true,
                    message: ' No live sessions found'
                });
            }
            else{
                let courseIDS=[];
                for(let i=0;i<foundPlans.length;i++){
                        courseIDS.push(foundPlans[i].courseID);
                }
                let entityID= foundPlans[0].entityID,
                    categorylevel1ID= foundPlans[0].categorylevel1ID,
                    categorylevel2ID= foundPlans[0].categorylevel2ID,
                    categorylevel3ID= foundPlans[0].categorylevel3ID,
                    categorylevel4ID= foundPlans[0].categorylevel4ID;

                var liveSessionsArray=[];
                var founded= find();
                //const result= Sessions();
            
            //function Sessions(){

            //for(let i=0;i<foundPlans.length;i++){
                        // let courseID= foundPlans[i].courseID,
                        // coursesubjID= foundPlans[i].coursesubjID,
                        // entityID= foundPlans[i].entityID,
                        // categorylevel1ID= foundPlans[i].categorylevel1ID,
                        // categorylevel2ID= foundPlans[i].categorylevel2ID,
                        // categorylevel3ID= foundPlans[i].categorylevel3ID,
                        // categorylevel4ID= foundPlans[i].categorylevel4ID;

                   async function find(){
                        let findSessionStatement= " Select * from livesessions where courseID IN ("+courseIDS+") AND categorylevel1ID= "+categorylevel1ID+" AND categorylevel2ID= "+categorylevel2ID+" AND categorylevel3ID= "+categorylevel3ID+" AND categorylevel4ID= "+categorylevel4ID+" AND entityID= "+entityID+" AND liveStatus= 'Active'";
                        let foundSessions= await sequelize.query(findSessionStatement,  {type: QueryTypes.SELECT});

                        // if(foundSessions!=0 && foundSessions.length > 0){
                        //     //console.log(liveSessionsArray);
                        //     if(liveSessionsArray.length==0){
                        //         for(let i=0;i<foundSessions.length;i++){
                        //             liveSessionsArray.push(foundSessions[i]);
                        //         }
                                
                        //     }
                        //     for (let i=0;i< foundSessions.length;i++){
                        //         let present=false;
                        //         for(let j=0;j<liveSessionsArray.length; j++){
                        //             if(foundSessions[i].coursesubjID==liveSessionsArray[j].coursesubjID){
                        //                 present= true;
                        //             }
                        //         }
                        //         if(present==false){
                        //             liveSessionsArray.push(foundSessions[i]);
                        //         }
                        //     }
                        //     //liveSessionsArray.push(foundSessions);
                        // }
                        return Promise.resolve (foundSessions);
                    }

                //var founded= find();
           // }

                founded.then(sessions=>{
                    console.log(sessions);
                    if(sessions.length<=0){
                        res.status(200).json({
                            status: true,
                            message: ' No live sessions found'
                        });
                    }
                    else{
                        res.status(200).json({
                            status: true,
                            message: 'Live sessions given',
                            data: {
                                totalSessions: sessions.length,
                                sessions
                            },
                        });
                    }
                }).catch(e=>console.log("Error occured"));
                //return Promise.resolve (liveSessionsArray);
                
            //}

            }

        }
        else{
            return next(new AppError('Token and userID not in a match',400));
        }
    } catch (err) {
        return next(err);
    }
    
}

exports.homeMessage= async(req, res, next)=>{
    try {
        if(req.user== req.body.loginuserID && req.body.loginuserID!=''){
            const messageType= req.body.messageType;
            const studentDetails= await Users.findOne({
                where:{
                    userID: req.body.loginuserID
                }
            });
            if(!studentDetails){
               return res.status(200).json({
                    status: false,
                    message: 'No details found with provided userID',
                });
            }
            else{
                
                const entityID= studentDetails.userEntityId;
                const categorylevel1ID= studentDetails.categorylevel1ID;
                const categorylevel2ID= studentDetails.categorylevel2ID;
                const categorylevel3ID= studentDetails.categorylevel3ID;
                const categorylevel4ID= studentDetails.categorylevel4ID;

                //console.log(studentDetails.toJSON());
                //console.log(messageType+" "+ categorylevel1ID +" "+categorylevel2ID+" "+categorylevel3ID+" "+categorylevel4ID+" "+entityID);
                if (messageType=='Event'){
                    const statement= "Select * from homemessage where messageType= 'Event' AND entityID= "+entityID+" AND categorylevel1ID= "+categorylevel1ID+" AND categorylevel2ID= "+categorylevel2ID+" AND categorylevel3ID= "+categorylevel3ID+" AND categorylevel4ID= "+categorylevel4ID;
                    const messageDetails= await sequelize.query(statement, {type: QueryTypes.SELECT});
                    if(messageDetails.length>0){
                        return res.status(200).json({
                            status: true,
                            message: 'Home message given',
                            data: messageDetails
                        });
                    }
                    else{
                        return res.status(200).json({
                            status: true,
                            message: 'No data found',
                        });
                    }
                    
                }
                else if(messageType=='News'){
                    const statement= "Select * from homemessage where messageType= 'News' AND entityID= "+entityID+" AND categorylevel1ID= "+categorylevel1ID+" AND categorylevel2ID= "+categorylevel2ID+" AND categorylevel3ID= "+categorylevel3ID+" AND categorylevel4ID= "+categorylevel4ID;
                    const messageDetails= await sequelize.query(statement, {type: QueryTypes.SELECT});
                    if(messageDetails.length>0){
                        return res.status(200).json({
                            status: true,
                            message: 'Home message given',
                            data: messageDetails
                        });
                    }
                    else{
                        return res.status(200).json({
                            status: true,
                            message: 'No data found',
                        });
                    }
                }
                else if(messageType=='Notice'){
                    const statement= "Select * from homemessage where messageType= 'Notice' AND entityID= "+entityID+" AND categorylevel1ID= "+categorylevel1ID+" AND categorylevel2ID= "+categorylevel2ID+" AND categorylevel3ID= "+categorylevel3ID+" AND categorylevel4ID= "+categorylevel4ID;
                    const messageDetails= await sequelize.query(statement, {type: QueryTypes.SELECT});
                    if(messageDetails.length>0){
                        return res.status(200).json({
                            status: true,
                            message: 'Home message given',
                            data: messageDetails
                        });
                    }
                    else{
                        return res.status(200).json({
                            status: true,
                            message: 'No data found',
                        });
                    }
                }
                return res.status(200).json({
                    status: true,
                    message: 'message type was wrong',
                });
            }
        }
        else{
            return next(new AppError('Token and userID not in a match',400));
        }
    } catch (error) {
        return next(error);
    }
}