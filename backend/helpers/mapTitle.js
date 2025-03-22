const mongoose = require("mongoose");

module.exports = function (goods) {
      return {   
            title: goods.title,       
      };
};
