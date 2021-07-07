const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../../database/database');
const Op = Sequelize.Op
const AppError = require('../../utils/appError');

exports.getFaqs = async (req, res, next) => {
  try {
    const faqs = await sequelize.query("SELECT * FROM faq INNER JOIN faqtype ON faqtype.faqtypeID = faq.faqtypeID WHERE faq.faqStatus = 'Active'", { type: QueryTypes.SELECT });

    if (faqs.length == 0) {
      return next(new AppError('Contact Us Not Found', 400));
    }
    res.status(200).json({
      status: true,
      message: 'FAQs given',
      data: {
        faqs,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.aboutUs = async (req, res, next) => {
  try {
    const aboutus = await sequelize.query("SELECT * FROM `cmspage` WHERE `cmspageName` LIKE '%About Us%' AND `cmspageStatus` = 'Active'", { type: QueryTypes.SELECT });

    if (aboutus.length == 0) {
      return next(new AppError('About Us Not Found', 400));
    }
    res.status(200).json({
      status: true,
      message: 'About Us given',
      data: {
        aboutus,
      },
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.contactUs = async (req, res, next) => {
  try {
    const contactus = await sequelize.query("SELECT * FROM `cmspage` WHERE `cmspageName` LIKE '%Contact Us%' AND `cmspageStatus` = 'Active'", { type: QueryTypes.SELECT });

    if (contactus.length == 0) {
      return next(new AppError('Contact Us Not Found', 400));
    }

    res.status(200).json({
      status: true,
      message: 'Contact Us given',
      data: { contactus }

    });
  } catch (error) {
    return next(error);
  }
};

exports.privacyPolicy = async (req, res, next) => {
  try {
    const privacypolicy = await sequelize.query("SELECT * FROM `cmspage` WHERE `cmspageName` LIKE '%Privacy Policy%' AND `cmspageStatus` = 'Active'", { type: QueryTypes.SELECT });

    if (privacypolicy.length == 0) {
      return next(new AppError('Privacy Policy Not Found', 400));
    }
    res.status(200).json({
      status: true,
      message: 'Privacy Policy given',
      data: {
        privacypolicy,
      },
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.termsAndCondition = async (req, res, next) => {
  try {
    const termsconditions = await sequelize.query("SELECT * FROM `cmspage` WHERE `cmspageName` LIKE '%Terms & Conditions%' AND `cmspageStatus` = 'Active'", { type: QueryTypes.SELECT });

    if (termsconditions.length == 0) {
      return next(new AppError('Terms & Conditions Not Found', 400));
    }
    res.status(200).json({
      status: true,
      message: 'Terms & Conditions given',
      data: {
        termsconditions,
      },
    });
  } catch (error) {
    return next(error);
  }
};
