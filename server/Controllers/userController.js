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
  const { userID, productID } = req.params;
  const { user, product } = await Promise.all([
    User.findById(userID),
    Product.findById(productID),
  ]);

  if (!user) {
    throw new BadRequestError("Invalid user");
  }


  if (!product) {
    throw new BadRequestError("Invalid product");
  }

  user.cart.push(product);
  user.save();
  res.status(200).json({ user });
  console.log({ user });


}

const getUserCart = async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById({ _id: userID });

  if (!user) {
    throw new BadRequestError("Invalid user");
  }

  // find the users cart
  const cart = user.cart;

  console.log(cart);

  res.status(200).json({ cart });
  // console.log({ user });
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const createStore = async (req, res) => {

  // create a store for the user

  const {
    body: {
      name, businessEmail, storeOwnerID, storeOwnerName, description, products
    },
    files: logo

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

  const store = new Store(
    {
      name: name,
      businessEmail: businessEmail,
      storeOwnerID: storeOwnerID,
      storeOwnerName: storeOwnerName,
      logo: result.secure_url,
      description: description,
      products: products,
    }
  );

  user.hasStore = true;

  // upadte the user's storeInfo to have the store info
  user.storeInfo = store;

  user.save();
  store.save();

  res.status(200).json({ store });
  console.log({ store });
}

const getAllStores = async (req, res) => {

  const stores = await Store.find({}).sort("createdAt");

  console.log(stores);

  res.status(StatusCodes.OK).json({ stores, length: stores.length });

}

const getStore = async (req, res) => {

  const {
    params: { storeID: id },
  } = req;

  const store = await Store.findOne({ _id: id });

  if (!store) {
    throw new BadRequestError("Invalid store");
  }

  res.status(StatusCodes.OK).json({ store });


}

const deleteStore = async (req, res) => {

}

const updateStore = async (req, res) => {

}


module.exports = {
  addingFavorite,
  removeFavorite,
  getAllFavorites,
  updateUser,
  addToCart,
  getUserCart,
  createStore,
  getAllStores,
  getStore,
  deleteStore,
  updateStore,
};
