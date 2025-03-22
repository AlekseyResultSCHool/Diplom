const mongoose = require("mongoose");
const validator = require("validator");

const BasketSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
      validator: {
        validator: validator.isURL,
        massage: "Image should be a valid url",
      },
    },
    quantity: {
      type: String,
      default: 1,
    },
    price: {
      type: String,
      required: true,
    },
  }, { versionKey: false }
);

const Basket = mongoose.model("Basket", BasketSchema);

module.exports = Basket;
