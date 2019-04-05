const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res, next) => {

    try {
        const data = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})
        res.json(data.map(d => d.toJSON()))
    } catch (e) {
        next(e)
    }

})

userRouter.post('/', async (req, res, next) => {
    const body = req.body

    if (!body.password || (body.password.length < 3)) {
        res.status(400).json('Password missing or too short.')
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    try {
        const data = await user.save()
        res.json(data)
    } catch (e) {
        next(e)
    }

})

module.exports = userRouter