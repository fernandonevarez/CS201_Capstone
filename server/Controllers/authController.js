const User = require("../Model/userSchema");

const Product = require("../Model/ProductSchema");
const { BadRequestError, UnauthError } = require("../errors");
require("dotenv").config();
const JWT = require("jsonwebtoken");

const bcrypt = require("bcrypt");


const { StatusCodes } = require("http-status-codes");

let cancel;


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

  const password = req.body.password;

  const encPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));


  const user = await User.create({...req.body, password: encPassword});
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
    // const updatedUser = await User.findByIdAndUpdate(
    //   { _id: userID },
    //   { [wantsUpdating]: data },
    //   { new: true, runValidators: true }
    // );

    // find user by id
    const user = await User.findById(userID);

    if (!user) {
      throw new BadRequestError(
        `User does not exist, no user with id: ${userID}`
      );
    }
    //  update user's hasStore field
    user.hasStore = data;
    // save user
    await user.save();



    return res.status(StatusCodes.OK).json({
      user,
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

    return res.status(StatusCodes.OK).json({
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

    return res.status(StatusCodes.OK).json({
      user: updatedUser
    });
  } else if (wantsUpdating === "removeFromFavorites") {

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
        // $pull: {
        //   favorites: {
        //     _id: product._id
        //   }
        // }

        // remove the product from the favorites array
        $pull: {
          favorites: {
            _id: product._id
          }
        }


      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new BadRequestError(
        `User does not exist, no user with id: ${userID}`
      );
    }

    return res.status(StatusCodes.OK).json({
      user: updatedUser
    });

  } else if (wantsUpdating === "addToCart") {

    const { userID, productID } = data;

    // find single product
    const product = await Product.findById({ _id: productID });

    const user = await User.findById({ _id: userID });

    console.log("productID", productID);

    user.cart.map(async (item) => {

      console.log("itemID", item._id);

      const updatedUser = await User.findByIdAndUpdate(
        { _id: userID },
        {
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
        { new: false, runValidators: true }
      );
      // Try to change the new flag to false and see what happens

      if (!updatedUser) {
        throw new BadRequestError(
          `User does not exist, no user with id: ${userID}`
        );
      }

      if (item._id.equals(product._id)) {
        return res.status(200).json({
          user,
          message: `Product already in cart`,
        });
      } else {
        return res.status(200).json({
          user: updatedUser,
          message: `Product added to cart`,
        });
      }
    });

    if (!product) {
      throw new BadRequestError(
        `Product does not exist, no product with id: ${productID}`
      );
    }
    // check if the product is already in the cart
    // const isProductInCart = user.cart.find(item => item._id == product._id);

    // if (isProductInCart) {
    //   // product already in cart
    //   // return an error
    //   return res.status(StatusCodes.BAD_REQUEST).json({ message: `Product already in cart, no product with id: ${productID}` });
    // } else {
    //   console.log("isProductInCart", isProductInCart);
    //   res.status(StatusCodes.OK).json({
    //     message: `Product added to cart`
    //   });
    // }

  } else if (wantsUpdating === "removeFromCart") { }
};

module.exports = {
  register,
  login,
  updateUser,
};
