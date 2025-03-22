module.exports = function (reviews) {
    return {
        id: reviews.id,
        login: reviews.login,
        title: reviews.title,
        content: reviews.content,
        comments: reviews.comments,
        registed_at: reviews.createdAt
    }
}