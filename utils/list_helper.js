const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let tempBlogs = blogs.map(blog => ({...blog}))

    if (tempBlogs.length === 0) {
        return 0
    } else if (tempBlogs.length === 1) {
        return tempBlogs[0].likes
    } else {
        let reducer = (sum, blog) => {
            return sum + Number(blog.likes)
        }

        return tempBlogs.reduce(reducer, 0)
    }
}

const favoriteBlog = (blogs) => {
    let tempBlogs = blogs.map(blog => ({...blog}))

    let maxLikes = Math.max.apply(Math, tempBlogs.map((blogs) => {
        return blogs.likes
    }))

    let maxLikesArray = tempBlogs.filter(blog => blog.likes === maxLikes)

    const result = {
        title: maxLikesArray[0].title,
        author: maxLikesArray[0].author,
        likes: maxLikesArray[0].likes
    }

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}