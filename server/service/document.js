const base64toFile = require('node-base64-to-file');
const { unlink } = require('node:fs/promises');
const axios = require('axios');
const { log } = require('node:console');
exports.uploadDocument = async (base64String, name, type, fileId) => {

  const document = `data:${type};base64,`.concat(base64String);

  console.log(`${process.env.PATH_FILE}${fileId}//`);
  console.log({base64String});

  await base64toFile(base64String,
    {
      filePath: `${process.env.PATH_FILE}${fileId}//`,
      fileName: name,
      types: [type],
      fileMaxSize: 1000000000
    }
  );


};


exports.deleteDocument = async (document) => {

  try {
    await unlink(process.env.PATH_FILE + document.fileId + "//" + document.name);
    console.log('successfully deleted /tmp/hello');
  }

  catch (error) {
    console.error('there was an error:', error.message);
  }
}

exports.getOpenDocument = (res, path, fileName) => {
  const options = {
    root: path
  };
  console.log(path);
  console.log(fileName);
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });

}

exports.verifyDocument = async (path) => {

}