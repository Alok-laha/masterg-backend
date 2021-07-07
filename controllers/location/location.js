const { Country } = require('../../models/country/country');
const { State } = require('../../models/state/state');
const { City } = require('../../models/city/city');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const AppError = require('../../utils/appError');

// this router gives us all the countries from database

exports.getCountries = async (req, res, next) => {
  try {
    const { apitype, apiversion } = req.headers;

    let limit = 3;
    let offset = 0 + (req.params.page - 1) * limit;

    const country = await Country.findAll({
      attributes: ['countryID', 'countryName', 'countryDialCode'],
      where: [{ countryName: { [Op.like]: req.body.searchWord + '%' } }, { countryStatus: 'Active'}],
      offset: offset
    });

    if (req.body.searchWord == '' && req.body.countryName == '') {
      res.status(200).json({
        status: true,
        message: 'Countries given',
        data: {
          country,
        },
      });
    }
    else if (req.body.searchWord != '' && req.body.countryName == '') {
      res.status(200).json({
        status: true,
        message: 'Countries given',
        data: {
          country,
        },
      });
    }
    else if (req.body.searchWord == '' && req.body.countryName != '') {
      const country = await Country.findAll({
        attributes: ['countryID', 'countryName'],
        where: [{ countryName: { [Op.like]: req.body.countryName } }, { countryStatus: 'Active'}],
      });

      if (country.length > 0) {
        res.status(200).json({
          status: true,
          message: 'Countries given',
          data: {
            country,
          },
        });
      }
      else {
        const jane = await Country.create({ countryName: req.body.countryName });

        const country = await Country.findAll({
          attributes: ['countryID', 'countryName'],
          where: [{ [Op.and]: [{ countryID: jane.countryID }] }, { countryStatus: 'Active'}]
        });
        res.status(200).json({
          status: true,
          message: 'Countries given',
          data: {
            country,
          },
        });
      }
    }
    else 
    {
      return next(new AppError('Please find the searchWord and countryName one of these two is required.', 400));
    }

  } catch (error) {
    return next(error);
  }
};

// passing countryID in body to get the state details for that countryID

exports.getStates = async (req, res, next) => {
  try {
    const { apitype, apiversion } = req.headers;

    let limit = 3;
    let offset = 0 + (req.params.page - 1) * limit;
    const state = await State.findAll({
      attributes: ['stateID', 'stateName'],
      where: [{ countryID: req.body.countryID }, { stateName: { [Op.like]: req.body.searchWord + '%' } }, {stateStatus: 'Active'}],
      offset: offset
    });

    if (req.body.countryID == '') {
      return next(new AppError('Please provide both the ID', 400));
    }
    if (req.body.searchWord == '' && req.body.stateName == '') {
      if (!state) {
        return next(new AppError('No states for given countryID', 400));
      }
      else {
        res.status(200).json({
          status: true,
          message: 'States for the selected countryID',
          data: {
            state,
          },
        });
      }
    }
    else if (req.body.searchWord != '' && req.body.stateName == '') {
      if (!state) {
        return next(new AppError('No states for given countryID', 400));
      }
      else {
        res.status(200).json({
          status: true,
          message: 'States for the selected countryID',
          data: {
            state,
          },
        });
      }
    }
    else if (req.body.searchWord == '' && req.body.stateName != '') {
      const state = await State.findAll({
        attributes: ['stateID', 'stateName'],
        where: [{ stateName: { [Op.like]: req.body.stateName } }, { stateStatus : 'Active'}]
      });

      if (state.length > 0) {
        res.status(200).json({
          status: true,
          message: 'States for the selected countryID',
          data: {
            state,
          },
        });
      }
      else {
        const jane = await State.create({ countryID: req.body.countryID, stateName: req.body.stateName });

        const state = await State.findAll({
          attributes: ['stateID', 'stateName'],
          where: [{ [Op.and]: [{ stateID: jane.stateID }] }, { stateStatus: 'Active'}]
        });
        res.status(200).json({
          status: true,
          message: 'States for the selected countryID',
          data: {
            state,
          },
        });
      }
    }
    else {
      return next(new AppError('Please find the searchWord and stateName one of these two is required.', 400));
    }

  } catch (error) {
    return next(error);
  }
};

// passing countryID and stateID in body to get the city details
// for that countryID and stateID
exports.getCities = async (req, res, next) => {
  try {
    const { apitype, apiversion } = req.headers;

    let limit = 3;
    let offset = 0 + (req.params.page - 1) * limit;
   
    const city = await City.findAll({
      attributes: ['cityID','cityName'],
      where: [{
        [Op.and]: [
          { countryID: req.body.countryID },
          { stateID: req.body.stateID }]
      },
      { cityName: { [Op.like]: req.body.searchWord + '%' } },
      {cityStatus: 'Active'}
      ],
      offset: offset
    });

    if (req.body.countryID == '' || req.body.stateID == '') 
    {
        const city = await City.findAll({
          attributes: ['cityID', 'cityName'],
          where: [{ [Op.and]: [{ countryID: req.body.countryID }] }, {cityStatus: 'Active'} ],
          offset: offset
        });

        res.status(200).json({
          status: true,
          message: 'Cities for the selected countryID and stateID',
          data: {
            city,
          },
        });
        
    }
    if (req.body.searchWord == '' && req.body.cityName != '') 
    {

      const city = await City.findAll({
        attributes: ['cityID', 'cityName'],
        where: [{ [Op.and]: [{ countryID: req.body.countryID }, { stateID: req.body.stateID }] }, { cityName: req.body.cityName }, {cityStatus: 'Active'}],
        offset: offset
      });
      if (city.length > 0) 
      {
        res.status(200).json({
          status: true,
          message: 'Cities for the selected countryID and stateID',
          data: {
            city,
          },
        });
      }
      else 
      {
        const jane = await City.create({ countryID: req.body.countryID, stateID: req.body.stateID, cityName: req.body.cityName });
        const city = await City.findAll({
          attributes: ['cityID', 'cityName'],
          where: [{ [Op.and]: [{ cityID: jane.cityID }] }, {cityStatus: 'Active'}]
        });
        res.status(200).json({
          status: true,
          message: 'Cities for the selected countryID and stateID',
          data: {
            city,
          },
        });
      }

    }
    else if (req.body.searchWord != '' && req.body.cityName == '') 
    {

      if (!city) 
      {
        return next(new AppError('No cities for given countryID and stateID', 400));
      }
      else 
      {
        res.status(200).json({
          status: true,
          message: 'Cities for the selected countryID and stateID',
          data: {
            city,
          },
        });
      }
    }
    else if (req.body.searchWord == '' && req.body.cityName == '') 
    {
      if (!city) 
      {
        return next(new AppError('No cities for given countryID and stateID', 400));
      }
      else 
      {
        res.status(200).json({
          status: true,
          message: 'Cities for the selected countryID and stateID',
          data: {
            city,
          },
        });
      }
    }
    else 
    {
      return next(new AppError('Please find the searchWord and cityName one of these two is required.', 400));
    }

  } catch (error) {
    return next(error);
  }
};
