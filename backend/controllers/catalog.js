const Catalog = require("../models/Catalog");

function getCatalog(search = "") {
  const catalog = Catalog.find({ title: { $regex: search, $options: "i" } })
  return catalog;
}

function getCatalogTitle(id) {
  return Catalog.findById(id);
}

function getGoods(id) {
  return Catalog.findById(id);
}

async function addGoods(id, goods) {
  const oneGoods = Catalog.findByIdAndUpdate(id, {$push: { goods: goods }});      
  return oneGoods;
}

module.exports = {
  getCatalog,
  getCatalogTitle,
  getGoods,
  addGoods,
};
