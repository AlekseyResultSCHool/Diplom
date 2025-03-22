module.exports = function (basket) {
    return {
        id: basket.id,
        title: basket.title,
        imageUrl: basket.imageUrl,
        quantity: basket.quantity,
        price: basket.price,
    }
}