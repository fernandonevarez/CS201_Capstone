const User = require("../Model/userSchema");
const { BadRequestError, UnauthError } = require("../errors");
require("dotenv").config();
const JWT = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: newUser.name, userID: newUser._id, token });
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

  res.status(StatusCodes.OK).json({ user: { name: userLogin.name }, token });
};

// var request = require("request");
// const getUserToken = async (req, res) => {
//   var options = {
//     method: "POST",
//     url: "https://dev-3osqrzua.us.auth0.com/oauth/token",
//     headers: { "content-type": "application/json" },
//     body: '{"client_id":"1gGsiZFG9C7SlYlXXU8FFzAUjWyKXI1C","client_secret":"y0eDdmLNpCeKqKZTyKVzC0wLVVmyw5eUT_KJGsViQKkWc39m6R0vCGneYHoIbGud","audience":"https://dev-3osqrzua.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
//   };

//   request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);
//   });
// };

module.exports = {
  register,
  login,
  // getUserToken,
};
