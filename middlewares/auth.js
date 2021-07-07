const jwt = require('jsonwebtoken');
const { promisify } = require('util');
// const { client } = require('../redis-connection');

// const Admin = require('../models/admin/admin');
const Student = require('../models/student/student');

const AppError = require('../utils/appError');

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token check of it's there
    let token;

    const { authorization, apitype, apiversion } = req.headers;

    if (!apitype || !apiversion) 
    {
      return next(new AppError('Please provide required headers', 400));
    }

    if (authorization && authorization.startsWith('Bearer')) 
    {
      token = authorization.split(' ')[1];
    }

    if (!token) 
    {
      return next(new AppError('Please provide authorization headers', 401));
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);

    // 3) check if admin still exits
    const currentUser = await Student.findOne({ where: { userId: decoded.user } });
    if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exists', 401));
    }



    // Grant access to protected route
    req.user = decoded.user;
    next();
  } catch (error) {
    // return next(error);
    const refreshToken = req.header('x-refresh-token');

    if (!refreshToken) {
      return next(new AppError('Please provide x-refresh-token authorization headers', 401));
    }

    try {
      const decodedRefreshToken = await promisify(jwt.verify)(refreshToken, process.env.JWT_REFRESH_KEY);

      const currentRefreshUser = await Student.findOne({ where: { userId: decodedRefreshToken.user } });

      if (!currentRefreshUser) {
        return next(new AppError('The user belonging to this token does no longer exists', 401));
      }

      const newToken = jwt.sign({ user: currentRefreshUser.userID }, process.env.JWT_KEY, {
        expiresIn: '5h',
      });

      res.set('authorization', `Bearer ${newToken}`);

      req.user = decodedRefreshToken.user;

      next();
    } catch (error) {
      return next(error);
    }
  }
};

// exports.auth = (req, res, next) => {
//   var email = req.header('email');

//   client.get(email, function (err, value) {
//     if (err) {
//       throw err;
//     } else {
//       console.log(value);
//       if (value == null) {
//         res.send('You have been logged out');
//         return;
//       } else {
//         next();
//       }
//     }
//   });
// };
