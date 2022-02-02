const User = require("../Model/userSchema");
const { BadRequestError, UnauthError } = require("../errors");
require("dotenv").config();
const JWT = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      userID: newUser._id,
      name: newUser.name,
      cart: [],
      favorite: [],
      // will be a url link to the user profile picture
      profile_picture: "",
      email: newUser.email,
      hasStore: false,
    },
    token,
    isAuthenticated: true,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("fields cannot be left blank");
  }

  const userLogin = await User.findOne({ email });

  if (!userLogin) {
    throw new UnauthError("Invaild Credentials");
  }

  const isPasswordCorrect = await userLogin.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthError("Invaild Credentials");
  }

  const token = userLogin.createJWT();

  res.status(StatusCodes.OK).json({
    // will hold all the datails of the user
    user: {
      userID: userLogin._id,
      name: userLogin.name,
      cart: userLogin.cart,
      favorite: userLogin.favorites,
      // will be a url link to the user profile picture
      profile_picture: "",
      email: userLogin.email,
      hasStore: userLogin.hasStore,
    },
    token: token,
    isAuthenticated: true,
  });
};

module.exports = {
  register,
  login,
};
