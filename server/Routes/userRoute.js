const express = require("express");
const {
  addingToFavorite,
  removeFromFavorite,
  getAllFavorites,
  updateUser,
  addToCart,
  getUserCart,
  createStore,
  getAllStores,
  getStore,
  deleteStore,
  updateStore,
  removeFromCart,
} = require("../Controllers/userController");
const userRouter = express.Router();

const authenticationMiddleware = require("../middleware/auth");

// api/v1/users/:userID/favorites/:productID
/*
user:

deleting a favorite
adding a favorite

us:
getttting all favorites


*/

userRouter
  .route("/:userID/favorites")
  .put(authenticationMiddleware, addingToFavorite);

userRouter
  .route("/:userID/favorites/:productID")
  .delete(authenticationMiddleware, removeFromFavorite);

userRouter
  .route("/:userID/favorites")
  .get(authenticationMiddleware, getAllFavorites);

// userRouter.route("/:userID/favorites").post(favorite);

// route for users to update their information
userRouter.route("/:userID/update").put(updateUser);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// cart routes

userRouter.route("/:userID/cart").put(authenticationMiddleware, addToCart);

userRouter.route("/:userID/cart").get(authenticationMiddleware, getUserCart);

userRouter
  .route("/:userID/cart/:productID")
  .delete(authenticationMiddleware, removeFromCart);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// user's store routes

userRouter.route("/store").post(authenticationMiddleware, createStore);

userRouter.route("/store").get(getAllStores);

userRouter
  .route("/store/:storeID")
  .delete(authenticationMiddleware, deleteStore);

userRouter
  .route("/store/:storeID/?userID")
  .put(authenticationMiddleware, updateStore);

userRouter.route("/store/:storeID").get(getStore);

module.exports = userRouter;
