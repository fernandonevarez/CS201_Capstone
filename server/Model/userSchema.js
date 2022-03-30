const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Product = require("./ProductSchema");
const Store = require("./StoreSchema");

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: [true, "first name must be provided"],
      minlength: [2, "must be more than 2 characters"],
      maxLength: [20, "must be less than 10 characters"],
    },
    middleName: {
      type: String,
      required: false,
      // minlength: [2, "must be more than 2 characters"],
      maxLength: [20, "must be less than 10 characters"],
    },
    lastName: {
      type: String,
      required: [false, "last name must be provided"],
      minlength: [2, "must be more than 2 characters"],
      maxLength: [20, "must be less than 10 characters"],
    },
  },

  username: {
    type: String,
    required: false,
    maxlength: [20, "must be less than 20 characters"],
  },

  email: {
    type: String,
    required: [true, "email must be provided"],
    unique: [true, "email already has an account"],
    // validate:
    //   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },

  password: {
    type: String,
    required: [true, "password must be provided"],
    minlength: [6, "password must be more than 5 characters"],
    // validate:
    //     /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/g
  },

  // this is how you can allow user's to be able to add object to there own schema
  cart: {
    type: [Product.schema],
    required: false,
  },
  favorites: {
    type: [Product.schema],
    required: false,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  hasStore: {
    type: Boolean,
    default: false,
  },
  storeInfo: {
    type: Store.schema,
    required: false,
  },
});

// userSchema.pre("save", async function (next) {
//   // Hashing - hashing a string through a formula to get back a completely different string.
//   // salting - adding a random string of numbers to the start of the string to make it harder to guess.
//   // peppering - adding a random letter [a-zA-Z] to the end of a string to make it harder to guess.
//   this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
//   next();
// });

userSchema.methods.createJWT = function () {
  return JWT.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFESPAN,
    }
  );
};

userSchema.methods.comparePassword = async function (submittedPassword) {
  const isMatch = await bcrypt.compare(submittedPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
