
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');
const { on } = require('nodemon');
const {userexams}= require("../../models/exams/userexams");
const {Exams}= require("../../models/exams/exams");
const {Questions}= require("../../models/exams/questions");
const {Examresults}= require("../../models/exams/examresults");

exports.getquestion = async (req, res, next) => {
    try {
        if (req.body.loginuserID != "" && req.body.loginuserID != null && req.body.examID != "" && req.body.examID != null && req.body.coursesubjID != "" && req.body.coursesubjID != null && req.body.coursechapterIDs != "" && req.body.coursechapterIDs && req.body.courseID != "" && req.body.courseID) {
            if (req.body.loginuserID == req.user) {
                var findExamStatement= "Select * from exams where examID= "+req.body.examID;
                const foundDetails= await sequelize.query(findExamStatement, {type: QueryTypes.SELECT});
                //console.log(foundDetails[0].examEndDate+" ended "+foundDetails[0].examStartDate)

                var ExamresultsStatement= "Select * from examresults where userID="+req.body.loginuserID+" and examID= "+req.body.examID;
                const allexamresults= await sequelize.query(ExamresultsStatement,{type: QueryTypes.SELECT});
                if(allexamresults.length>=foundDetails[0].examMaxAttempt){
                    return next(new AppError('Exam maximum attempt number reached',400));
                }


                if(foundDetails[0].examQuestionType == 'Manual'){
                    var dateFrom = new Date(foundDetails[0].examStartDate);
                    var dateTo = new Date(foundDetails[0].examEndDate);
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
                        const findingStatement= " select * from examquestions where examID= "+req.body.examID;
                        const foundManuals= await sequelize.query(findingStatement, {type:QueryTypes.SELECT});

                        //console.log(foundManuals);

                        if(foundManuals!=0 || foundManuals!=''){
                            let questionArray=[];
                            for (let i=0;i<foundManuals.length;i++){
                                let queID= foundManuals[i].queID;
                                //console.log(queID);
                                let qstatement= "Select * from questions where queID= "+queID;
                                var ques= await sequelize.query(qstatement,{type: QueryTypes.SELECT});
                                //console.log(ques);
                                questionArray.push(ques[0]);
                            }
                            //console.log(questionArray);
                            if (questionArray.length > 0) {
                                for (let i = 0; i < questionArray.length; i++) {
                            
                                    questionArray[i].queOptions = [
                                    {
                                    "queOption": questionArray[i].queOption1,
                                    "queOptionId": 1
                                    },
                                    {
                                    "queOption": questionArray[i].queOption2,
                                    "queOptionId": 2
                                    },
                                    {
                                    "queOption": questionArray[i].queOption3,
                                    "queOptionId": 3
                                    },
                                    {
                                    "queOption": questionArray[i].queOption4,
                                    "queOptionId": 4
                                    }
                                ];
                                }
                            }
                            else {
                            return next(new AppError('No Data Found', 400));
                            }

                            res.status(200).json({
                                status: true,
                                message: 'Questions given',
                                data: {
                                    TotalQuestions: questionArray.length,
                                    questionArray,
                                },
                            });

                        }
                        else {
                        return next(new AppError('No question found',400));
                        }
   
                    }
                    else {
                        return next(new AppError('Exam expired',400));
                    }
                }
                else{
                        if(foundDetails!=0 && foundDetails!=null && foundDetails!=undefined){
                            var dateFrom = new Date(foundDetails[0].examStartDate);
                            var dateTo = new Date(foundDetails[0].examEndDate);
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
                                var Lavel1 = await lavel1QuestionsGet(req.body.loginuserID, req.body.examID, req.body.entityID, req.body.categorylevel1ID, req.body.categorylevel2ID, req.body.categorylevel3ID, req.body.categorylevel4ID, req.body.coursesubjID, req.body.courseID, req.body.coursechapterIDs);
    
                                var Lavel2 = await lavel2QuestionsGet(req.body.loginuserID, req.body.examID, req.body.entityID, req.body.categorylevel1ID, req.body.categorylevel2ID, req.body.categorylevel3ID, req.body.categorylevel4ID, req.body.coursesubjID, req.body.courseID, req.body.coursechapterIDs);
    
                                var Lavel3 = await lavel3QuestionsGet(req.body.loginuserID, req.body.examID, req.body.entityID, req.body.categorylevel1ID, req.body.categorylevel2ID, req.body.categorylevel3ID, req.body.categorylevel4ID, req.body.coursesubjID, req.body.courseID, req.body.coursechapterIDs);
                                console.log("level1 "+Lavel1+" level2 "+ Lavel2+" Level3 "+Lavel3);
                                if (Lavel1 != "" && Lavel1 != null && Lavel2 != "" && Lavel2 != null && Lavel3 != "" && Lavel3 != null) {
                                var Getquestion = Lavel1.concat(Lavel2, Lavel3);
                                console.log("question "+Getquestion);
                            // var Getquestion= Level1;
                                if (Getquestion.length > 0) {
                                    for (let i = 0; i < Getquestion.length; i++) {
                                
                                        Getquestion[i].queOptions = [
                                        {
                                        "queOption": Getquestion[i].queOption1,
                                        "queOptionId": 1
                                        },
                                        {
                                        "queOption": Getquestion[i].queOption2,
                                        "queOptionId": 2
                                        },
                                        {
                                        "queOption": Getquestion[i].queOption3,
                                        "queOptionId": 3
                                        },
                                        {
                                        "queOption": Getquestion[i].queOption4,
                                        "queOptionId": 4
                                        }
                                    ];
                                    }
                                }
                            else {
                            return next(new AppError('No Data Found', 400));
                            }
    
                            res.status(200).json({
                            status: true,
                            message: 'Questions given',
                            data: {
                                TotalQuestions: Getquestion.length,
                                Getquestion,
                            },
                            });
                        }
                        else {
    
                         return next(new AppError('There is no question of this exam available.', 400));
                         }
                    
                        }
                        else{
                            return next( new AppError("Exam expired",400));
                        }
                    }
                
                    else{
                        return next(new AppError("Exam not found",400));
                    }
                    }
                    // else {
                    // return next(new AppError('Token and userId not a match', 400));
                    // }
                }
                    else {
                     return next(new AppError('Token and userID not in a match', 400));
                    }
                
            }
            else{
                return next(new AppError('Required parameter is missing', 400));
            }
           
    }
    catch (error) {
        return next(error);
    }

}


async function lavel1QuestionsGet(loginuserID, examID, entityID, categorylevel1ID, categorylevel2ID, categorylevel3ID, categorylevel4ID, coursesubjID, courseID, coursechapterIDs) {
    //Leave 1 ============================================================================

  try{
        
    var finalResult=[];
    var statement2 = "SELECT examQsL1 FROM exams WHERE examID = " + examID

    var object2 = await sequelize.query(statement2, { type: QueryTypes.SELECT });

    var leave1 = object2[0].examQsL1;
    //console.log("qi "+leave1);

    var str_arry = coursechapterIDs.split(",").map(String);

    var arrayofTaskId = str_arry;

    var fresh = [];

    var ExamresultsStatement= "Select * from examresults where userID="+loginuserID+" and examID= "+examID;
    const allexamresults= await sequelize.query(ExamresultsStatement,{type: QueryTypes.SELECT});

    if(allexamresults.length==0 || allexamresults===undefined || allexamresults===null){
        var findQuestionStatement="Select * from questions where entityID= "+entityID+" AND categorylevel1ID= "+categorylevel1ID+" AND categorylevel2ID= "+categorylevel2ID+" AND categorylevel3ID= "+categorylevel3ID+" AND categorylevel4ID= "+categorylevel4ID+" AND courseID= "+courseID+" AND coursesubjID="+coursesubjID+" AND queStatus= 'Active' AND queDifficultyevel= 1 AND coursechapterID IN (" + arrayofTaskId + ") GROUP BY questions.queID";
        const foundQuestions= await sequelize.query(findQuestionStatement,{type: QueryTypes.SELECT});
        if (leave1 <= foundQuestions.length) {
                            //console.log("hi3");
            if (leave1 == foundQuestions.length) {
                return foundQuestions;
                                
            }
            else{
                    var fersherwithnoLavel1 = foundQuestions.slice(0, leave1)
                    console.log(" End "+fersherwithnoLavel1);
                    
                    return fersherwithnoLavel1;
                }
        }
    }
    else{
        var examStatement= "Select examMaxAttempt from exams where examID="+examID;
        var examStatement1 = await sequelize.query(examStatement, { type: QueryTypes.SELECT });
        //console.log("max attempt= "+examStatement1[0].examMaxAttempt);
        if(allexamresults.length>=examStatement1[0].examMaxAttempt){
           return next(new AppError('Exam maximum attempt number reached',400));
        }
    
                    userexams.findAll({
                            attributes:['queID'],
                             where:{
                             userID: loginuserID
                            }
                     }).then(questionIDs=>{
                    //console.log(questionIDs.dataValues.queID);
                    let queids=[];
                    for (let index=0;index<questionIDs.length;index++){
                        queids[index]=questionIDs[index].queID;
                    }
                     Questions.findAll({
                        where:{
                            queID:{ [Op.notIn]:queids},
                            entityID: entityID,
                            categorylevel1ID: categorylevel1ID,
                            categorylevel2ID:categorylevel2ID,
                            categorylevel3ID: categorylevel3ID,
                            categorylevel4ID: categorylevel4ID,
                            courseID: courseID,
                            coursesubjID: coursesubjID,
                            coursechapterID: {
                                [Op.in]: arrayofTaskId
                            },
                            queStatus: 'Active',
                            queDifficultyevel: 1
                        }
                    }).then(object=>{
                        //console.log("quest "+JSON.stringify(object));
                        object.forEach(element => {
                            fresh.push(element.queID)
                        });
                        //console.log("statement executed")
                    })
                }).catch(e=>console.log("Error occured"));
            
  
                 const statment1 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE questions.entityID = " + entityID + " AND questions.categorylevel1ID = " + categorylevel1ID + " AND questions.categorylevel2ID = " + categorylevel2ID + " AND questions.categorylevel3ID = " + categorylevel3ID + " AND questions.categorylevel4ID = " + categorylevel4ID + " AND questions.coursesubjID = " + coursesubjID + " AND questions.courseID = " + courseID + " AND questions.queStatus ='Active' AND questions.queDifficultyevel = 1 AND userexams.userexamSkipped ='Yes' AND questions.coursechapterID IN (" + arrayofTaskId + ") GROUP BY questions.queID";
            
                 var object1 = await sequelize.query(statment1, { type: QueryTypes.SELECT });
                
            
                 var skipqustions = [];
            
                object1.forEach(element => {
                    skipqustions.push(element.queID)
                });
                //console.log("obj1 "+skipqustions);
                const statment2 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE userexams.userexamSkipped ='No' AND questions.queDifficultyevel = 1 AND userexams.userID = " + loginuserID + " GROUP BY userexams.queID";
            
                var object2 = await sequelize.query(statment2, { type: QueryTypes.SELECT });
               
                var GetID = [];
            
                for (let i = 0; i < object2.length; i++) {
                    const statment = "SELECT * FROM questions WHERE queID = " + object2[i].queID + " AND queCorrectAns = " + object2[i].userexamAnswer
            
                    var object = await sequelize.query(statment, { type: QueryTypes.SELECT });
            
                    if (object.length <= 0) {
                        GetID.push(object2[i].queID)
                    }
                }
            
                //console.log("obj2 "+GetID);
                var contect = fresh.concat(skipqustions, GetID);
                var uniqueArray = [];
            
                //console.log("Fresh "+contect);
                for (i = 0; i < contect.length; i++) {
                    if (uniqueArray.indexOf(contect[i]) === -1) {
                        uniqueArray.push(contect[i]);
                    }
                }
            
                const str_arry2 = uniqueArray.toString();
                // " + str_arry2 + "
                const statement4 = "SELECT * FROM questions WHERE queID IN (" + str_arry2 + ")";
                const object4 = await sequelize.query(statement4, { type: QueryTypes.SELECT });
                
                console.log("str- ar "+object4.length);
                if (leave1 <= object4.length) {
                    //console.log("hi3");
                    if (leave1 == object4.length) {
                        return object4;   
                    }
                    else{
                    var fersherwithnoLavel1 = object4.slice(0, leave1);
                    return fersherwithnoLavel1;
                    }
                }
    }
} catch(error) {
    console.log("Error catched");
    return 0;
}

}

async function lavel2QuestionsGet(loginuserID, examID, entityID, categorylevel1ID, categorylevel2ID, categorylevel3ID, categorylevel4ID, coursesubjID, courseID, coursechapterIDs) {
    //Leave 2 ============================================================================
try {
    

    var statement2 = "SELECT examQsL2  FROM exams WHERE examID = " + examID

    var object2 = await sequelize.query(statement2, { type: QueryTypes.SELECT });

    var leave2 = object2[0].examQsL2;

    var str_arry = coursechapterIDs.split(",").map(String);

    var arrayofTaskId = str_arry
    var fresh = [];

    //const statement = "SELECT * FROM questions WHERE queID NOT IN (SELECT queID FROM userexams WHERE userID = " + loginuserID + ") AND entityID = " + entityID + " AND categorylevel1ID = " + categorylevel1ID + " AND categorylevel2ID = " + categorylevel2ID + " AND categorylevel3ID = " + categorylevel3ID + " AND categorylevel4ID = " + categorylevel4ID + " AND coursesubjID = " + coursesubjID + " AND courseID = " + courseID + " AND queStatus = 'Active' AND queDifficultyevel = 2 AND coursechapterID IN (" + arrayofTaskId + ")";

    //var object = await sequelize.query(statement, { type: QueryTypes.SELECT });
    var ExamresultsStatement= "Select * from examresults where userID="+loginuserID+" and examID= "+examID;
    const allexamresults= await sequelize.query(ExamresultsStatement,{type: QueryTypes.SELECT});


    if(allexamresults.length==0 || allexamresults===undefined || allexamresults===null){
        var findQuestionStatement="Select * from questions where entityID= "+entityID+" AND categorylevel1ID= "+categorylevel1ID+" AND categorylevel2ID= "+categorylevel2ID+" AND categorylevel3ID= "+categorylevel3ID+" AND categorylevel4ID= "+categorylevel4ID+" AND courseID= "+courseID+" AND coursesubjID="+coursesubjID+" AND queStatus= 'Active' AND queDifficultyevel= 2 AND coursechapterID IN (" + arrayofTaskId + ") GROUP BY questions.queID";
        const foundQuestions= await sequelize.query(findQuestionStatement,{type: QueryTypes.SELECT});
        if (leave2 <= foundQuestions.length) {
                            //console.log("hi3");
            if (leave2 == foundQuestions.length) {
                return foundQuestions;
                                
            }
            else{
                    var fersherwithnoLavel2 = foundQuestions.slice(0, leave2);
                    return fersherwithnoLavel2;
                }
        }
    }
    else{
        var examStatement= "Select examMaxAttempt from exams where examID="+examID;
        var examStatement1 = await sequelize.query(examStatement, { type: QueryTypes.SELECT });
        //console.log("max attempt= "+examStatement1[0].examMaxAttempt);
        if(allexamresults.length>=examStatement1[0].examMaxAttempt){
           return next(new AppError('Exam max attempt number reached',400));
        }
        
                    userexams.findAll({
                            attributes:['queID'],
                             where:{
                             userID: loginuserID
                            }
                     }).then(questionIDs=>{
                    //console.log(questionIDs.dataValues.queID);
                    let queids=[];
                    for (let index=0;index<questionIDs.length;index++){
                        queids[index]=questionIDs[index].queID;
                    }
                     Questions.findAll({
                        where:{
                            queID:{ [Op.notIn]:queids},
                            entityID: entityID,
                            categorylevel1ID: categorylevel1ID,
                            categorylevel2ID:categorylevel2ID,
                            categorylevel3ID: categorylevel3ID,
                            categorylevel4ID: categorylevel4ID,
                            courseID: courseID,
                            coursesubjID: coursesubjID,
                            coursechapterID: {
                                [Op.in]: arrayofTaskId
                            },
                            queStatus: 'Active',
                            queDifficultyevel: 2
                        }
                    }).then(object=>{
                        console.log("quest "+JSON.stringify(object));
                        object.forEach(element => {
                            fresh.push(element.queID)
                        });
                        console.log("statement1 executed")
                    })
                }).catch(e=>console.log("Error occured"));
            
  
                 const statment1 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE questions.entityID = " + entityID + " AND questions.categorylevel1ID = " + categorylevel1ID + " AND questions.categorylevel2ID = " + categorylevel2ID + " AND questions.categorylevel3ID = " + categorylevel3ID + " AND questions.categorylevel4ID = " + categorylevel4ID + " AND questions.coursesubjID = " + coursesubjID + " AND questions.courseID = " + courseID + " AND questions.queStatus ='Active' AND questions.queDifficultyevel = 2 AND userexams.userexamSkipped ='Yes' AND questions.coursechapterID IN (" + arrayofTaskId + ") GROUP BY questions.queID";
            
                 var object1 = await sequelize.query(statment1, { type: QueryTypes.SELECT });
                
            
                 var skipqustions = [];
            
                object1.forEach(element => {
                    skipqustions.push(element.queID)
                });
                //console.log("obj1 "+skipqustions);
                const statment2 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE userexams.userexamSkipped ='No' AND questions.queDifficultyevel = 2 AND userexams.userID = " + loginuserID + " GROUP BY userexams.queID";
            
                var object2 = await sequelize.query(statment2, { type: QueryTypes.SELECT });
               
                var GetID = [];
            
                for (let i = 0; i < object2.length; i++) {
                    const statment = "SELECT * FROM questions WHERE queID = " + object2[i].queID + " AND queCorrectAns = " + object2[i].userexamAnswer
            
                    var object = await sequelize.query(statment, { type: QueryTypes.SELECT });
            
                    if (object.length <= 0) {
                        GetID.push(object2[i].queID)
                    }
                }
            
                //console.log("obj2 "+GetID);
                var contect = fresh.concat(skipqustions, GetID);
                var uniqueArray = [];
            
                //console.log("Fresh "+contect);
                for (i = 0; i < contect.length; i++) {
                    if (uniqueArray.indexOf(contect[i]) === -1) {
                        uniqueArray.push(contect[i]);
                    }
                }
            
                const str_arry2 = uniqueArray.toString();
                // " + str_arry2 + "
                const statement4 = "SELECT * FROM questions WHERE queID IN (" + str_arry2 + ")";
                const object4 = await sequelize.query(statement4, { type: QueryTypes.SELECT });
                
                //console.log("str- ar "+object4.length);
                if (leave2 <= object4.length) {
                    //console.log("hi3");
                    if (leave2 == object4.length) {
                        return object4;   
                    }
                    else{
                    var fersherwithnoLavel2 = object4.slice(0, leave2);
                    return fersherwithnoLavel2;
                    }
                }
        
    }

    // var fresh = [];
    // userexams.findAll({
    //     attributes:['queID'],
    //     where:{
    //         userID: loginuserID
    //     }
    // }).then(questionIDs=>{
    //     let queids=[];
    //     for (let index=0;index<questionIDs.length;index++){
    //         queids[index]=questionIDs[index].queID;
    //     }
    //      Questions.findAll({
    //         where:{
    //             queID:{ [Op.notIn]:queids},
    //             entityID: entityID,
    //             categorylevel1ID: categorylevel1ID,
    //             categorylevel2ID:categorylevel2ID,
    //             categorylevel3ID: categorylevel3ID,
    //             categorylevel4ID: categorylevel4ID,
    //             courseID: courseID,
    //             coursesubjID: coursesubjID,
    //             coursechapterID: {
    //                 [Op.in]: arrayofTaskId
    //             },
    //             queStatus: 'Active',
    //             queDifficultyevel: 2
    //         }
    //     }).then(object=>{
    //        // console.log(object);
    //         object.forEach(element => {
    //             fresh.push(element.queID)
    //         });
    //         console.log("statement1 executed")
    //     })
    // }).catch(e=>console.log("Error occured"));

    // // object.forEach(element => {
    // //     fresh.push(element.queID)
    // // });

    // //const statment1 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE questions.entityID = " + entityID + " AND questions.categorylevel1ID = " + categorylevel1ID + " AND questions.categorylevel2ID = " + categorylevel2ID + " AND questions.categorylevel3ID = " + categorylevel3ID + " AND questions.categorylevel4ID = " + categorylevel4ID + " AND questions.coursesubjID = " + coursesubjID + " AND questions.courseID = " + courseID + " AND questions.queStatus ='Active' AND questions.queDifficultyevel = 1 AND userexams.userexamSkipped ='Yes' AND questions.coursechapterID IN (" + arrayofTaskId + ") GROUP BY questions.queID";

    // const statment1 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE questions.entityID = " + entityID + " AND questions.categorylevel1ID = " + categorylevel1ID + " AND questions.categorylevel2ID = " + categorylevel2ID + " AND questions.categorylevel3ID = " + categorylevel3ID + " AND questions.categorylevel4ID = " + categorylevel4ID + " AND questions.coursesubjID = " + coursesubjID + " AND questions.courseID = " + courseID + " AND questions.queStatus ='Active' AND questions.queDifficultyevel = 2 AND userexams.userexamSkipped ='Yes' AND questions.coursechapterID IN (" + arrayofTaskId + ") GROUP BY questions.queID";

    // var object1 = await sequelize.query(statment1, { type: QueryTypes.SELECT });

    // var skipqustions = [];

    // object1.forEach(element => {
    //     skipqustions.push(element.queID)
    // });

    // //const statment2 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE userexams.userexamSkipped ='No' AND questions.queDifficultyevel = 1 AND userexams.userID = " + loginuserID + " GROUP BY userexams.queID";

    // const statment2 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE userexams.userexamSkipped ='No' AND questions.queDifficultyevel = 2 AND userexams.userID = " + loginuserID + " GROUP BY  userexams.queID";

    // var object2 = await sequelize.query(statment2, { type: QueryTypes.SELECT });

    // var GetID = [];

    // for (let i = 0; i < object2.length; i++) {
    //     const statment = "SELECT * FROM questions WHERE queID = " + object2[i].queID + " AND queCorrectAns = " + object2[i].userexamAnswer;

    //     var object = await sequelize.query(statment, { type: QueryTypes.SELECT });

    //     if (object.length <= 0) {
    //         GetID.push(object2[i].queID)
    //     }
    // }

    // var contect = fresh.concat(skipqustions, GetID);
    // var uniqueArray = [];


    // for (i = 0; i < contect.length; i++) {
    //     if (uniqueArray.indexOf(contect[i]) === -1) {
    //         uniqueArray.push(contect[i]);
    //     }
    // }

    // const str_arry2 = uniqueArray.toString();

    // const statement4 = "SELECT * FROM questions WHERE queID IN (" + str_arry2 + ")";
    // const object4 = await sequelize.query(statement4, { type: QueryTypes.SELECT });


    // if (leave2 <= object4.length) {
    //     if (leave2 == object4.length) {
    //         return object4;
    //     }
    //     var fersherwithnoLavel2 = object4.slice(0, leave2)
    //     return fersherwithnoLavel2;
    // }

} catch (error) {
    return 0;
}

}

async function lavel3QuestionsGet(loginuserID, examID, entityID, categorylevel1ID, categorylevel2ID, categorylevel3ID, categorylevel4ID, coursesubjID, courseID, coursechapterIDs) {
    //Leave 3 ============================================================================
try {
    

    var statement2 = "SELECT examQsL3  FROM exams WHERE examID = " + examID;

    var object2 = await sequelize.query(statement2, { type: QueryTypes.SELECT });

    var leave3 = object2[0].examQsL3;

    var str_arry = coursechapterIDs.split(",").map(String);

    var arrayofTaskId = str_arry;
    console.log("Task id "+arrayofTaskId);
    var fresh = [];

    //const statement = "SELECT * FROM questions WHERE queID NOT IN (SELECT queID FROM userexams WHERE userID = " + loginuserID + ") AND entityID = " + entityID + " AND categorylevel1ID = " + categorylevel1ID + " AND categorylevel2ID = " + categorylevel2ID + " AND categorylevel3ID = " + categorylevel3ID + " AND categorylevel4ID = " + categorylevel4ID + " AND coursesubjID = " + coursesubjID + " AND courseID = " + courseID + " AND queStatus = 'Active' AND queDifficultyevel = 3 AND coursechapterID IN (" + arrayofTaskId + ")";

    //var object = await sequelize.query(statement, { type: QueryTypes.SELECT });


    var ExamresultsStatement= "Select * from examresults where userID="+loginuserID+" and examID= "+examID;
    const allexamresults= await sequelize.query(ExamresultsStatement,{type: QueryTypes.SELECT});


    if(allexamresults.length==0 || allexamresults===undefined || allexamresults===null){
        var findQuestionStatement="Select * from questions where entityID= "+entityID+" AND categorylevel1ID= "+categorylevel1ID+" AND categorylevel2ID= "+categorylevel2ID+" AND categorylevel3ID= "+categorylevel3ID+" AND categorylevel4ID= "+categorylevel4ID+" AND courseID= "+courseID+" AND coursesubjID="+coursesubjID+" AND queStatus= 'Active' AND queDifficultyevel= 3 AND coursechapterID IN (" + arrayofTaskId + ") GROUP BY questions.queID";
        const foundQuestions= await sequelize.query(findQuestionStatement,{type: QueryTypes.SELECT});
        if (leave3 <= foundQuestions.length) {
                            //console.log("hi3");
            if (leave3 == foundQuestions.length) {
                return foundQuestions;
                                
            }
            else{
                    var fersherwithnoLavel3 = foundQuestions.slice(0, leave3);
                    return fersherwithnoLavel3;
                }
        }
    }
    else{
        var examStatement= "Select examMaxAttempt from exams where examID="+examID;
        var examStatement1 = await sequelize.query(examStatement, { type: QueryTypes.SELECT });
        console.log("max attempt= "+examStatement1[0].examMaxAttempt);
        console.log("Attempt done "+allexamresults.length);
        if(allexamresults.length>=examStatement1[0].examMaxAttempt){
           return next(new AppError('Exam max attempt number reached',400));
        }
        
                    userexams.findAll({
                            attributes:['queID'],
                             where:{
                             userID: loginuserID
                            }
                     }).then(questionIDs=>{
                    console.log(questionIDs[0].queID);
                    let queids=[];
                    for (let index=0;index<questionIDs.length;index++){
                        queids[index]=questionIDs[index].queID;
                    }
                     Questions.findAll({
                        where:{
                            queID:{ [Op.notIn]:queids},
                            entityID: entityID,
                            categorylevel1ID: categorylevel1ID,
                            categorylevel2ID:categorylevel2ID,
                            categorylevel3ID: categorylevel3ID,
                            categorylevel4ID: categorylevel4ID,
                            courseID: courseID,
                            coursesubjID: coursesubjID,
                            coursechapterID: {
                                [Op.in]: arrayofTaskId
                            },
                            queStatus: 'Active',
                            queDifficultyevel: 3
                        }
                    }).then(object=>{
                        console.log("quest "+JSON.stringify(object));
                        object.forEach(element => {
                            fresh.push(element.queID)
                        });
                        console.log("statement2 executed")
                    })
                }).catch(e=>console.log("Error occured"));
            
  
                 const statment1 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE questions.entityID = " + entityID + " AND questions.categorylevel1ID = " + categorylevel1ID + " AND questions.categorylevel2ID = " + categorylevel2ID + " AND questions.categorylevel3ID = " + categorylevel3ID + " AND questions.categorylevel4ID = " + categorylevel4ID + " AND questions.coursesubjID = " + coursesubjID + " AND questions.courseID = " + courseID + " AND questions.queStatus ='Active' AND questions.queDifficultyevel = 3 AND userexams.userexamSkipped ='Yes' AND questions.coursechapterID IN (" + arrayofTaskId + ") GROUP BY questions.queID";
            
                 var object1 = await sequelize.query(statment1, { type: QueryTypes.SELECT });
                
            
                 var skipqustions = [];
            
                object1.forEach(element => {
                    skipqustions.push(element.queID)
                });
                //console.log("obj1 "+skipqustions);
                const statment2 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE userexams.userexamSkipped ='No' AND questions.queDifficultyevel = 3 AND userexams.userID = " + loginuserID + " GROUP BY userexams.queID";
            
                var object2 = await sequelize.query(statment2, { type: QueryTypes.SELECT });
               
                var GetID = [];
            
                for (let i = 0; i < object2.length; i++) {
                    const statment = "SELECT * FROM questions WHERE queID = " + object2[i].queID + " AND queCorrectAns = " + object2[i].userexamAnswer
            
                    var object = await sequelize.query(statment, { type: QueryTypes.SELECT });
            
                    if (object.length <= 0) {
                        GetID.push(object2[i].queID)
                    }
                }
            
                //console.log("obj2 "+GetID);
                var contect = fresh.concat(skipqustions, GetID);
                var uniqueArray = [];
            
                //console.log("Fresh "+contect);
                for (i = 0; i < contect.length; i++) {
                    if (uniqueArray.indexOf(contect[i]) === -1) {
                        uniqueArray.push(contect[i]);
                    }
                }
            
                const str_arry2 = uniqueArray.toString();
                // " + str_arry2 + "
                const statement4 = "SELECT * FROM questions WHERE queID IN (" + str_arry2 + ")";
                const object4 = await sequelize.query(statement4, { type: QueryTypes.SELECT });
                
                //console.log("str- ar "+object4.length);
                if (leave3 <= object4.length) {
                    //console.log("hi3");
                    if (leave3 == object4.length) {
                        return object4;   
                    }
                    else{
                    var fersherwithnoLavel3 = object4.slice(0, leave3);
                    return fersherwithnoLavel3;
                    }
                }
        
    }


    // var fresh = [];
    // userexams.findAll({
    //     attributes:['queID'],
    //     where:{
    //         userID: loginuserID
    //     }
    // }).then(questionIDs=>{
    //     let queids=[];
    //     for (let index=0;index<questionIDs.length;index++){
    //         queids[index]=questionIDs[index].queID;
    //     }
    //      Questions.findAll({
    //         where:{
    //             queID:{ [Op.notIn]:queids},
    //             entityID: entityID,
    //             categorylevel1ID: categorylevel1ID,
    //             categorylevel2ID:categorylevel2ID,
    //             categorylevel3ID: categorylevel3ID,
    //             categorylevel4ID: categorylevel4ID,
    //             courseID: courseID,
    //             coursesubjID: coursesubjID,
    //             coursechapterID: {
    //                 [Op.in]: arrayofTaskId
    //             },
    //             queStatus: 'Active',
    //             queDifficultyevel: 3
    //         }
    //     }).then(object=>{
    //        // console.log(object);
    //         object.forEach(element => {
    //             fresh.push(element.queID)
    //         });
    //         console.log("statement2 executed")
    //     })
    // }).catch(e=>console.log("Error occured"));

    // // object.forEach(element => {
    // //     fresh.push(element.queID)
    // // });

    // const statment1 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE questions.entityID = " + entityID + " AND questions.categorylevel1ID = " + categorylevel1ID + " AND questions.categorylevel2ID = " + categorylevel2ID + " AND questions.categorylevel3ID = " + categorylevel3ID + " AND questions.categorylevel4ID = " + categorylevel4ID + " AND questions.coursesubjID = " + coursesubjID + " AND questions.courseID = " + courseID + " AND questions.queStatus ='Active' AND questions.queDifficultyevel = 3 AND userexams.userexamSkipped ='Yes' AND questions.coursechapterID IN (" + arrayofTaskId + ") GROUP BY questions.queID";

    // var object1 = await sequelize.query(statment1, { type: QueryTypes.SELECT });

    // var skipqustions = [];

    // object1.forEach(element => {
    //     skipqustions.push(element.queID)
    // });

    // const statment2 = "SELECT * FROM questions INNER JOIN userexams ON questions.queID = userexams.queID WHERE userexams.userexamSkipped ='No' AND questions.queDifficultyevel = 3 AND userexams.userID = " + loginuserID + " GROUP BY  userexams.queID";

    // var object2 = await sequelize.query(statment2, { type: QueryTypes.SELECT });

    // var GetID = [];

    // for (let i = 0; i < object2.length; i++) {
    //     const statment = "SELECT * FROM questions WHERE queID = " + object2[i].queID + " AND queCorrectAns = " + object2[i].userexamAnswer;

    //     var object = await sequelize.query(statment, { type: QueryTypes.SELECT });

    //     if (object.length <= 0) {
    //         GetID.push(object2[i].queID)
    //     }
    // }

    // var contect = fresh.concat(skipqustions, GetID);
    // var uniqueArray = [];


    // for (i = 0; i < contect.length; i++) {
    //     if (uniqueArray.indexOf(contect[i]) === -1) {
    //         uniqueArray.push(contect[i]);
    //     }
    // }

    // const str_arry2 = uniqueArray.toString();

    // const statement4 = "SELECT * FROM questions WHERE queID IN (" + str_arry2 + ")";
    // const object4 = await sequelize.query(statement4, { type: QueryTypes.SELECT });


    // if (leave3 <= object4.length) {
    //     if (leave3 == object4.length) {
    //         return object4;
    //     }
    //     var fersherwithnoLavel3 = object4.slice(0, leave3)
    //     return fersherwithnoLavel3;
    // }
} catch (error) {
    return 0;
}
}


function GetFormattedDate(date) {
    var b = (date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    var a = (date.getDate() > 9) ? date.getDate() : ('0' + date.getDate());
    var c = date.getFullYear();

    var d = a + '/' + b + '/' + c;
    return d;
}