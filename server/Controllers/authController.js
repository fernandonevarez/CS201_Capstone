const User = require("../Model/userSchema");

const Product = require("../Model/ProductSchema");
const { BadRequestError, UnauthError } = require("../errors");
require("dotenv").config();
const JWT = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  // console.log(req.body);
  // const { name, cart, favorites, profile_picture, email, hasStore } = req.body;
  // // create a token for the user
  // // console.log(token);
  // const newUser = await User.create({
  //   user: {
  //     name: name,
  //     email: email,
  //     cart: cart,
  //     favorites: favorites,
  //     // will be a url link to the user profile picture
  //     profile_picture: profile_picture,
  //     hasStore: hasStore,
  //   },
  //   // create a token for the user
  //   token: "",
  //   isAuthenticated: true,
  // });
  // // const token = newUser.createJWT();
  // // save user token
  // newUser.token = newUser.createJWT();
  // console.log("user's token: ", newUser.token);
  // await newUser.save();
  // console.log("token", token);
  // console.log({ newUser, message: "User created successfully" });
  // // res.status(StatusCodes.CREATED).json({ newUser });
  // res.status(StatusCodes.CREATED).json({
  //   user: {
  //     userID: newUser._id,
  //     name: newUser.name,
  //     cart: newUser.cart,
  //     favorites: newUser.favorites,
  //     // will be a url link to the user profile picture
  //     profile_picture: newUser.profile_picture,
  //     email: newUser.email,
  //     hasStore: newUser.hasStore,
  //   },
  //   token,
  //   isAuthenticated: true,
  // });

  console.log(req.body);

  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, storeInfo: {}, token, isAuthenticated: true });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("fields cannot be left blank");
  }

  const userLogin = await User.findOne({ email });

  if (!userLogin) {
    throw new BadRequestError("No user with that email and password exists");
  }

  console.log("userLogin", userLogin);
  console.log("password", password);

  const isPasswordCorrect = await userLogin.comparePassword(password);

  console.log("isPasswordCorrect", isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new UnauthError("Incorrect password");
  }

  const token = userLogin.createJWT();

  console.log("password", userLogin.password);

  res.status(StatusCodes.OK).json({
    // will hold all the datails of the user
    user: {
      _id: userLogin._id,
      name: userLogin.name,
      cart: userLogin.cart,
      favorites: userLogin.favorites,
      // will be a url link to the user profile picture
      password: userLogin.password,
      profile_picture: "",
      email: userLogin.email,
      hasStore: userLogin.hasStore,
    },
    storeInfo: {},
    token: token,
    isAuthenticated: true,

  });
};

const updateUser = async (req, res) => {
  const { id: userID } = req.params;
  const { wantsUpdating, data, userPassword } = req.body;

  console.log("userID", userID);

  // check what the user wants to update
  if (wantsUpdating === "hasStore") {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userID },
      { wantsUpdating: data },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new BadRequestError(
        `User does not exist, no user with id: ${userID}`
      );
    }
    res.status(StatusCodes.OK).json({
      updatedUser: { ...updateUser, userPassword },
      message: `User with id: ${userID} has been updated`,
    });
  } else if (wantsUpdating === "storeInfo") {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userID },
      { storeInfo: data },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new BadRequestError(
        `User does not exist, no user with id: ${userID}`
      );
    }

    console.log("password", userPassword);

    res.status(StatusCodes.OK).json({
      updatedUser: { ...updateUser, password: userPassword },
      message: `User with id: ${userID} has been updated`,
    });
  } else if (wantsUpdating === "addToFavorites") {

    const { userID, productID } = data;

    // find single product
    const product = await Product.findById({ _id: productID });

    if (!product) {
      throw new BadRequestError(
        `Product does not exist, no product with id: ${productID}`
      );
    }

    const user = await User.findById({ _id: userID });

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userID },
      {
        $push: {
          favorites: [
            {
              _id: product._id,
              name: product.name,
              price: product.price,
              imageArray: product.imageArray,
              description: product.description,
              target: product.target,
              type: product.type,
              likes: product.likes,
              store: product.store,
              createdAt: product.createdAt,
              __v: product.__v,
            }
          ]
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new BadRequestError(
        `User does not exist, no user with id: ${userID}`
      );
    }

    res.status(StatusCodes.OK).json({
      user: updatedUser
    });
  } else if (wantsUpdating === "removeFromFavorites") {

  } else if (wantsUpdating === "addToCart") {

    const { userID, productID } = data;

    // find single product
    const product = await Product.findById({ _id: productID });

    if (!product) {
      throw new BadRequestError(
        `Product does not exist, no product with id: ${productID}`
      );
    }

    const user = await User.findById({ _id: userID });

    user.cart.map(async (item) => {
      if (item._id === product._id) {
        // product already in cart
        throw new BadRequestError(
          `product with id: ${productID} already in cart`)
      } else {
        // product not in cart
        const updatedUser = await User.findByIdAndUpdate(
          { _id: userID },
          {
            //push to cart array if it already doesn't exist in the array
            $push: {
              cart: [
                {
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  imageArray: product.imageArray,
                  description: product.description,
                  target: product.target,
                  type: product.type,
                  likes: product.likes,
                  store: product.store,
                  createdAt: product.createdAt,
                  __v: product.__v,
                }
              ]
            }
          },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new BadRequestError(
            `User does not exist, no user with id: ${userID}`
          );
        }

        res.status(StatusCodes.OK).json({
          user: updatedUser
        });
      }
    });
  }
};

module.exports = {
  register,
  login,
  updateUser,
};
