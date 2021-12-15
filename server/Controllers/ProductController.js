
const path = require("path")
const fs = require("fs")
const cloudinary = require("cloudinary").v2;

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const Product = require("../Model/ProductSchema");


const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userID;

  const { name, price, description } = req.body;

  // const imageArray = req.files;
  // console.log(imageArray)
  // console.log(req.body);


  const imageURLS = [];
  req.files.imageArray.forEach(async (each) => {
    const result = await cloudinary.uploader.upload(
      each.tempFilePath,
      {
        use_filename: true,
        folder: "Store_Images_uploader"
      }
    );
    fs.unlinkSync(each.tempFilePath);
    imageURLS.push(result.secure_url);
    
    console.log(imageURLS);
    // console.table(result);
  })
  // stringify json
  console.log('test');
  res.status(StatusCodes.OK).json({ name: name, price: price, description: description, image: imageURLS });
};

const getAllProduct = async (req, res) => {
  res.json({ data: "GetAllProduct" });
}

const deleteProduct = async (req, res) => {
  res.json({ data: "DeleteProduct" });
}

const updateProduct = async (req, res) => {
  res.json({ data: "UpdateProduct" });
}

const getSingleProduct = async (req, res) => {
  res.json({ data: "GetSingleProduct" });
}

module.exports = { createProduct, getAllProduct, deleteProduct, updateProduct, getSingleProduct };