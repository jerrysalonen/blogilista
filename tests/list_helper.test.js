const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when blogs is an empty array', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when the array length is 1', () => {
        let oneBlog = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7,
                __v: 0
            }
        ]
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(7)
    })

    test('with multiple blogs', () => {
        const result = listHelper.totalLikes(blogs)
        console.log(blogs)
        expect(result).toBe(36)
    })
})

describe('most likes', () => {

    test('when one has most likes', () => {
        const favorite = {
            title: blogs[2].title,
            author: blogs[2].author,
            likes: blogs[2].likes
        }
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(favorite)
    })

    test('when more than one posts have the most likes', () => {
        let tempBlogs = blogs.map(blog => ({...blog}))
        tempBlogs[0].likes = 12

        const favorite = {
            title: tempBlogs[0].title,
            author: tempBlogs[0].author,
            likes: tempBlogs[0].likes
        }

        const result = listHelper.favoriteBlog(tempBlogs)
        expect(result).toEqual(favorite)
    })
})

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]