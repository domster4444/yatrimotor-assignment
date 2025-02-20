const BlogModel = require('../models/blogModel.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js');
const { addFile, deleteFile } = require('../utils/fileManipulation.js');

const ErrorHandler = require('../utils/errorHandler.js');

//TODO: CREATE RECORD
exports.createRecord = catchAsyncErrors(async (req, res, next) => {
  const Folder_Name = 'main-website';

  try {
    let coverImage = null;

    if (req.file) {
      const fileName = `${Date.now()}.png`;
      await addFile(Folder_Name, fileName, req.file.buffer)
        .then((filePath) => {
          coverImage = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
        });
    }

    const newRecordData = {
      attachment: coverImage,
      ...req.body,
    };

    const newRecord = new BlogModel(newRecordData);
    await newRecord.save();

    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      data: newRecord,
    });
  } catch (error) {
    return next(new ErrorHandler('Error creating record', 500));
  }
});

//TODO: GET ALL RECORD FOR A User
exports.getAllRecordForUser = catchAsyncErrors(async (req, res, next) => {
  const record = await BlogModel.find({}).exec();

  if (!record) {
    return next(new ErrorHandler('No Record found', 404));
  }

  return res.status(200).json({
    success: true,
    message: 'Record fetched successfully',
    data: record,
  });
});

//TODO: GET SINGLE
exports.getSingleRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await BlogModel.findById({
    _id: id,
  }).exec((error, record) => {
    if (error) {
      return next(new ErrorHandler('Server error', 500));
    }
    if (!record) {
      return next(new ErrorHandler('Record not found', 404));
    }
    return res.status(200).json({
      success: true,
      message: 'Record fetched successfully',
      data: record,
    });
  });
});

//TODO: UPDATE RECORD
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const Folder_Name = 'main-website';

  try {
    const existingRecord = await BlogModel.findById({
      _id: id,
    }).exec();

    if (!existingRecord) {
      return next(new ErrorHandler('Record not found', 404));
    }

    let coverImage = existingRecord.attachment;

    let fileName = null;
    if (req.file) {
      if (coverImage) {
        await deleteFile(Folder_Name, coverImage)
          .then(() => {})
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
            return next(new ErrorHandler('Error deleting file', 500));
          });
      }

      fileName = `${Date.now()}.png`;
      await addFile(Folder_Name, fileName, req.file.buffer)
        .then((filePath) => {
          coverImage = fileName;
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
          return next(new ErrorHandler('Error uploading file', 500));
        });
    }

    existingRecord.set(updateData);
    if (fileName !== null) {
      existingRecord.attachment = fileName;
    }

    await existingRecord.save();

    return res.status(200).json({
      success: true,
      message: 'Record has been updated successfully!',
      data: existingRecord,
    });
  } catch (err) {
    return next(new ErrorHandler('Server Error, Try Again Later', 500));
  }
});

//TODO: DELETE RECORD
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const Folder_Name = 'main-website';

  try {
    const existingRecord = await BlogModel.findById(id).exec();

    if (!existingRecord) {
      return next(new ErrorHandler('Record not found', 404));
    }

    let coverImage = existingRecord.attachment;

    if (coverImage) {
      await deleteFile(Folder_Name, coverImage)
        .then(() => {})
        .catch((error) => {
          console.error(`Error deleting old file: ${error}`);
        });
    }

    await existingRecord.remove();

    return res.status(200).json({
      success: true,
      message: 'Record has been deleted successfully!',
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server Error, Try Again Later',
    });
  }
});

//TODO: GET ALL RECORD
exports.getAllRecord = catchAsyncErrors(async (req, res, next) => {
  const record = await BlogModel.find({}).exec();

  if (!record) {
    return next(new ErrorHandler('No Record found', 404));
  }

  return res.status(200).json({
    success: true,
    message: 'Record fetched successfully',
    data: record,
  });
});

// get data of single record by id
exports.getSinglePost = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await BlogModel.findById({
    _id: id,
  }).exec((error, record) => {
    if (error) {
      return next(new ErrorHandler('Server error', 500));
    }
    if (!record) {
      return next(new ErrorHandler('Record not found', 404));
    }
    return res.status(200).json({
      success: true,
      message: 'Record fetched successfully',
      data: record,
    });
  });
});
