const express = require("express");

const {
  getAllProduct,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getProductsByType,
} = require("../Controllers/ProductController");
const authenticationMiddleware = require("../middleware/auth")

// const { stripeCheckoutController } = require("../Controllers/SpriteController");

const productRouter = express.Router();

productRouter.route("/").get(getAllProduct);
productRouter.route("/").post(authenticationMiddleware, createProduct);

productRouter.route("/:id").get(getSingleProduct);
productRouter.route("/:id").delete(authenticationMiddleware, deleteProduct);
productRouter.route("/:id").put(authenticationMiddleware, updateProduct);

productRouter.route("/catagories/:type").get(getProductsByType);
// productRouter.route("/create-checkout-session").post(stripeCheckoutController);

module.exports = productRouter;
