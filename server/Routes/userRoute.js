const express = require("express");
const {
  addingFavorite,
  removeFavorite,
  getAllFavorites,
} = require("../Controllers/userFavoritesController");
const userRouter = express.Router();

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

module.exports = userRouter;
