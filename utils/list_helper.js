const _ = require('lodash')

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

const mostBlogs = (blogs) => {
    let tempBlogs = blogs.map(blog => ({...blog}))
    tempBlogs = _.groupBy(tempBlogs, 'author')

    tempBlogs = _.sortBy(tempBlogs, (author) => { return author.length })

    author = tempBlogs[tempBlogs.length - 1].map((blogs) => {
        return blogs.author
    })

    let result = {
        author: author[0],
        blogs: Number(author.length)
    }

    return result
}

// not the most elegant of solutions but works
const mostLikes = (blogs) => {
    let tempBlogs = blogs.map(blog => ({...blog}))
    tempBlogs = _.groupBy(tempBlogs, 'author')
    let authorsWithLikes = []

    Object.entries(tempBlogs).forEach(blogs => {
        let likes = 0
        blogs[1].forEach(entry => {
            likes += entry.likes
        })
        let temp = {
            author: blogs[0],
            likes: Number(likes)
        }
        authorsWithLikes.push(temp)
    })

    authorsWithLikes = _.sortBy(authorsWithLikes, (entry) => { return entry.likes })

    return authorsWithLikes[authorsWithLikes.length - 1]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}