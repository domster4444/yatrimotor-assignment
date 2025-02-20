const fs = require('fs');
const path = require('path');

// Define the directory where you want to store files
const storageDirectory = path.join(__dirname, '../storage');

// Function to add a file to the server
const addFile = (schoolUniqueId, fileName, fileData) => {
  // create folder with name schoolUniqueId inside storageDirectory present in "../storage" if no folder with name schoolUniqueId exists
  // then create a file with name fileName inside the folder created above and if the file already exists then simply add this file to the folder

  // if that folder with name schoolUniqueId dont exist then create it inside storage
  if (!fs.existsSync(path.join(storageDirectory, schoolUniqueId))) {
    fs.mkdirSync(path.join(storageDirectory, schoolUniqueId));
  }

  // create a file with name fileName inside the folder created above and if the file already exists then simply add this file to the folder
  const filePath = path.join(storageDirectory, schoolUniqueId, fileName);

  return new Promise(async (resolve, reject) => {
    // Write file to the server
    await fs.writeFile(filePath, fileData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });

    // compress the image
  });
};

// Function to delete a file from the server
const deleteFile = (schoolUniqueId, fileName) => {
  // inside storage there is a folder with name schoolUniqueId , delete the file with name fileName inside that folder
  const filePath = path.join(storageDirectory, schoolUniqueId, fileName);

  return new Promise((resolve, reject) => {
    // Delete file from the server
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = { addFile, deleteFile };

// usage
// fileManipulation
//   .addFile(fileName, uploadedFile.buffer)
//   .then((filePath) => {
//     console.log(`File ${fileName} added at path: ${filePath}`);
//     // Handle success
//   })
//   .catch((error) => {
//     console.error(`Error adding file: ${error}`);
//     // Handle error
//   });

// fileManipulation
//   .deleteFile(fileName)
//   .then((result) => {
//     console.log(`File ${fileName} deleted: ${result}`);
//     // Handle success
//   })
//   .catch((error) => {
//     console.error(`Error deleting file: ${error}`);
//     // Handle error
//   });
