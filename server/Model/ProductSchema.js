const monogoose = require("mongoose");

const ProductSchema = new monogoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product must have a price"],
  },
  type: [
    {
      type: String,
      required: true,
      enum: {
        values: [
          "toy",
          "art",
          "entertainment",
          "clothing",
          "craft supplies",
          "Tools",
          "party",
          "jewelry",
          "accessories"
        ],
        message: `{Value} is not supported. Also make sure that there are: no spaces in your type string and every letter is lowercase`,
      },
    },
  ],

  target: [
    {
      type: String,
      required: true,
      enum: {
        values: [
          "Kids",
          "Teens",
          "Adults",
          "Netural"
        ],
        message: `{Value} is not supported. Also make sure that there are: no spaces in your type string and every letter is lowercase`,
      },
    },
  ],



  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [50, "Description must be less than 500 characters"],
    minlength: [3, "Description must be more than 3 characters"],
  },
  imageArray: [
    {
      type: String,
      required: [true, "Please add an image that displays the product"],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

ProductSchema.pre("validate", function (next) {
  if (this.imageArray.length > 10)
    throw "Amount of images submited exceeds maximum size of 10 images. Please remove some images and try again.";
  next();
});

module.exports = monogoose.model("Product", ProductSchema);
