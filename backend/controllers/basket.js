const Basket = require("../models/Basket");

async function addBasket(basket) {
    const newBasket = await Basket.create(basket); 
    return newBasket;
  }

  function getBasket() {
    return Basket.find();
  }

  function deleteBasket(id) {
    return Basket.deleteOne({ _id: id });
  }

  function removeBasket() {
    return Basket.deleteMany();
  }

  function updateBasket(id, basket) {
    return Basket.findByIdAndUpdate(id, basket, { returnDocument: "after" });
  }

  module.exports = {
    addBasket,
    getBasket,
    deleteBasket,
    updateBasket,
    removeBasket,
  };