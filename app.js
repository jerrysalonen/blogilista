const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGOURL, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.genericErrorHandler)
app.use(middleware.unknownErrorHandler)

module.exports = app