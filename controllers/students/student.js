const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const referralCodeGenerator = require('referral-code-generator');
const Student = require('../../models/student/student');
const AppError = require('../../utils/appError');
const fileHelper = require('../../utils/file');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../../database/database');

exports.basicRegister = async (req, res, next) => {
  try {
    let { userEmail, userCountryCode, userMobile, userFullName, countryID, stateID, cityID } = req.body;
    //check email is unique
    const userSignupReferKey= req.body.userSignupReferKey; //Optional parameter
    const isExitEmail = await Student.findOne({ where: { userEmail: userEmail } });

    if (isExitEmail) 
    {
      return next(new AppError('Email is already in use', 400));
    }

    const isExitMobile = await Student.findOne({ where: { userMobile: userMobile } });

    if (isExitMobile) 
    {
      return next(new AppError('Mobile number is already in use', 400));
    }

    //checking if the reference key is valid or not

    var bonus= false;
    var referedUserID=0;
    if(userSignupReferKey && userSignupReferKey!=""){
      const existingUser= await Student.findOne({ where: { userSignupReferKey: userSignupReferKey}});
      if(existingUser && existingUser!=0){
          bonus=true;
          referedUserID= existingUser.userID;
          
      }
      else{
        return res.status(200).json({
          status: false,
          message: "Please enter valid refer code"
        });
      }
    }

    // IF referral key is valid
    // Generate new key and save it to user
    async function generateNewreferralKey(){
      let unique= false;
      var newuserSignupReferKey=""
      while(unique==false){
        newuserSignupReferKey =referralCodeGenerator.alphaNumeric('uppercase', 3, 1);
        console.log(newuserSignupReferKey);
        let Details= await Student.findOne({ where:{ userSignupReferKey:  newuserSignupReferKey}});
        if(Details==null){
          unique= true;
        }
      }
      
      return newuserSignupReferKey;
    }
    
    
    const user = await Student.create(req.body);

    if(bonus==true){
      var statement1= "Select * from settings where settingsID = 1";
      var settingsDetails= await sequelize.query( statement1, {type: QueryTypes.SELECT});
      var rewardPointsGot = settingsDetails[0].settingsReferringUserRewards;
      const newUser= user.userID;
      var statement2= "INSERT INTO rewardshistory (userID, rewardRefID, rewardType, rewardPoints, rewardNote, rewardTitle, rewardSubType) values("+newUser+", "+referedUserID+", 'Referral' ,"+rewardPointsGot+", 'Referred Bonus', 'You have earned referral bonus', 'N/A')";
      var rewardDetails= await sequelize.query( statement2, {type: QueryTypes.INSERT});
      var statement3= "INSERT INTO rewardshistory (userID, rewardRefID, rewardType, rewardPoints, rewardNote, rewardTitle, rewardSubType) values("+referedUserID+", "+newUser+", 'Referral' ,"+rewardPointsGot+", 'Referring Bonus', 'You have earned Referring bonus for user "+user.userMobile+"', 'N/A')";
      var rewardDetails1= await sequelize.query( statement3, {type: QueryTypes.INSERT});
     
  }

    //const otp = Math.floor(1000 + Math. random() * 9000);
    const otp = 1234;
    var referralKey= generateNewreferralKey();
    user.userSignupReferKey= (await referralKey).toString();
    user.userOTP = otp.toString();

    await user.save();

    const token = jwt.sign({ user: user.userID }, process.env.JWT_KEY, {
      expiresIn: '1d',
    });

    const refreshToken = jwt.sign({ user: user.userID }, process.env.JWT_REFRESH_KEY, {
      expiresIn: '7d',
    });
    res.status(200).json({
      status: true,
      message: 'Register successfully',
      data: {
        token,
        refreshToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.completeRegister = async (req, res, next) => {
  try {
    const { userEntityId, userCenterId, userBatchId,categorylevel1ID,categorylevel2ID,categorylevel3ID,categorylevel4ID } = req.body;
   
    if (!userEntityId || !userCenterId || !userBatchId || !categorylevel1ID || !categorylevel2ID || !categorylevel3ID || !categorylevel4ID) 
    {
      return next(new AppError('Fields are required', 400));
    }

    //find user in req.user
    const studentDetails = await Student.findOne({ where: { userID: req.user } });

    if (!studentDetails) {
      return next(new AppError('User not found', 400));
    }

    //update details
    studentDetails.userEntityId = userEntityId;
    studentDetails.userCenterId = userCenterId;
    studentDetails.userBatchId = userBatchId;
    studentDetails.categorylevel1ID = categorylevel1ID;
    studentDetails.categorylevel2ID = categorylevel2ID;
    studentDetails.categorylevel3ID = categorylevel3ID;
    studentDetails.categorylevel4ID = categorylevel4ID;

    await studentDetails.save();

    res.status(200).json({
      status: true,
      message: 'Details updated successfully',
    });
  } catch (error) {
    return next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    let {
      userDeviceType,
      languageID,
      userEmail,
      userFirstName,
      userLastName,
      userGender,
      userMobile,
      userPassword,
      userCountryCode,
      userProfilePicture,
      userOVerified,
      apputypeID,
      appuroleID,
      footbltypeID,
      specialityID,
      userReferKey,
      agegroupID,
    } = req.body;

    //check email is unique

    const isExitEmail = await Student.findOne({ where: { userEmail: userEmail } });

    if (isExitEmail) {
      return next(new AppError('Email is already in use', 400));
    }

    const isExitMobile = await Student.findOne({ where: { userMobile: userMobile } });

    if (isExitMobile) {
      return next(new AppError('Mobile number is already in use', 400));
    }

    req.body.userPassword = await bcrypt.hash(userPassword, 12);

    const user = await Student.create(req.body);

    const token = jwt.sign({ user: user.userEmail }, process.env.JWT_KEY, {
      expiresIn: '1d',
    });
    res.status(200).json({
      status: true,
      message: 'Register successfully',
      data: {
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// let buff = new Buffer.from(query.userEmail);
// let base64data = buff.toString('base64');

exports.login = async (req, res, next) => {
  try {
    let  userName  = req.body.userName;

    let studentDetails;

    //find user in DB
    if (userName.match(/@/g)) {
      studentDetails = await Student.findOne({ where: [{ userEmail: userName }, { userStatus: "Active" }] });
    }
    else {
      studentDetails = await Student.findOne({ where: [{ userMobile: userName }, { userStatus: "Active" }] });
    }

    if (!studentDetails || studentDetails === null || studentDetails === undefined) {
      return next(new AppError('No details found', 400));
    }

    //const otp = Math.floor(1000 + Math. random() * 9000);
    const otp = 1234;

    studentDetails.userOTP = otp.toString();

    await studentDetails.save();

    return res.status(200).json({
      status: true,
      message: 'OTP send successfully',
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { profileimage,userFullName, cityID, userAddress, userEntityId, userCenterId, userBatchId, categorylevel1ID,categorylevel2ID,categorylevel3ID,categorylevel4ID} = req.body;
    

    if (!profileimage || !userFullName || !cityID || !userEntityId || !userCenterId || !userBatchId || !categorylevel1ID || !categorylevel2ID || !categorylevel3ID || !categorylevel4ID) 
    {
      return next(new AppError('Fields are required', 400));
    }

    //find user
    const studentDetails = await Student.findOne({ where: [{ userID: req.user }, { userStatus: "Active" }] });
   
    if (!studentDetails) 
    {
      return next(new AppError('User details not found', 400));
    }

    studentDetails.userProfilePicture = profileimage;
    studentDetails.userFullName = userFullName;
    studentDetails.cityID = cityID;
    if(userAddress != "" && userAddress != null)
    {
      studentDetails.userAddress = userAddress;
    }
    else
    {
      studentDetails.userAddress;
    }
    studentDetails.userEntityId = userEntityId;
    studentDetails.userCenterId = userCenterId;
    studentDetails.userBatchId = userBatchId;
    studentDetails.categorylevel1ID = categorylevel1ID;
    studentDetails.categorylevel2ID = categorylevel2ID;
    studentDetails.categorylevel3ID = categorylevel3ID;
    studentDetails.categorylevel4ID = categorylevel4ID;

    await studentDetails.save();

    res.status(200).json({
      status: true,
      message: 'Profile updated successfully',
    });
  } 
  catch (error) 
  {
    return next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (oldPassword == newPassword) {
      return next(new AppError('New password can not be same as old password', 400));
    }

    if (newPassword != confirmPassword) {
      return next(new AppError('New password and confim password not matching', 400));
    }

    //check if old password is valid password
    const userDetails = await Student.findOne({ where: [{ userID: req.user }, { userStatus: "Active" }] });

    if (!userDetails) {
      return next(new AppError('User not found', 400));
    }

    //if found check password
    const isValidOldPassword = await bcrypt.compare(oldPassword, userDetails.userPassword);

    if (!isValidOldPassword) {
      return next(new AppError('Old password is invalid', 400));
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await Student.update({ userPassword: hashedNewPassword }, { where: { userID: req.user } });

    return res.status(200).json({
      status: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    return next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const userName = req.body.userName;

    if (!userName) {
      return next(new AppError('Fields are required', 400));
    }

    let userData;

    if (userName.match(/@/g)) {
      userData = await Student.findOne({ where: [{ userEmail: userName }, { userStatus: "Active" }] });
    } else {
      userData = await Student.findOne({ where: [{ userMobile: userName }, { userStatus: "Active" }] });
    }

    if (!userData || userData === null || userData === undefined) {
      return next(new AppError('No details found', 400));
    }

    //const otp = Math. floor(1000 + Math. random() * 9000);
    const otp = 1234;

    userData.userOTP = otp.toString();

    await userData.save();

    return res.status(200).json({
      status: true,
      message: 'OTP send successfully',
    });
  } catch (error) {
    return next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    let { userName, newPassword, newConfirmPassword, otp } = req.body;

    if (!userName) {
      return next(new AppError('Fields are required', 400));
    }

    let userData;

    if (userName.match(/@/g)) {
      userData = await Student.findOne({ where: [{ userEmail: userName }, { userStatus: "Active" }] });
    } else {
      userData = await Student.findOne({ where: [{ userMobile: userName }, { userStatus: "Active" }] });
    }

    if (!userData || userData === null || userData === undefined) {
      return next(new AppError('No details found', 400));
    }

    if (userData.userOTP != otp) {
      return next(new AppError('Invalid OTP', 400));
    }

    if (newPassword != newConfirmPassword) {
      return next(new AppError('Password not matching', 400));
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    userData.userPassword = hashedNewPassword;

    await userData.save();

    res.status(200).json({
      status: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    return next(error);
  }
};

exports.getStudentDetails = async (req, res, next) => {

  var statment = "SELECT entity.entityName,city.cityName,categorylevel1.categorylevel1Name AS centerName,categorylevel1.categorylevel1Name,categorylevel2.categorylevel2Name,categorylevel3.categorylevel3Name,categorylevel4.categorylevel4Name,users.*FROM users LEFT JOIN categorylevel1 ON users.userCenterId = categorylevel1.categorylevel1ID LEFT JOIN categorylevel2 ON users.categorylevel2ID = categorylevel2.categorylevel2ID LEFT JOIN categorylevel3 ON users.categorylevel3ID = categorylevel3.categorylevel3ID LEFT JOIN categorylevel4 ON users.categorylevel4ID = categorylevel4.categorylevel4ID LEFT JOIN entity ON users.userEntityId = entity.entityID LEFT JOIN city ON users.cityID = city.cityID WHERE users.userStatus = 'Active' AND users.userID =" + req.user;

  var object0 = await sequelize.query(statment, { type: QueryTypes.SELECT });

  if (object0.length == 0) {
    return next(new AppError('User not found', 400));
  }

  var getDetails = object0[0];
  var batch;
  if (object0[0].userBatchId == 1) {
    batch = "Morning"
  }
  else if (object0[0].userBatchId == 2) {
    batch = "Afternoon"
  }
  else {
    batch = "Evening"
  }

  var getUserDetails = Object.assign(getDetails, { batchName: batch });


  var msg = {}
  msg['status'] = true;
  msg['message'] = 'User Details get successfully!';
  msg['data'] = getUserDetails
  res.json(msg);

};

exports.getRewardList= async(req, res, next)=>{
  try {
    if(req.user==req.body.loginuserID && req.body.loginuserID!=''){
          var statement= "Select rewardshistory.rewardID, rewardshistory.rewardRefID, rewardshistory.rewardType, rewardshistory.rewardPoints, rewardshistory.rewardDate, rewardshistory.rewardNote, rewardshistory.rewardTitle from rewardshistory where rewardshistory.userID= "+ req.body.loginuserID;  //+" AND rewardshistory.rewardNote='Referring Bonus' AND rewardshistory.rewardNote='Exam bonus'";
          var history= await sequelize.query(statement, {type: QueryTypes.SELECT});
          //, CASE WHEN rewardshistory.rewardType='Test' THEN (SELECT exams.examName from exams INNER JOIN rewardshistory ON exams.examID=rewardshistory.rewardRefID where rewardshistory.userID= "+ req.body.loginuserID+ ") WHEN rewardshistory.rewardType='Referral' THEN (SELECT users.userFullName from users INNER JOIN rewardshistory ON users.userID=rewardshistory.rewardRefID where rewardshistory.userID= "+ req.body.loginuserID+ ") END AS ReferedUserName
          if(history.length==0){
           return res.status(200).json({
              status: false,
              message: 'No bonus',
            });
          }

          for(let i=0;i<history.length;i++){
              if(history[i].rewardType=='Test'){
                let ID= history[i].rewardRefID;
                let statement="SELECT exams.examName from exams where exams.examID= "+ID;
                let examName= await sequelize.query(statement, {type: QueryTypes.SELECT});
                console.log(examName);
                history[i].referedUserName=examName[0].examName;
              }
              else if(history[i].rewardType=='Referral'){
                let ID= history[i].rewardRefID;
                let statement="SELECT users.userFullName from users where users.userID= "+ID;
                let userName= await sequelize.query(statement, {type: QueryTypes.SELECT});
                console.log(userName);
                history[i].referedUserName=userName[0].userFullName;
              }
          }

          var totalPoints=0;
          for(let i=0;i< history.length; i++){
              totalPoints= totalPoints+ history[i].rewardPoints;
          }

          res.status(200).json({
            status: true,
            message: 'Reward list given',
            TotalRewards: totalPoints,
            data: history
          });
    } 
    else{
      return next(new AppError('Token and userID not in a match',400));
    }
  } catch (error) {
   return next(error)
  }
}