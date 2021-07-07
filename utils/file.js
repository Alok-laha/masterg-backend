const fs = require('fs');

const deleteFile = (filePath) => {
  if (!filePath) {
    return console.log('no file found');
  }
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log('old photo not found');
    }
  });
};

exports.deleteFile = deleteFile;
