
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');
const { on } = require('nodemon');
const {userexams}= require("../../models/exams/userexams");
const {Questions}= require("../../models/exams/questions");

// this router gives us all the entities from database
exports.userexams = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            if (req.body.examID != '' && req.body.examID != null) 
            {

                var ExamresultsStatement= "Select * from examresults where userID="+req.body.loginuserID+" and examID= "+req.body.examID;
                const allexamresults= await sequelize.query(ExamresultsStatement,{type: QueryTypes.SELECT});

                var examStatement= "Select examMaxAttempt from exams where examID="+req.body.examID;
                var examStatement1 = await sequelize.query(examStatement, { type: QueryTypes.SELECT });
                const uniqueNumber = uniqueNumberGanrates();
                if(allexamresults.length>=examStatement1[0].examMaxAttempt){
                    return next(new AppError("Exam maximum attempt number reached",400));
                }

                const statement1 = "SELECT * FROM `exams` WHERE examID = " + req.body.examID;

                const object1 = await sequelize.query(statement1, { type: QueryTypes.SELECT });

                const TotalQuestions = object1[0].examTotalQs;
                const examQualifyingMarks = object1[0].examQualifyingMarks;
                const examCorrectAnswer = object1[0].examCorrectAnswer;
                const examWrongAnswer = object1[0].examWrongAnswer;
                const examColor = object1[0].examColor;
                let examID= object1[0].examID;

                if((req.body.queID=='' || req.body.queID== null) && (req.body.userexamAnswer=='' || req.body.userexamAnswer==null)){
                    let statement = "INSERT INTO `userexams`(`examID`, `userID`, `queID`,`uniqueNumber`,`userexamSkipped`) VALUES (" + req.body.examID + "," + req.body.loginuserID + "," + 0 + ","+uniqueNumber+", 'Yes')";
                       
                    await sequelize.query(statement,{type: QueryTypes.INSERT});

                    const statment = "INSERT INTO `examresults`( `examID`, `userID`,`uniqueNumber`,`TotalQuestions`, `AttendedQuestions`, `CorrectAnswer`, `WrongAnswer`, `RewardPoints`, `userPercentage` , `examColor`, `userexamStatus`) VALUES (" + req.body.examID + "," + req.body.loginuserID + ",'"+uniqueNumber+"'," + TotalQuestions + "," + 0 + "," + 0 + "," + 0 + "," + 0 + "," + 0 + ",'" + examColor + "','Fail')";
                        const object2 = await sequelize.query(statment, { type: QueryTypes.INSERT }).then(
                            id => {
                                const statement = "UPDATE `userexams` SET `resultsID`= "+id[0]+" WHERE userID = "+req.body.loginuserID+" AND uniqueNumber = "+uniqueNumber+" AND queID IN ("+0+")";
                                 sequelize.query(statement, { type: QueryTypes.UPDATE });
                            }
                        );

                        const statment3 = "SELECT * FROM `examresults` WHERE userID = "+req.body.loginuserID+" AND uniqueNumber = '"+uniqueNumber+"'";
                        const getusersexams = await sequelize.query(statment3, { type: QueryTypes.SELECT });
                            
                        res.status(200).json({
                            status: true,
                            message: 'Users Result given',
                            data: {
                                getusersexams
                            },
                        });
                }
                const queID = req.body.queID.split(",");
                const userexamAnswer = req.body.userexamAnswer.split(",");
                
                var answerIDs=[], count=0;
                var quesArray=[];
                var qObj={};
                for (let index = 0; index < queID.length; index++)                              
                {
                    const num1 = queID[index];
                    const num2 = userexamAnswer[index];

                    if (num2 == 0) {
                        let statement = "INSERT INTO `userexams`(`examID`, `userID`, `queID`,`uniqueNumber`,`userexamSkipped`) VALUES (" + req.body.examID + "," + req.body.loginuserID + "," + num1 + ","+uniqueNumber+", 'Yes')";
                       
                        await sequelize.query(statement,{type: QueryTypes.INSERT});
                    }
                    else {
                        let option= "queOption"+num2+"";
                        var userAnswer= "Select "+option+" from questions where queID = "+num1;
                        let [Answer]= await sequelize.query(userAnswer, {type:QueryTypes.SELECT});
                        let [A]=Object.values(Answer);
                        answerIDs.push(A);
                        console.log(A);
                        //console.log(typeof A);

                            qObj.ques=num1;
                            qObj.ans=A;

                            quesArray.push(qObj);
                            qObj={};
                        
                        // let statement = "INSERT INTO `userexams`(`examID`, `userID`, `queID`,`uniqueNumber`,`userexamAnswer`) VALUES (" + req.body.examID + "," + req.body.loginuserID + "," + num1 + ","+uniqueNumber+"," + A + ")";
                        // await sequelize.query(statement, {type: QueryTypes.INSERT});

                        let temp={
                            examID: req.body.examID,
                            userID: req.body.loginuserID,
                            queID: num1,
                            uniqueNumber: uniqueNumber,
                            userexamAnswer: A
                        }
                        userexams.create(temp).then(d=>console.log("created")).catch(e=>console.log("not inserted"));
                        console.log("Early or late ?");
                        // count++;
                        // console.log(answerIDs);
                    }
                }
                //});
                
                

                // const statement2 = "SELECT * FROM userexams WHERE examID = " + req.body.examID + " AND userID = " + req.body.loginuserID +" AND uniqueNumber = "+uniqueNumber;

                // const object3 = await sequelize.query(statement2, { type: QueryTypes.SELECT });
                // console.log("object3 "+object3);
                console.log('Questions ids are: '+queID);

                var CorrectAnswer = [];
                var WrongAnswer = [];
                var AttendedQuestions = [];
                Questions.findAll({
                    where:{
                        queID:{
                            [Op.in]: queID
                        }
                    }
                }).then(async allQuestions=>{
                    //console.log(answerIDs);
                    console.log(quesArray);
                    for(let i=0;i<allQuestions.length;i++){
                        for(let j=0;j<quesArray.length;j++){
                            if(allQuestions[i].queID==quesArray[j].ques){
                                AttendedQuestions.push(count+1);

                                count++
                                console.log("Q "+quesArray[j].ques);
                                console.log("R "+allQuestions[i].queCorrectAns)
                                console.log("G "+quesArray[j].ans)
                                if(allQuestions[i].queCorrectAns==quesArray[j].ans){
                                    CorrectAnswer.push(count+1)
                                }
                                else{
                                    WrongAnswer.push(count+1);
                                
                                }
                            }
                        }
                        
                    }
                    console.log("att "+AttendedQuestions.length);
                    console.log("acor "+CorrectAnswer.length);
                    console.log("wro "+WrongAnswer.length);
                let Total = CorrectAnswer.length * examCorrectAnswer;
                let Total1 = WrongAnswer.length * examWrongAnswer;
                const sumtotal = Total + Total1;
                const TotalMarks = examCorrectAnswer * TotalQuestions;
                const RewardPoints = CorrectAnswer.length * process.env.REWARD_POINT;
                console.log("Total "+sumtotal);

                if (sumtotal > 0) 
                {
                    if (sumtotal >= examQualifyingMarks) {
                       
                        
                        var percentage = parseFloat(parseFloat(sumtotal)*parseFloat(100)) / parseFloat(TotalMarks);
                        //percentage= percentage.toFixed(2);

                        const statment = "INSERT INTO `examresults`( `examID`, `userID`,`uniqueNumber`,`TotalQuestions`, `AttendedQuestions`, `CorrectAnswer`, `WrongAnswer`, `RewardPoints`, `userPercentage`, `examColor`, `userexamStatus`) VALUES (" + req.body.examID + "," + req.body.loginuserID + ",'"+uniqueNumber+"'," + TotalQuestions + "," + AttendedQuestions.length + "," + CorrectAnswer.length + "," + WrongAnswer.length + "," + RewardPoints + "," +percentage+ ",'" + examColor + "','Pass')";
                        const object2 = await sequelize.query(statment, { type: QueryTypes.INSERT }).then(
                         id => {
                            const statement = "UPDATE `userexams` SET `resultsID`= "+id[0]+" WHERE userID = "+req.body.loginuserID+" AND uniqueNumber = "+uniqueNumber+" AND queID IN ("+req.body.queID+")";
                                sequelize.query(statement, { type: QueryTypes.UPDATE });
                            }
                        );
                    }
                    else {
                        var percentage = parseFloat(parseFloat(sumtotal)*parseFloat(100)) / parseFloat(TotalMarks);
                        //percentage= percentage.toFixed(2);

                        const statment = "INSERT INTO `examresults`( `examID`, `userID`,`uniqueNumber`,`TotalQuestions`, `AttendedQuestions`, `CorrectAnswer`, `WrongAnswer`, `RewardPoints`, `userPercentage` , `examColor`, `userexamStatus`) VALUES (" + req.body.examID + "," + req.body.loginuserID + ",'"+uniqueNumber+"'," + TotalQuestions + "," + AttendedQuestions.length + "," + CorrectAnswer.length + "," + WrongAnswer.length + "," + RewardPoints + "," + percentage + ",'" + examColor + "','Fail')";
                        const object2 = await sequelize.query(statment, { type: QueryTypes.INSERT }).then(
                            id => {
                                const statement = "UPDATE `userexams` SET `resultsID`= "+id[0]+" WHERE userID = "+req.body.loginuserID+" AND uniqueNumber = "+uniqueNumber+" AND queID IN ("+req.body.queID+")";
                                 sequelize.query(statement, { type: QueryTypes.UPDATE });
                            }
                        );
                    }
                }
                else 
                {
                    
                    const statment = "INSERT INTO `examresults`( `examID`, `userID`,`uniqueNumber`,`TotalQuestions`, `AttendedQuestions`, `CorrectAnswer`, `WrongAnswer`, `RewardPoints`, `examColor`, `userexamStatus`) VALUES (" + req.body.examID + "," + req.body.loginuserID + ",'"+uniqueNumber+"'," + TotalQuestions + "," + AttendedQuestions.length + "," + CorrectAnswer.length + "," + WrongAnswer.length + "," + RewardPoints + ",'" + examColor + "','Fail')";
                    const object2 = await sequelize.query(statment, { type: QueryTypes.INSERT }).then(
                        id => {
                            const statement = "UPDATE `userexams` SET `resultsID`= "+id[0]+" WHERE userID = "+req.body.loginuserID+" AND uniqueNumber = "+uniqueNumber+" AND queID IN ("+req.body.queID+")";
                             sequelize.query(statement, { type: QueryTypes.UPDATE });
                        }
                    );
                }

                const statment3 = "SELECT * FROM `examresults` WHERE userID = "+req.body.loginuserID+" AND uniqueNumber = '"+uniqueNumber+"'";
                const getusersexams = await sequelize.query(statment3, { type: QueryTypes.SELECT });

                var statement3= "INSERT INTO rewardshistory (userID, rewardRefID, rewardType, rewardPoints, rewardNote, rewardTitle, rewardSubType) values("+req.body.loginuserID+", "+getusersexams[0].examID+", 'Test' ,"+getusersexams[0].RewardPoints+", 'Exam bonus', 'You have earned exam bonus for "+object1[0].examName+"', 'Scheduled')";
                var rewardDetails1= await sequelize.query( statement3, {type: QueryTypes.INSERT});

                res.status(200).json({
                    status: true,
                    message: 'Users Result given',
                    data: {
                        getusersexams
                    },
                });
                    
                })
            //    quesArray.forEach(async q=>{
            //     let statment3 = "SELECT * from questions WHERE queID = " + q.ques;
            //     let x = await sequelize.query(statment3, { type: QueryTypes.SELECT });

            //     if(q.ans!=0){
            //         AttendedQuestions.push(count+1);
            //         count++;
            //         if(x[0].queCorrectAns==q.ans){
            //             CorrectAnswer.push(count+1);
            //         }
            //         else{
            //             WrongAnswer.push(count+1);
            //         }
            //     }
            //    });

              // console.log("att "+AttendedQuestions.length);
               
                // userexams.findAll({
                //    where:{
                //        examID: req.body.examID,
                //        userID: req.body.loginuserID,
                //        uniqueNumber: uniqueNumber
                //    }
                // }).then(async object2=>{
                //     console.log("object2 "+ object2);
                //     for (let i = 0; i < object2.length; i++) 
                // {
                //     let statment3 = "SELECT * from questions WHERE queID = " + object2[i].queID;
                //     let x = await sequelize.query(statment3, { type: QueryTypes.SELECT });
                //     //console.log("out "+i);

                //     if (object2[i].userexamAnswer != 0) 
                //     {
                //         console.log("out2 "+AttendedQuestions.length);
                //         AttendedQuestions.push(i)

                //         if (x[0].queCorrectAns == object2[i].userexamAnswer) 
                //         {
                //             //console.log("in "+i+1);
                //             CorrectAnswer.push(i + 1)
                //         }
                //         else 
                //         {
                //             WrongAnswer.push(i + 1)
                //         }
                //     }
                // }
                
               // }).catch(err=>console.log("can't find"));

                

                

                

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


function uniqueNumberGanrates() 
{
    function uniqueNumber() {
        var date = Date.now();

        if (date <= uniqueNumber.previous) {
            date = ++uniqueNumber.previous;
        }
        else {
            uniqueNumber.previous = date;
        }
        return date;
    }

    uniqueNumber.previous = 0;

    return uniqueNumber();
}