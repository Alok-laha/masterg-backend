const jwt = require('jsonwebtoken');

const Student = require('../../models/student/student');

const AppError = require('../../utils/appError');

exports.verifyLoginOtp = async (req, res, next) => {
  try {
    const { userName, otp } = req.body;

    if (!userName || !otp) {
      return next(new AppError('Fields are required', 400));
    }

    // find user with userName
    //const studentDetails = await Student.findOne({ where: { userMobile: userName } });

    if (userName.match(/@/g)) {
      studentDetails = await Student.findOne({ where: [{ userEmail: userName }, { userStatus: "Active" }] });
    }
    else {
      studentDetails = await Student.findOne({ where: [{ userMobile: userName }, { userStatus: "Active" }] });
    }

    if (!studentDetails || studentDetails === null || studentDetails === undefined) {
      return next(new AppError('No details found', 400));
    }



    if (!studentDetails) {
      return next(new AppError('Invalid details', 400));
    }

    if (studentDetails.userOTP != otp) {
      return next(new AppError('Invalid OTP', 400));
    }

    studentDetails.userOTP = null;
    studentDetails.userVerified = 'Yes';
    studentDetails.userSignupOTPVerified = 'Yes';

    await studentDetails.save();

    const token = jwt.sign({ user: studentDetails.userID }, process.env.JWT_KEY, {
      expiresIn: '5h',
    });

    const refreshToken = jwt.sign({ user: studentDetails.userID }, process.env.JWT_REFRESH_KEY, {
      expiresIn: '7d',
    });

    res.status(200).json({
      status: true,
      message: 'OTP verified success',
      data: {
        token,
        refreshToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.resendOtp = async (req, res, next) => {
  try {
    const { userName } = req.body;

    //check if userName exits
    if (!userName) {
      return next(new AppError('Fields are required', 400));
    }

    // check user exits in DB
    const studentDetails = await Student.findOne({ where: { userMobile: userName } });

    if (!studentDetails) {
      return next(new AppError('User not registered', 400));
    }

    //update OTP and send to user moblie //TODO
    //const otp = Math.floor(1000 + Math. random() * 9000);
    const otp = 1234;

    studentDetails.userOTP = otp.toString();

    await studentDetails.save();

    res.status(200).json({
      status: true,
      message: 'OTP send successfully',
    });
  } catch (error) {
    return next(error);
  }
};
