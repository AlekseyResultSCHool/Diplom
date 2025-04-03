const Reviews = require("../models/Reviews");

async function addReviews(reviews) {
    const newReviews = await Reviews.create(reviews); 
    return newReviews;
  }

  function getReviews() {
    return Reviews.find();
  }

  function deleteReviews(id) {
    return Reviews.deleteOne({ _id: id });
  }

  function updateReviews(id, reviews) {
    return Reviews.findByIdAndUpdate(id, reviews, { returnDocument: "after" });
  }

  module.exports = {
    addReviews,
    getReviews,
    deleteReviews,
    updateReviews,
  };