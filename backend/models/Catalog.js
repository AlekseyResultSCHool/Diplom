const mongoose = require("mongoose");
const validator = require("validator");

const CatalogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      validator: {
        validator: validator.isURL,
        massage: "Image should be a valid url",
      },
    },
    goods: [
      {
        title: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
          validator: {
            validator: validator.isURL,
            massage: "Image should be a valid url",
          },
        },
        desc: {
          type: String,
          required: true,
        },
        information: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { versionKey: false }
);

const Catalog = mongoose.model("Catalog", CatalogSchema);

module.exports = Catalog;
