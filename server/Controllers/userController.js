const User = require("../Model/userSchema");
const Product = require("../Model/ProductSchema");
const { BadRequestError, UnauthError } = require("../errors");
require("dotenv").config();

const addingFavorite = async (req, res) => {
  const { userID, productID } = req.params;
  const { user, product } = await Promise.all([
    User.findById(userID),
    Product.findById(productID),
  ]);

  if (!user || !product) {
    throw new BadRequestError("Invalid user or product");
  }

  user.favorites.push(product);
  user.save();
  // res.status(200).json({ user });
  console.log({ user });
}

const removeFavorite = async (req, res) => {
  const { userID, productID } = req.params;
  const { user, product } = await Promise.all([
    User.findById(userID),
    Product.findById(productID),
  ]);

  if (!user || !product) {
    throw new BadRequestError("Invalid user or product");
  }

  user.favorites.pull(product);
  user.save();
  // res.status(200).json({ user });
  console.log({ user });
}

const getAllFavorites = async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID);

  if (!user) {
    throw new BadRequestError("Invalid user");
  }

  // res.status(200).json({ user });
  console.log({ user });
}

module.exports = {
  addingFavorite,
  removeFavorite,
  getAllFavorites
}