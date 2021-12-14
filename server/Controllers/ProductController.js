
const path = require("path")
const fs = require("fs")
const cloudinary = require("cloudinary").v2;

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const Product = require("../Model/ProductSchema");


const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userID;

  const { name, price, description, image } = req.body;

  // const attraction = await Product.create();
  console.log(req.files.image.tempFilePath)
  const result = await cloudinary.uploader.upload(
    image,
    {
      use_filename: true,
      folder: "Store_Images_uploader"
    }
  );

  fs.unlinkSync(image);
  res.status(StatusCodes.OK).json({ name: name, price: price, description: description, image: result.secure_url })
}

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