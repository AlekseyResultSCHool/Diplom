const mongoose = require("mongoose")

module.exports = function (catalog) {
    return {
        id: catalog.id,
        title: catalog.title,
        imageUrl: catalog.imageUrl,
    }
}