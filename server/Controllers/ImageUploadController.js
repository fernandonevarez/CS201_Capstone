const path = require("path")
const fs = require("fs")
const cloudinary = require("cloudinary").v2;


const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-uploader"
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(200).json({ image: { src: result.secure_url } })
}

module.exports = { uploadImage }
