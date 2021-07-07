const {notificationSetting}= require("../../models/notification/notificationSetting");
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../../database/database');
const Op = Sequelize.Op
const AppError = require('../../utils/appError');
const { update } = require('../../models/faqs/faqs');

// this router gives us all the entities from database
exports.getNotification = async (req, res, next) => 
{
    try {
        if (req.user == req.body.loginuserID) 
        {
            var statement = "SELECT * FROM `notificationSetting` WHERE userID = "+req.user;
            
            const getNotification = await sequelize.query(statement, { type: QueryTypes.SELECT });

            if(getNotification.length == 0)
            {
                // var statement3 = "INSERT INTO `notificationSetting` (`userID`, `notificationNewVideos`, `notificationTests`, `notificationResults`, `notificationNews`, `notificationEvents`, `notificationNotices`, `notificationAssignment`, `notificationFormus`, `notificationAdminAnnouncement`, `notificationSettingCreatedDate`) VALUES ( '"+ req.user +"', 'Active', 'Active', 'Active', 'Active', 'Active', 'Active', 'Active', 'Active', 'Active', current_timestamp())";

                // await sequelize.query(statement3);


                let newNotification= {userID: req.user, notificationNewVideos: "Active",notificationTests: "Active",
                notificationResults: "Active", notificationNews: "Active",notificationEvents :"Active", 
                notificationNotices: "Active", notificationAssignment: "Active", notificationFormus: "Active",
                notificationAdminAnnouncement: "Active"};

                let createNewNotification= await notificationSetting.create(newNotification);

                var statement2 = "SELECT * FROM notificationSetting WHERE userID = "+req.user;

                var getNotificationnew = await sequelize.query(statement2, { type: QueryTypes.SELECT });


                var msg = {}
                msg['status'] = true;
                msg['message'] = 'Given Notification';
                msg['data'] = getNotificationnew
                res.json(msg);
            }
            else
            {
                var msg = {}
                msg['status'] = true;
                msg['message'] = 'Given Notification';
                msg['data'] = getNotification
                res.json(msg);
            }
        }
        else 
        {
            return next(new AppError('Token and userId not a match', 400));
        }
    } catch (error) 
    {
        return next(error);
    }

}

exports.notificationUpdate = async (req, res, next) => 
{
    try {
        if (req.user == req.body.loginuserID) 
        {
            var statement = "SELECT * FROM `notificationSetting` WHERE userID = "+req.user;

            const getNotification = await sequelize.query(statement, { type: QueryTypes.SELECT });

            if(getNotification.length == 0)
            {
                return next(new AppError('No details found', 400));
            }
            else
            {
                var notificationNewVideos = (req.body.notificationNewVideos != '') ? req.body.notificationNewVideos : getNotification[0].notificationNewVideos;

                var notificationTests = (req.body.notificationTests != '') ? req.body.notificationTests : getNotification[0].notificationTests;

                var notificationResults = (req.body.notificationResults != '') ? req.body.notificationResults : getNotification[0].notificationResults;

                var notificationNews = (req.body.notificationNews != '') ? req.body.notificationNews : getNotification[0].notificationNews;

                var notificationEvents = (req.body.notificationEvents != '') ? req.body.notificationEvents : getNotification[0].notificationEvents;

                var notificationNotices = (req.body.notificationNotices != '') ? req.body.notificationNotices : getNotification[0].notificationNotices;

                var notificationAssignment = (req.body.notificationAssignment != '') ? req.body.notificationAssignment : getNotification[0].notificationAssignment;

                var notificationFormus = (req.body.notificationFormus != '') ? req.body.notificationFormus : getNotification[0].notificationFormus;

                var notificationAdminAnnouncement = (req.body.notificationAdminAnnouncement != '') ? req.body.notificationAdminAnnouncement : getNotification[0].notificationAdminAnnouncement;


                var statement1 = "UPDATE `notificationSetting` SET `notificationNewVideos`= '"+ notificationNewVideos +"',`notificationTests`= '"+ notificationTests +"',`notificationResults`= '"+ notificationResults +"',`notificationNews`= '"+ notificationNews +"',`notificationEvents`= '"+ notificationEvents +"',`notificationNotices`= '"+ notificationNotices +"',`notificationAssignment`= '"+ notificationAssignment +"',`notificationFormus`= '"+ notificationFormus +"',`notificationAdminAnnouncement`= '"+ notificationAdminAnnouncement +"' WHERE userID = "+ req.user;

                await sequelize.query(statement1);

                var statement2 = "SELECT * FROM notificationSetting WHERE userID = "+req.user;

                var updateNotification = await sequelize.query(statement2, { type: QueryTypes.SELECT });
               
                var msg = {}
                msg['status'] = true;
                msg['message'] = 'Update Notifactionstatus successFully';
                msg['data'] = updateNotification
                res.json(msg);

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