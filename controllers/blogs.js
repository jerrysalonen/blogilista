const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {

  try {
    const data = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
    response.json(data.map(d => d.toJSON()))
  } catch (e) {
    next(e)
  }
})

blogRouter.post('/', async (request, response, next) => {

  if (!(request.body.hasOwnProperty('title')) ||
    !(request.body.hasOwnProperty('url'))) {

    response.status(400).end()
    return
  }

  if (request.body.hasOwnProperty('likes')) {

    const user = await User.findById(request.body.user)
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

    const user = User.findById(request.body.userId)
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
})

blogRouter.delete('/:id', async (req, res, next) => {

  try {
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