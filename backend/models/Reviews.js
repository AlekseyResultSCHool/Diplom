const mongoose = require("mongoose");

const ReviewsSchema = mongoose.Schema(
  {
    login: {
        type: String,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", ReviewsSchema);

module.exports = Reviews;
