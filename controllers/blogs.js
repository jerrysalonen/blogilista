const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response, next) => {

  try {
    const data = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(data.map(d => d.toJSON()))
  } catch (e) {
    next(e)
  }
})

blogRouter.post('/', async (request, response, next) => {

  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'invalid or missing token' })
    }

    if (request.body.hasOwnProperty('likes')) {

      const user = await User.findById(decodedToken.id)
      const tempBlog = { ...request.body, ...{ user: user.id } }
      const blog = new Blog(tempBlog)

      try {
        const data = await blog.save()
        user.blogs = await user.blogs.concat(data.id)
        await user.save()
        response.status(201).json(data)
      } catch (e) {
        next(e)
      }

    } else {

      const user = await User.findById(decodedToken.id)
      blogAddLikes = { ...request.body, ...{ likes: 0 }, ...{ user: user.id } }

      const blog = new Blog(blogAddLikes)

      try {
        const data = await blog.save()
        user.blogs = await user.blogs.concat(data.id)
        await user.save()
        response.status(201).json(data)
      } catch (e) {
        next(e)
      }
    }

  } catch (e) {
    next(e)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {

  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).end()
  }

  try {
    const decodedToken = await jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'invalid or missing token' })
    }
    
    const user = await User.findById(decodedToken.id)

    console.log(blog.user.toString())
    console.log(user.id.toString())

    if (blog.user.toString() !== user.id.toString()) {
      return res.status(401).json({ error: 'unauthorized to delete this blog' })
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()

  } catch (e) {
    next(e)
  }

})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes
  }

  try {
    const newData = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.status(200).json(newData.toJSON())
  } catch (e) {
    next(e)
  }

})

module.exports = blogRouter