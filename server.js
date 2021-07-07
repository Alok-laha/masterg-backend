const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
require('dotenv').config();
const cors = require('cors');
const uuid = require('uuid');
const referralCodeGenerator = require('referral-code-generator');

const app = express();
const db = require('./database/database');
const globalErrorHandler = require('./utils/errorController');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//require routes
const studentRoutes = require('./routes/students/student');
const otpRoutes = require('./routes/otp/otp');
const infoRoutes = require('./routes/info/info');
const entity = require('./routes/entity/entity');
const categorylevel = require('./routes/categoryLevel/categoryLevel');
const locationRoutes = require('./routes/location/location');
const coursesRoutes = require('./routes/courses/courses');
const subjectsRoutes = require('./routes/subjects/subjects');
const coursechaptersRoutes = require('./routes/coursechapters/coursechapters');
const coursetopicsRoutes = require('./routes/coursetopics/coursetopics');
const examsRoutes = require('./routes/exams/exams');
const questionbankRoutes = require('./routes/questionbank/questionbank');
const assignmentRoutes = require('./routes/assignment/assignment');
const forumsRoutes = require('./routes/forums/forums');
const notificationRoutes = require('./routes/notification/notification');
const cmspageRoutes = require('./routes/cmspage/cmspage');
const myaccountRoutes = require('./routes/myaccount/myaccount');
const subscriptionRoutes = require('./routes/membership/membership');

//define body paresr
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', extended: true, parameterLimit: 50000 }));
//using multer
let fileStorage;
if (process.env.NODE_ENV == 'production') {
  fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'photos');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
} else {
  fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/photos', express.static(path.join(__dirname, 'photos')));

app.use(cors());

//using routes
app.use('/student', studentRoutes);
app.use('/otp', otpRoutes);
app.use('/info', infoRoutes);
app.use('/entity', entity);
app.use('/categorylevel', categorylevel);
app.use('/location', locationRoutes);
app.use('/courses', coursesRoutes);
app.use('/subjects', subjectsRoutes);
app.use('/coursechapters', coursechaptersRoutes);
app.use('/coursetopics', coursetopicsRoutes);
app.use('/exams', examsRoutes);
app.use('/questionbank', questionbankRoutes);
app.use('/assignment', assignmentRoutes);
app.use('/forums', forumsRoutes);
app.use('/notification',notificationRoutes);
app.use('/cmspage',cmspageRoutes);
app.use('/myaccount',myaccountRoutes);
app.use('/membership', subscriptionRoutes);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: false,
    message: 'Requested API not found',
  });
});

const testConnection = async () => {
  try {
    await db.authenticate();
    console.log('mysql connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the mysql database:', error);
  }
};

testConnection();
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log('masterG server is running.....');
});
