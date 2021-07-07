const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const logs = require('../../utils/saveLog');
const Admin = require('../../models/admin/admin');
const AppError = require('../../utils/appError');

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { apitype, apiversion } = req.headers;

    const lodData = {
      apiName: req.originalUrl,
      apiIP: req.ip,
      apiRequest: req.method,
      apiType: apitype,
      apiVersion: apiversion,
    };

    if (!apitype || !apiversion) {
      lodData.apiResponse = '400';
      await logs.saveLogs(lodData);
      return next(new AppError('Please provide required headers', 400));
    }

    if (!email || !password) {
      lodData.apiResponse = '400';
      await logs.saveLogs(lodData);
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await Admin.findOne({ where: { Admin_Email: email } });

    const validPassword = await bcrypt.compare(password, user.Admin_Password);

    if (!validPassword) {
      lodData.apiResponse = '400';
      await logs.saveLogs(lodData);
      return next(new AppError('Invalid login details', 400));
    }

    const token = jwt.sign({ user: user.Admin_Email }, process.env.JWT_KEY, {
      expiresIn: '1d',
    });

    lodData.apiResponse = '200';
    await logs.saveLogs(lodData);

    res.status(200).json({
      status: true,
      token,
      message: 'Login success',
    });

    // res.status(200).json({
    //   status: true,
    //   message: 'Login success',
    // });
  } catch (error) {
    return next(error);
  }
};

exports.test = async (req, res, next) => {
  console.log(req.user);
  res.status(200).json({
    status: true,
  });
};
