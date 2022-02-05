const User = require("../Model/userSchema");
const { BadRequestError, UnauthError } = require("../errors");
require("dotenv").config();
const JWT = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  console.log(req.body);

  const { name, cart, favorites, profile_picture, email, hasStore } = req.body;
  

  // create a token for the user
  

  // console.log(token);

  
  const newUser = await User.create(
    {
      user: {
        name: name,
        cart: cart,
        favorites: favorites,
        // will be a url link to the user profile picture
        profile_picture: profile_picture,
        email: email,
        hasStore: hasStore,
      },
      // create a token for the user
      token: JWT.sign(
        {
          // user_id: newUser._id, 
          email: email,
          // name: newUser.name,
          // cart: newUser.cart,
          // favorites: newUser.favorites,
          // profile_picture: newUser.profile_picture,
          // hasStore: newUser.hasStore,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      ),
      isAuthenticated: true,
    }
  );

  // const token = newUser.createJWT();

  // save user token
  newUser.token = token;

  await newUser.save();

  console.log("token", token);
  
  
  console.log(newUser);

  res.status(StatusCodes.CREATED).json(newUser);

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

  const isPasswordCorrect = await userLogin.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthError("Incorrect password");
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

const updateUser = async (req, res) => {
  const { userID } = req.params;
  const { wantsUpdating, data } = req.body;
  
  // check what the user wants to update
  if (wantsUpdating === "hasStore") {
    await User.findByIdAndUpdate(userID, {
      $set: { hasStore: data },
    });
  } else if (wantsUpdating === "products") {
    await User.findByIdAndUpdate(userID, {
      $set: { favorites: [...favorites, data] },
    });
  }
  res.status(StatusCodes.OK).json({
    message: "User updated successfully",
  });

}


module.exports = {
  register,
  login,
  updateUser
};
