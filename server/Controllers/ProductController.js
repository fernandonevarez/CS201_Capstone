
const path = require("path")
const fs = require("fs")
const cloudinary = require("cloudinary").v2;

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const Product = require("../Model/ProductSchema");


const createProduct = async (req, res) => {
  // req.body.createdBy = req.user.userID;

  const { name, price, description } = req.body;

  const imageArray = req.files.imageArray;


  const imageURLS = [];
  console.log(imageArray)
  console.log(`length: ${imageArray.length}`)

  // req.files.imageArray.forEach(async (each) => {
  //   const result = await cloudinary.uploader.upload(
  //     each.tempFilePath,
  //     {
  //       use_filename: true,
  //       folder: "Store_Images_uploader"
  //     }
  //   );
  //   fs.unlinkSync(each.tempFilePath);
  //   imageURLS.push(result.secure_url);

  //   console.log(imageURLS);
  //   // console.table(result);
  // })

  // document.getElementById
  // if (imageArray.length = 1 ) {
  const imageResultOne = await cloudinary.uploader.upload(
    req.files.imageArray[0].tempFilePath,
    {
      use_filename: true,
      folder: "file-uploader"
    },
  );
  fs.unlinkSync(req.files.imageArray[0].tempFilePath);
  imageURLS.push(imageResultOne.secure_url);


  // } else if (imageArray.length = 2) {

  const imageResultTwo = await cloudinary.uploader.upload(
    req.files.imageArray[1].tempFilePath,
    {
      use_filename: true,
      folder: "file-uploader"
    },
  );
  fs.unlinkSync(req.files.imageArray[1].tempFilePath);
  imageURLS.push(imageResultTwo.secure_url);
  // }
  // } else if (imageArray.length = 3) {
  // const imageResultThree = await cloudinary.uploader.upload(
  //   req.files.imageArray[2].tempFilePath,
  //   {
  //     use_filename: true,
  //     folder: "file-uploader"
  //   },
  // )
  // fs.unlinkSync(req.files.imageArray[2].tempFilePath)
  // imageURLS.push(imageResultThree.secure_url);
  // } else if (imageArray.length = 4) {
  // const imageResultFour = await cloudinary.uploader.upload(
  //   req.files.imageArray[3].tempFilePath,
  //   {
  //     use_filename: true,
  //     folder: "file-uploader"
  //   },
  // )
  // fs.unlinkSync(req.files.imageArray[3].tempFilePath)
  // imageURLS.push(imageResultFour.secure_url);
  // }
  console.log(imageURLS);
  console.log({ name: name, price: price, description: description, image: imageURLS })
  // const product = await Product.create({ name: name, price: price, description: description, image: imageURLS });

  // res.status(StatusCodes.CREATED).json({ product });




  // stringify json
  // console.log('test');

  // console.log(imageURLS);








  // res.status(StatusCodes.OK).json();
}

const getAllProduct = async (req, res) => {
  // res.json({ data: "GetAllProduct" });
  const products = await Product.find({}).sort("Created at");

  res.status(StatusCodes.OK).json({ products, length: products.length });
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