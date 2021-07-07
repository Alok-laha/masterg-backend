const { Subjects } = require('../../models/subjects/subjects')
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../../database/database');
const Op = Sequelize.Op
const AppError = require('../../utils/appError');

// this router gives us all the entities from database
exports.getsubjects = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID) {

            if (req.body.courseID != '' && req.body.courseID != '0') {                                                                                          // coursesubjects.coursesubjID                                         //INNER                                                                                                   
                //var statement = "SELECT coursesubjects.coursesubjID,coursesubjects.coursesubjName,coursesubjects.coursesubjIcon,coursesubjects.coursesubjColor,COUNT(coursesubjects.coursesubjID) AS totalChapters FROM coursesubjects LEFT JOIN coursechapters ON coursesubjects.coursesubjID = coursechapters.coursesubjID WHERE coursesubjects.coursesubjStatus = 'Active' AND coursechapters.coursechapterStatus= 'Active'  AND coursesubjects.courseID =" + req.body.courseID;
                //statement += " GROUP BY coursechapters.coursesubjID ORDER BY coursesubjects.coursesubjID ASC";
                         
                let statement= "select coursesubjects.coursesubjID, coursesubjects.coursesubjName,coursesubjects.coursesubjIcon,coursesubjects.coursesubjColor from coursesubjects where coursesubjects.coursesubjStatus = 'Active' AND coursesubjects.courseID = " + req.body.courseID;
                   
                const subjects = await sequelize.query(statement, { type: QueryTypes.SELECT });

                //let allsubjects;
                // let tempSubjects=[];

                // subjects.forEach(async subject=>{
                //     let ID= subject.coursesubjID;
                   
                        
                //         let [results,metadata]= await sequelize.query("select count(coursechapters.coursesubjID) as totalChapters from coursechapters where coursechapters.coursechapterStatus= 'Active' AND coursechapters.coursesubjID= "+ID,{type: QueryTypes.SELECT});
                //         subject.totalChapters=results.totalChapters;
                       
                //         tempSubjects.push(subject);
                //         //  console.log("count="+JSON.stringify(results));
                //         //  console.log(results.totalChapters);
                //           console.log(tempSubjects);
                   
                // });
            //  let allsubjects = subjects.map(async function(subject,index){
            //         let result= await sequelize.query("select count(coursechapters.coursesubjID) as totalChapters from coursechapters where coursechapters.coursechapterStatus= 'Active' AND coursechapters.coursesubjID= "+subject.coursesubjID,{type: QueryTypes.SELECT});
            //         subject.totalChapters=result[0].totalChapters;
                    
            //         // console.log(JSON.stringify(result));
            //         // console.log(JSON.stringify(subject)+" is this");
            //         // return JSON.stringify(subject)
            //     });

            //   
            //    Promise.all(allsubjects).then(newsubjects=> 
            //     { 
            //         console.log(newsubjects);   
            //         Promise.all(newsubjects.map(r => r.json()))
            //     })
            //    .then(alldata=> data.push(alldata))
            //    .catch(error=>console.log("Error is "+error));
            
            for(let i in subjects){
                let id = subjects[i].coursesubjID;
                let result= await sequelize.query("select count(coursechapters.coursesubjID) as totalChapters from coursechapters where coursechapters.coursechapterStatus= 'Active' AND coursechapters.coursesubjID= "+id,{type: QueryTypes.SELECT});
                subjects[i].totalChapters= result[0].totalChapters;
            }
             
               
                res.status(200).json({
                    status: true,
                    message: 'Subjects given',
                    data: {
                        subjects
                    },
                });
            }
            else if (req.body.courseID == '0') {                                                                                                                                                                                  // INNER
                var statement = "SELECT coursesubjects.coursesubjID,coursesubjects.coursesubjName,coursesubjects.coursesubjIcon,coursesubjects.coursesubjColor FROM coursesubjects  WHERE coursechapters.coursechapterStatus= 'Active'  AND coursesubjects.coursesubjStatus = 'Active' GROUP BY coursechapters.coursesubjID ORDER BY coursesubjects.coursesubjID ASC";

                const subjects = await sequelize.query(statement, { type: QueryTypes.SELECT });

                for(let i in subjects){
                    let id = subjects[i].coursesubjID;
                    let result= await sequelize.query("select count(coursechapters.coursesubjID) as totalChapters from coursechapters where coursechapters.coursechapterStatus= 'Active' AND coursechapters.coursesubjID= "+id,{type: QueryTypes.SELECT});
                    subjects[i].totalChapters= result[0].totalChapters;
                }

                res.status(200).json({
                    status: true,
                    message: 'Subjects given',
                    data: {
                        subjects,
                    },
                });
            }
            else 
            {

                return next(new AppError('courseID Messing', 400));
            }
        }
        else 
        {
            return next(new AppError('Token and userId not a match', 400));
        }
    } catch (error) {
        return next(error);
    }

}