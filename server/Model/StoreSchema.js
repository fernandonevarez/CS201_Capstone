const monogoose = require("mongoose");

const StoreSchema = new monogoose.Schema({
  name: {
    type: String,
    required: [true, "Store name is required"],
  },
  businessEmail: {
    type: String,
    required: [true, "Business email is required"],
  },
  storeOwnerID: {
    type: String,
    required: [true, "Store owner ID is required"],
  },
  storeOwnerName: {
    type: String,
    required: [true, "Store owner name is required"],
  },
  logo: {
    type: String,
    required: [false, "Store logo is not required, but should have one"],
  },

  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [50, "Description must be less than 500 characters"],
    minlength: [3, "Description must be more than 3 characters"],
  },
  products: [
    {
      type: Object,
      // ref: "Product",
      required: [false, "Products are not required, but should have one"],
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

module.exports = monogoose.model("Store", StoreSchema);