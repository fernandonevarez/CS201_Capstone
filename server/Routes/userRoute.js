const express = require("express");
const {
  addingFavorite,
  removeFavorite,
  getAllFavorites,
  updateUser,
  addToCart,
  getUserCart,
} = require("../Controllers/userController");
const userRouter = express.Router();

const {authenticationMiddleware} = require("../middleware/auth");

// api/v1/users/:userID/favorites/:productID
/*
user:

deleting a favorite
adding a favorite

us:
getttting all favorites


*/

userRouter.route("/:userID/favorites/:productID").post(addingFavorite);

userRouter.route("/:userID/favorites/:productID").delete(removeFavorite);

userRouter.route("/:userID/favorites").get(getAllFavorites);

// userRouter.route("/:userID/favorites").post(favorite);

// route for users to update their information
userRouter.route("/:userID/update").put(updateUser);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// cart routes

userRouter.route("/:userID/cart/:productID").post(addToCart);

userRouter.route("/:userID/cart").get(getUserCart);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// user's store routes

userRouter.route("/store").post(authenticationMiddleware, createStore);

userRouter.route("/store").get(getAllStores);


userRouter.route("/store/:userID").delete(authenticationMiddleware, deleteStore);

userRouter.route("/store/:userID").put(authenticationMiddleware, updateStore);

userRouter.route("/store/:userID").get(getStore);

module.exports = userRouter;
