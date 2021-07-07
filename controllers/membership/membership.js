const {subscriptionplan} = require("../../models/membership/subsciptionplan");
const {userplan} = require("../../models/userplan/userplan");
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');
const AppError = require('../../utils/appError');


exports.getAllPlan = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            //subscriptionplan. 
                const statment = "SELECT * FROM subscriptionplan INNER JOIN users ON subscriptionplan.entityID = users.userEntityId AND subscriptionplan.categorylevel1ID = users.categorylevel1ID AND subscriptionplan.categorylevel2ID = users.categorylevel2ID AND subscriptionplan.categorylevel3ID = users.categorylevel3ID WHERE  subscriptionplan.planStatus = 'Active' AND users.userID = " + req.body.loginuserID;
              
                const subscriptionPlan = await sequelize.query(statment, { type: QueryTypes.SELECT });

                if (subscriptionPlan.length <= 0) 
                {
                    return next(new AppError('Data Not Found', 400));
                }
                res.status(200).json({
                    status: true,
                    message: 'Subscription Plan given',
                    data: {
                        subscriptionPlan,
                    },
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

exports.getPlanByID = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") {
            if (req.body.planID != "" && req.body.planID != null) {
                const statment = "SELECT * FROM subscriptionplan WHERE planStatus = 'Active' AND planID = " + req.body.planID;

                const getPlanByID = await sequelize.query(statment, { type: QueryTypes.SELECT });

                if (getPlanByID.length <= 0) {
                    return next(new AppError('Data Not Found', 400));
                }
                const getcourseID = getPlanByID[0].courseID;

                const statment1 = "SELECT  *, ( SELECT COUNT(*) FROM coursesubjects WHERE `coursesubjStatus` = 'Active' AND courseID = " + getcourseID + " )  AS totalsubject FROM `coursesubjects` WHERE `coursesubjStatus` = 'Active' AND courseID = " + getcourseID;

                const getsubID = await sequelize.query(statment1, { type: QueryTypes.SELECT });
                if (getsubID.length <= 0) {
                    return next(new AppError('Data Not Found', 400));
                }
                const totalsubject = getsubID[0].totalsubject;

                const getsubjectsID = [];

                getsubID.forEach(element => {
                    getsubjectsID.push(element.coursesubjID)
                });

                const x = getsubjectsID.toString();

                const statment2 = "SELECT  *, ( SELECT COUNT(*) FROM coursechapters WHERE `coursechapterStatus` = 'Active' AND coursesubjID IN (" + x + ") )  AS totalcoursechapters FROM coursechapters WHERE coursechapterStatus = 'Active' AND coursesubjID IN (" + x + ")";

                const getCapID = await sequelize.query(statment2, { type: QueryTypes.SELECT });
                var totalcoursechapters;
                if (getCapID.length <= 0) {
                    totalcoursechapters = 0;
                }
                else {
                    totalcoursechapters = getCapID[0].totalcoursechapters;
                }

                var subjectWiseTotalChapters = [];

                for (let i = 0; i < getsubID.length; i++) {
                    const statment3 = "SELECT coursesubjects.coursesubjID,coursesubjects.coursesubjName,COUNT(*) as totalchapter FROM coursesubjects RIGHT JOIN coursechapters ON coursesubjects.coursesubjID = coursechapters.coursesubjID  WHERE coursechapters.coursechapterStatus = 'Active' AND coursesubjects.coursesubjStatus = 'Active' AND coursechapters.coursesubjID = " + getsubID[i].coursesubjID;
                    const x = await sequelize.query(statment3, { type: QueryTypes.SELECT });
                    subjectWiseTotalChapters.push(x[0]);
                }

                const getplanByID = {
                    getPlanByID,
                    totalsubject,
                    totalcoursechapters,
                    subjectWiseTotalChapters
                }

                const msg = {}
                msg['status'] = true;
                msg['message'] = 'Get Subscription Plan given';
                msg['data'] = getplanByID
                res.json(msg);
            }
            else {
                return next(new AppError('Please enter the required parameters', 400));
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
exports.getPlanSubjChapters = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") {
            if (req.body.coursesubjID != '' && req.body.coursesubjID != null) {
                const statment = "SELECT coursechapterName FROM coursechapters WHERE coursechapterStatus = 'Active' AND coursesubjID = " + req.body.coursesubjID;

                const getPlanSubjChapters = await sequelize.query(statment, { type: QueryTypes.SELECT });

                if (getPlanSubjChapters.length <= 0) {
                    return next(new AppError('Data Not Found', 400));
                }

                var subjectWiseChapters = [];
                counter = 0;
                getPlanSubjChapters.forEach(element => {
                    counter++;
                    element.Chapter = counter;
                    subjectWiseChapters.push(element)
                });

                res.status(200).json({
                    status: true,
                    message: 'Subject Wise chapter given',
                    data: {
                        subjectWiseChapters,
                    },
                });
            }
            else {
                return next(new AppError('Please enter the required parameters', 400));
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

exports.checkCoupon = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") {
            if (req.body.couponcode != '' && req.body.couponcode != null && req.body.planID != '' && req.body.planID != null) {
                const statment = "SELECT *  FROM `offer` WHERE `offerName` LIKE BINARY '%" + req.body.couponcode + "%' AND offerStatus = 'Active'";

                const couponCode = await sequelize.query(statment, { type: QueryTypes.SELECT });

                if (couponCode.length <= 0) {
                    return next(new AppError('invalid coupon code', 400));
                }
                else {
                    var checlValidDate = dateCheck(couponCode[0].offerStartDate, couponCode[0].offerEndDate);

                    if (checlValidDate == true) {
                        const statement = "SELECT * FROM `userplan` WHERE userID = " + req.body.loginuserID + " AND offerID = " + couponCode[0].offerID;

                        const result1 = await sequelize.query(statement, { type: QueryTypes.SELECT });

                        if (result1.length > 0) {
                            if (couponCode[0].offerCodeUse == "One Time") {
                                return next(new AppError('You have already used this Coupon for this plan', 400));
                            }
                            else {
                                const statement4 = "SELECT * FROM `offer` INNER JOIN users ON offer.entityID = users.userEntityId AND offer.categorylevel1ID = users.categorylevel1ID AND offer.categorylevel2ID = users.categorylevel2ID AND offer.categorylevel3ID = users.categorylevel3ID AND users.userID = " + req.body.loginuserID + " AND offer.offerID = " + couponCode[0].offerID;

                                const result = await sequelize.query(statement4, { type: QueryTypes.SELECT });

                                if (result.length > 0) {
                                    res.status(200).json({
                                        status: true,
                                        message: 'Coupon apply successfully',
                                        data: {
                                            couponCode,
                                        }
                                    });
                                }
                                else {
                                    return next(new AppError('This coupon is not for you', 400));
                                }
                            }
                        }
                        else {
                            const statement4 = "SELECT * FROM `offer` INNER JOIN users ON offer.entityID = users.userEntityId AND offer.categorylevel1ID = users.categorylevel1ID AND offer.categorylevel2ID = users.categorylevel2ID AND offer.categorylevel3ID = users.categorylevel3ID AND users.userID = " + req.body.loginuserID + " AND offer.offerID = " + couponCode[0].offerID;

                            const result = await sequelize.query(statement4, { type: QueryTypes.SELECT });

                            if (result.length > 0) {
                                res.status(200).json({
                                    status: true,
                                    message: 'Coupon apply successfully',
                                    data: {
                                        couponCode,
                                    }
                                });
                            }
                            else {
                                return next(new AppError('This coupon is not for you', 400));
                            }
                        }
                    }
                    else {
                        return next(new AppError('This coupon expired in a certain number of days', 400));
                    }
                }
            }
            else {
                return next(new AppError('Please enter the required parameters', 400));
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

exports.purchasePlan = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") {
            if (req.body.planID != '' && req.body.planID != null &&
                req.body.planNetAmount != '' && req.body.planNetAmount != null &&
                req.body.GST != '' && req.body.GST != null &&
                req.body.planTotalPrice != '' && req.body.planTotalPrice != null) {

                let subscriptionID = uniqueNumberGanrates();

                if (req.body.offerID != '' && req.body.offerID != null &&
                    req.body.planCouponDiscount != '' && req.body.planCouponDiscount != null) {
                    //const statement = "UPDATE userplan SET userPlanStatus= 'inActive'  WHERE userID = " + req.body.loginuserID;
                    //const result = await sequelize.query(statement);

                    //if (result.length > 0) {
                        //const statement = "INSERT INTO `userplan`( `userID`, `planID`, `offerID`, 
                        // `planNetAmount`, `planCouponDiscount`, `planGSTCharges`,
                        // `planTotalPrice`, `couponApply`,`subscriptionID`) VALUES (" + req.body.loginuserID +
                        // "," + req.body.planID + "," + req.body.offerID + "," + 
                        //req.body.planNetAmount + "," + req.body.planCouponDiscount + "," + req.body.GST +
                        // "," + req.body.planTotalPrice + ",'Yes'," + subscriptionID + ")";

                        //const result = await sequelize.query(statement);
                        let subscription= subscriptionID.toString();
                        let createUserPlan= {userID: req.body.loginuserID, planID: req.body.planID, offerID:req.body.offerID,
                            planNetAmount: req.body.planNetAmount, planCouponDiscount: req.body.planCouponDiscount,
                            planGSTCharges: req.body.GST, planTotalPrice: req.body.planTotalPrice,
                            couponApply: 'Yes', subsciptionID: subscription};
                        let result = await userplan.create(createUserPlan);
                        let ouputData= result.toJSON();
                        if (ouputData!= null) {
                            res.status(200).json({
                                status: true,
                                message: 'Plan purchase successfully',
                                data: {
                                    subscriptionID
                                }
                            });
                        }
                        else {
                            return next(new AppError('Not purchased plan', 400));
                        }
                    // }
                    // else {
                    //     return next(new AppError('Not purchased plan', 400));
                    // }
                }
                else if (req.body.offerID == '' && req.body.planCouponDiscount == '') {
                    // const statement = "UPDATE userplan SET userPlanStatus= 'inActive'  WHERE userID = " + req.body.loginuserID;
                    // const result = await sequelize.query(statement);
                    
                    //if (result.length>0) {
                        
                        // const statement = "INSERT INTO `userplan`( `userID`, `planID`, `planNetAmount`, `planGSTCharges`, `planTotalPrice`,`subscriptionID`) VALUES (" + req.body.loginuserID + "," + req.body.planID + "," + req.body.planNetAmount + "," + req.body.GST + "," + req.body.planTotalPrice + "," + subscriptionID + ")";
                        // const result = await sequelize.query(statement);
                        let subscription= subscriptionID;
                        let createUserPlan= {userID: req.body.loginuserID, planID: req.body.planID, offerID:req.body.offerID,
                            planNetAmount: req.body.planNetAmount, planCouponDiscount: req.body.planCouponDiscount,
                            planGSTCharges: req.body.GST, planTotalPrice: req.body.planTotalPrice,
                            couponApply: 'No', subsciptionID: subscription};
                        let result = await userplan.create(createUserPlan);
                        let ouputData= result.toJSON();
                            console.log(ouputData);
                        if (ouputData!=null) {
                            res.status(200).json({
                                status: true,
                                message: 'Plan purchase successfully',
                                data: {
                                    subscriptionID
                                }
                            });
                        }
                        else {
                            return next(new AppError('Not purchase plan', 400));
                        }
                   // }
                    // else {
                    //     return next(new AppError('Not purchase plan', 400));
                    // }
                }
                else {
                    return next(new AppError('Please enter the required parameters', 400));
                }
            }
            else {
                return next(new AppError('Please enter the required parameters', 400));
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
exports.getMyPlan = async (req, res, next) => {
    try {
        if (req.user == req.body.loginuserID && req.body.loginuserID != "") 
        {
            const stetament = "SELECT * FROM `userplan` INNER JOIN subscriptionplan ON userplan.planID = subscriptionplan.planID WHERE userplan.userPlanStatus = 'Active' AND userplan.userID = " + req.body.loginuserID;

            const result = await sequelize.query(stetament, { type: QueryTypes.SELECT });
            console.log(result);

            if (result.length > 0) 
            {   //console.log("created "+result[0].userPlanCreatedDate+" duration "+result[0].planDuration);
                const stetament1 = "SELECT subscriptionplan.planID,subscriptionplan.planName,userplan.planTotalPrice ,subscriptionplan.subscriptionColor,courses.CourseName,courses.courseIcon FROM userplan INNER JOIN subscriptionplan ON userplan.planID = subscriptionplan.planID LEFT JOIN courses ON subscriptionplan.courseID = courses.courseID WHERE userplan.userID = " + req.body.loginuserID;
                const result1 = await sequelize.query(stetament1, { type: QueryTypes.SELECT });
                console.log(result1);
                for(let i=0;i<result.length;i++){
                    var date = planDurationCheck(result[i].userPlanCreatedDate, result[i].planDuration);
                    
                    result1[i]['planDuration']=date;
                }

                let getMyPlan = result1;

                //getMyPlan[0]['planDuration'] = date;
                res.status(200).json({
                    status: true,
                    message: 'Plan Givan',
                    data: {
                        getMyPlan: getMyPlan
                    }
                });
            }
            else {
                return next(new AppError('Data Not Found', 400));
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


function dateCheck(PastTime, FutureTime) {

    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var currentTime = [year, month, day].join('-');

    const dateOne = new Date(PastTime);
    const dateTwo = new Date(currentTime);
    const datethree = new Date(FutureTime);

    if (dateTwo >= dateOne) {
        if (dateTwo <= datethree) {
            return true;

        }
        else {
            return false;
        }
    }
    else {
        return false;
    }

}

function uniqueNumberGanrates() {
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

function planDurationCheck(date, duration) {

    var DateEnd = new Date(date);
    var year = DateEnd.getFullYear();
    var month = DateEnd.getMonth();
    var day = DateEnd.getDate();
    var getEndDate = new Date(year , month + duration, day);

    console.log(getEndDate);

    const convertDAte = new Date(getEndDate)
    const convertYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(convertDAte)
    const convertMonths = new Intl.DateTimeFormat('en', { month: 'long' }).format(convertDAte)
    const convertDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(convertDAte)

    const planDurationEnd = `${convertMonths} ${convertDay},${convertYear}`;

    const convertDAteStart = new Date(date)
    const convertYearStart = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(convertDAteStart)
    const convertMonthsStart = new Intl.DateTimeFormat('en', { month: 'long' }).format(convertDAteStart)
    const convertDayStart = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(convertDAteStart)

    const planDurationStart = `${convertMonthsStart} ${convertDayStart},${convertYearStart}`;

    return planDurationStart + " - " + planDurationEnd;

}



