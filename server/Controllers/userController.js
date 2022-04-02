const User = require("../Model/userSchema");
const Product = require("../Model/ProductSchema");
const Store = require("../Model/StoreSchema");
const { BadRequestError, UnauthError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

require("dotenv").config();

// what i will have:
// userID
// product

const updateUser = async (req, res) => {
  // allow user to update their email, name, password, and profile picture
  const { userID } = req.params;
  const { email, name, password, profile_picture, hasStore } = req.body;
  const user = await User.findById(userID);
  // update the user
  if (email) {
    user.email = email;
  }
  if (name) {
    user.name = name;
  }
  if (password) {
    user.password = password;
  }
  if (profile_picture) {
    user.profile_picture = profile_picture;
  }
  if (hasStore) {
    user.hasStore = hasStore;
  }

  user.save();
  res.status(200).json({ user });
};

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
  res.status(200).json({ user });
  console.log({ user });
};

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
};

const getAllFavorites = async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID);

  if (!user) {
    throw new BadRequestError("Invalid user");
  }

  // res.status(200).json({ user });
  console.log({ user });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// User's cart

const addToCart = async (req, res) => {
  const { userID } = req.params;
  const { product } = req.body; // product is an object

  const user = await User.findById(userID);

  if (!user) {
    throw new BadRequestError(`No user with id: ${userID}`);
  }

  if (!product) {
    throw new BadRequestError(`No product with id: ${product._id}`);
  }

  console.log(product);

  // check if the product is already in the user's cart
  const isInCart = user.cart.some(
    (item) => item._id.toString() === product._id
  );

  // if the product is already in the cart, then just update the quantity
  if (isInCart) {
    user.cart.map((item) => {
      if (item._id.toString() === product._id) {
        item.quantity += 1;
      }
    });
  } else {
    // if the product is not in the cart, then add it to the cart
    user.cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      type: product.type,
      target: product.target,
      description: product.description,
      imageArray: product.imageArray,
      likes: product.likes,
      createdAt: product.createdAt,
      createdBy: product.createdBy,
      __v: product.__v,
      quantity: 1,
    });
  }

  user.save();
  res.status(StatusCodes.OK).json({ user });
};

const getUserCart = async (req, res) => {
  const { userID } = req.params;

  const user = await User.findById({ _id: userID });

  if (!user) {
    throw new BadRequestError(`No user with id: ${userID} exists`);
  }

  // find the users cart
  const cart = user.cart;

  console.log(cart);

  res.status(200).json({ cart });
  // console.log({ user });
};

const removeFromCart = async (req, res) => {
  // get the userID and productID
  const { userID, productID } = req.params;

  // find the user
  const user = await User.findById(userID);
  if (!user) {
    throw new BadRequestError(`No user with id: ${userID} exists`);
  }

  // find the product in the user's cart
  const product = user.cart.find((item) => item._id.toString() === productID);

  // if the product is not in the cart, throw an error
  if (!product) {
    throw new BadRequestError(`No product with id: ${productID} exists`);
  }

  // if the product is in the cart, then remove it
  user.cart.pull(product);

  // save the user
  user.save();

  // return the user
  res.status(StatusCodes.OK).json({ user });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const createStore = async (req, res) => {
  // create a store for the user

  const {
    body: {
      name,
      businessEmail,
      storeOwnerID,
      storeOwnerName,
      description,
      products,
    },
    files: logo,
  } = req;

  console.log("logo", logo);

  // GET THE logo
  const file = logo.logo;
  // UPLOAD THE IMAGE
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    use_filename: true,
    folder: "Store_Images_uploader",
  });
  // REMOVE THE TEMP FILE
  fs.unlinkSync(file.tempFilePath);
  // PUSH THE IMAGE URL TO THE ARRAY
  // imageURLS.push(result.secure_url);

  const user = await User.findById(storeOwnerID);

  if (!user) {
    throw new BadRequestError("Invalid user");
  }

  const store = new Store({
    name: name,
    businessEmail: businessEmail,
    storeOwnerID: storeOwnerID,
    storeOwnerName: storeOwnerName,
    logo: result.secure_url,
    description: description,
    products: products,
  });

  user.hasStore = true;

  // upadte the user's storeInfo to have the store info
  user.storeInfo = store;

  user.save();
  store.save();

  res.status(200).json({ store });
  console.log({ store });
};

const getAllStores = async (req, res) => {
  const stores = await Store.find({}).sort("createdAt");

  console.log(stores);

  res.status(StatusCodes.OK).json({ stores, length: stores.length });
};

const getStore = async (req, res) => {
  const {
    params: { storeID: id },
  } = req;

  const store = await Store.findOne({ _id: id });

  if (!store) {
    throw new BadRequestError("Invalid store");
  }

  res.status(StatusCodes.OK).json({ store });
};

const deleteStore = async (req, res) => {
  const { storeID } = req.params;
  const store = await Store.findById(storeID);

  if (!store) {
    throw new BadRequestError(
      "No store with this ID exist to delete, plaese try a differnt store ID"
    );
  }

  // delete the store
  store.remove();

  res.status(StatusCodes.OK).json({ store });
};

const updateStore = async (req, res) => {};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

module.exports = {
  addingFavorite,
  removeFavorite,
  getAllFavorites,
  updateUser,
  addToCart,
  getUserCart,
  removeFromCart,
  createStore,
  getAllStores,
  getStore,
  deleteStore,
  updateStore,
};
