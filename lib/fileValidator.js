const path = require("path");
function validateUploadedFile(
  uploadedFile,
  allowedExtensions,
  allowedMIMEType,
  allowedFileSize,
) {
  const file_extension = path
    .extname(uploadedFile.originalname)
    .slice(1)
    .toLowerCase();

  if (
    !allowedExtensions.includes(file_extension) ||
    !allowedMIMEType.includes(uploadedFile.mimetype)
  ) {
    throw {
      message: "Invalid File !",
      uploadedFilemimetype: uploadedFile.mimetype,
      uploadedFileoriginalname: uploadedFile.originalname,
      uploadedFilesize: uploadedFile.size,
    };
  }

  if (uploadedFile.size / (1024 * 1024) > allowedFileSize) {
    throw "File too large !";
  }
}

module.exports = validateUploadedFile;
