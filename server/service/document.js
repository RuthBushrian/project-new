const base64toFile = require('node-base64-to-file');
const { unlink } = require('node:fs/promises');
exports.uploadDocument = async (base64String, name, type, fileId) => {

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
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
}