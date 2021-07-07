const { Categorylevel1 } = require('../../models/categorylevel1/categorylevel1');
const { Categorylevel2 } = require('../../models/categorylevel2/categorylevel2');
const { Categorylevel3 } = require('../../models/categorylevel3/categorylevel3');
const { Categorylevel4 } = require('../../models/categorylevel4/categorylevel4');
const AppError = require('../../utils/appError');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../database/database');

// passing entityID in body to get the categorylevel1 details
exports.getCategoryLevel1 = async (req, res, next) => {
  try {
    const { apitype, apiversion } = req.headers;
    if (req.body.entityID == '') {
      return next(new AppError('Please provide entityID', 400));
    }
    var pageNo = parseInt(req.query.pageNo)
    var limit = parseInt(req.query.size)

    let startindex = (pageNo - 1) * limit;
    let endindex = pageNo * limit;

    if (pageNo < 0 || pageNo === 0) {
      return next(new AppError('invalid page number, should start with 1', 400));
  }

    var categorylevel1;
    if (req.body.searchWord != "" && req.body.searchWord != null) {

      var statment = "SELECT categorylevel1ID,categorylevel1Name  FROM `categorylevel1`  WHERE `categorylevel1Name` LIKE '" + req.body.searchWord + "%' AND entityID = " + req.body.entityID + " AND categorylevel1Status = 'Active'";

      var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
      if (result.length <= 0) {
        return next(new AppError('Data Not Found', 400));
      }

      categorylevel1 = result.slice(startindex, endindex)
    }
    else {
      var statment = "SELECT  categorylevel1ID,categorylevel1Name  FROM `categorylevel1` WHERE categorylevel1Status = 'Active' AND entityID = " + req.body.entityID + "";

      var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
      if (result.length <= 0) {
        return next(new AppError('Data Not Found', 400));
      }
      categorylevel1 = result.slice(startindex, endindex)
    }
    res.status(200).json({
      status: true,
      message: 'categorylevel1Name for the selected entityID',
      data: {
        categorylevel1,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// passing entityID and categorylevel1ID in body to get the categorylevel2 details
exports.getCategoryLevel2 = async (req, res, next) => {
  try {
    const { apitype, apiversion } = req.headers;
    if (req.body.entityID == '' || req.body.categorylevel1ID == '') {
      return next(new AppError('Please provide both the ID', 400));
    }

    var pageNo = parseInt(req.query.pageNo)
    var limit = parseInt(req.query.size)

    let startindex = (pageNo - 1) * limit;
    let endindex = pageNo * limit;

    if (pageNo < 0 || pageNo === 0) {
      return next(new AppError('invalid page number, should start with 1', 400));
  }

    var categorylevel2;
    if (req.body.searchWord != "" && req.body.searchWord != null) {

      var statment = "SELECT categorylevel2ID,categorylevel2Name  FROM `categorylevel2`  WHERE `categorylevel2Name` LIKE '" + req.body.searchWord + "%' AND entityID = " + req.body.entityID + " AND categorylevel1ID = " + req.body.categorylevel1ID + " AND categorylevel2Status = 'Active'";

      var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
      if (result.length <= 0) {
        return next(new AppError('Data Not Found', 400));
      }

      categorylevel2 = result.slice(startindex, endindex)
    }
    else {
      var statment = "SELECT categorylevel2ID,categorylevel2Name  FROM `categorylevel2` WHERE entityID = " + req.body.entityID + " AND categorylevel1ID = " + req.body.categorylevel1ID + " AND categorylevel2Status = 'Active'";

      var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
      if (result.length <= 0) {
        return next(new AppError('Data Not Found', 400));
      }
      categorylevel2 = result.slice(startindex, endindex)
    }

    res.status(200).json({
      status: true,
      message: 'categorylevel2Name for the selected entityID and categorylevel1ID',
      data: {
        categorylevel2,
      },
    });

  } catch (error) {
    return next(error);
  }
};

// passing entityID, categorylevel1ID and categorylevel2ID
// in body to get the categorylevel3 details
exports.getCategoryLevel3 = async (req, res, next) => {
  try {
    const { apitype, apiversion } = req.headers;

    if (req.body.entityID == '' || req.body.categorylevel1ID == '' || req.body.categorylevel2ID == '') {
      return next(new AppError('Please provide both the ID', 400));
    }

    var pageNo = parseInt(req.query.pageNo)
    var limit = parseInt(req.query.size)

    let startindex = (pageNo - 1) * limit;
    let endindex = pageNo * limit;

    if (pageNo < 0 || pageNo === 0) {
      return next(new AppError('invalid page number, should start with 1', 400));
  }

    var categorylevel3;
    if (req.body.searchWord != "" && req.body.searchWord != null) {
      var statment = "SELECT categorylevel3ID,categorylevel3Name  FROM `categorylevel3`  WHERE `categorylevel3Name` LIKE '" + req.body.searchWord + "%' AND entityID = " + req.body.entityID + " AND categorylevel1ID = " + req.body.categorylevel1ID + " AND categorylevel2ID = " + req.body.categorylevel2ID + " AND categorylevel3Status = 'Active'";

      var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
      if (result.length <= 0) {
        return next(new AppError('Data Not Found', 400));
      }

      categorylevel3 = result.slice(startindex, endindex)
    }
    else {
      var statment = "SELECT categorylevel3ID,categorylevel3Name  FROM `categorylevel3` WHERE entityID = " + req.body.entityID + " AND categorylevel1ID = " + req.body.categorylevel1ID + " AND categorylevel2ID = " + req.body.categorylevel2ID + " AND categorylevel3Status = 'Active'";

      var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
      if (result.length <= 0) {
        return next(new AppError('Data Not Found', 400));
      }
      categorylevel3 = result.slice(startindex, endindex)
    }

    res.status(200).json({
      status: true,
      message: 'categorylevel3Name for the selected entityID, categorylevel1ID and categorylevel2ID',
      data: {
        categorylevel3,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// passing entityID, categorylevel1ID, categorylevel2ID and categorylevel3ID
// in body to get the categorylevel4 details
exports.getCategoryLevel4 = async (req, res, next) => {
  try {
    const { apitype, apiversion } = req.headers;

    if (req.body.entityID == '' || req.body.categorylevel1ID == '' || req.body.categorylevel2ID == '' || req.body.categorylevel3ID == '') {
      return next(new AppError('Please provide both the ID', 400));
    }

    var pageNo = parseInt(req.query.pageNo)
    var limit = parseInt(req.query.size)

    let startindex = (pageNo - 1) * limit;
    let endindex = pageNo * limit;

    if (pageNo < 0 || pageNo === 0) {
      return next(new AppError('invalid page number, should start with 1', 400));
  }

    var categorylevel4;
    if (req.body.searchWord != "" && req.body.searchWord != null) {
      var statment = "SELECT categorylevel4ID,categorylevel4Name  FROM `categorylevel4`  WHERE `categorylevel4Name` LIKE '" + req.body.searchWord + "%' AND entityID = " + req.body.entityID + " AND categorylevel1ID = " + req.body.categorylevel1ID + " AND categorylevel2ID = " + req.body.categorylevel2ID + " AND categorylevel3ID = " + req.body.categorylevel3ID + " AND categorylevel4Status = 'Active'";

      var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
      if (result.length <= 0) {
        return next(new AppError('Data Not Found', 400));
      }

      categorylevel4 = result.slice(startindex, endindex)
    }
    else {
      var statment = "SELECT categorylevel4ID,categorylevel4Name  FROM `categorylevel4`  WHERE  entityID = " + req.body.entityID + " AND categorylevel1ID = " + req.body.categorylevel1ID + " AND categorylevel2ID = " + req.body.categorylevel2ID + " AND categorylevel3ID = " + req.body.categorylevel3ID + " AND categorylevel4Status = 'Active'";

      var result = await sequelize.query(statment, { type: QueryTypes.SELECT });
      if (result.length <= 0) {
        return next(new AppError('Data Not Found', 400));
      }
      categorylevel4 = result.slice(startindex, endindex)
    }

    res.status(200).json({
      status: true,
      message: 'categorylevel4Name for the selected entityID, categorylevel1ID, categorylevel2ID and categorylevel3ID',
      data: {
        categorylevel4,
      },
    });
  } catch (error) {
    return next(error);
  }
};
