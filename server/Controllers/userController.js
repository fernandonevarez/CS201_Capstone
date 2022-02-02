const User = require("../Model/userSchema");
const Product = require("../Model/ProductSchema");
const { BadRequestError, UnauthError } = require("../errors");
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
  if(hasStore) {
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
    
    
  if(!product) {
    throw new BadRequestError("Invalid product");
  }

  user.cart.push(product);
  user.save();
  res.status(200).json({ user });
  console.log({ user });

 
}

const getUserCart = async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID);

  if (!user) {
    throw new BadRequestError("Invalid user");
  }

  res.status(200).json({ cart });
  console.log({ user });
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const createStore = async(req, res) => {

  // create a store for the user

  const { name, businessEmail, storeOwnerID, storeOwnerName, logo, description, products } = req.body;

  const user = await User.findById(storeOwnerID);

  if (!user) {
    throw new BadRequestError("Invalid user");
  }

  const store = new Store({
    name: name,
    businessEmail: businessEmail,
    storeOwnerID: storeOwnerID,
    storeOwnerName: storeOwnerName,
    logo: logo,
    description: description,
    products: products,
  });

  user.hasStore = true;
  user.save();
  store.save();

  res.status(200).json({ store });
  console.log({ store });
}

const getAllStores = async(req, res) => {

}

const getStore = async(req, res) => {

}

const deleteStore = async(req, res) => {

}

const updateStore = async(req, res) => {

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
