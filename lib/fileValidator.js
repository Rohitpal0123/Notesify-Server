const path = require("path");
function validateUploadedFile(
  uploadedFile,
  allowedExtensions,
  allowedMIMEType,
  allowedFileSize
) {
  try {
    const file_extension = path
      .extname(uploadedFile.originalname)
      .slice(1)
      .toLowerCase();

    if (
      !allowedExtensions.includes(file_extension) ||
      !allowedMIMEType.includes(uploadedFile.mimetype)
    ) {
      throw "Invalid File !";
    }

    if (uploadedFile.size / (1024 * 1024) > allowedFileSize) {
      throw "File too large !";
    }
  } catch (error) {
    throw error;
  }
}

module.exports = validateUploadedFile;
