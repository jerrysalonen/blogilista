const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('GET tests', () => {

  test('data type is JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns right amount of data', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(initBlogs.length)
  })

  test('id field is correct', async () => {
    // test doesn't pass if id field is not named "id"
    const res = await api.get('/api/blogs')
    res.body.forEach(item => {
      expect(item.id).toBeDefined()
    })
  })

})

describe('POST tests', () => {

  test('POST request works', async () => {
    const dummyBlog =
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    }

    const res = await api
      .post('/api/blogs')
      .send(dummyBlog)

    expect(res.status).toBe(201)

    const all = await api.get('/api/blogs')
    expect(all.body.length).toBe(initBlogs.length + 1)
  })

  test('If likes are not given, they get value of 0', async () => {
    const dummyBlog =
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
    }

    const res = await api
      .post('/api/blogs')
      .send(dummyBlog)

    expect(res.body.likes).toBe(0)
  })

  test('If no title and/or url is not given, return status code 400', async () => {
    const dummyBlog =
    {
      author: "Michael Chan"
    }

    const res = await api
      .post('/api/blogs')
      .send(dummyBlog)

    expect(res.status).toBe(400)
  })

})

describe('Test delete and put', () => {
  test('Delete single item based on id', async () => {
    const data = await api.get('/api/blogs')
    const res = await api.delete(`/api/blogs/${data.body[0].id}`)
    expect(res.status).toBe(204)
  })

  test('Update likes', async () => {
    const data = await api.get('/api/blogs')
    const res = await api.put(`/api/blogs/${data.body[0].id}`)
      .send({ ...data[0], ...{likes: 20} })
    expect(res.status).toBe(200)
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

afterAll(() => {
  mongoose.connection.close()
})

const initBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]