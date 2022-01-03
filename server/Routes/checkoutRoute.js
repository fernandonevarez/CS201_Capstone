const express = require("express");

const { stripeCheckoutController } = require("../Controllers/SpriteController");

const checkoutRoute = express.Router();

checkoutRoute.route("/").post(stripeCheckoutController);

module.exports = checkoutRoute;
