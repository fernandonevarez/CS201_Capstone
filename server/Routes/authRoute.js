const express = require("express");
const { register, login, updateUser } = require("../controllers/authController");
const authenticationMiddleware = require("../middleware/auth");
const authRouter = express.Router();

authRouter.route("/login").post(login);
authRouter.route("/register").post(register);

authRouter.route("/updateUser").put(authenticationMiddleware ,updateUser);
module.exports = authRouter;
