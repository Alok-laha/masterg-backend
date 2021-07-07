const ApiLog = require('../models/apiLog');

exports.saveLogs = async (data) => {
  try {
    await ApiLog.create({
      apiName: data.apiName,
      apiIP: data.apiIP,
      apiRequest: data.apiRequest,
      apiResponse: data.apiResponse,
      apiType: data.apiType,
      apiVersion: data.apiVersion,
      apiCallDate: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
};
