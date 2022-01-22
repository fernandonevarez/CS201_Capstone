const express = require("express");

const {
  getAllProduct,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../Controllers/ProductController");
const authenticationMiddleware = require("../middleware/auth")

// const { stripeCheckoutController } = require("../Controllers/SpriteController");

const productRouter = express.Router();

productRouter.route("/").get(authenticationMiddleware, getAllProduct);
productRouter.route("/").post(createProduct);

productRouter.route("/:id").get(getSingleProduct);
productRouter.route("/:id").delete(deleteProduct);
productRouter.route("/:id").put(updateProduct);

// productRouter.route("/create-checkout-session").post(stripeCheckoutController);

module.exports = productRouter;
