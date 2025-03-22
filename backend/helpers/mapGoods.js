const mongoose = require("mongoose");

module.exports = function (goods) {
      return {   
            id: goods.id,
            title: goods.title,
            imageUrl: goods.imageUrl,
            desc: goods.desc,
            information: goods.information,
            price: goods.price,       
      };
};
