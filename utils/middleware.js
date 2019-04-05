const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const genericErrorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }
    next(error)
}

const unknownErrorHandler = (error, req, res) => {
    res.status(500).send({ error: 'unknown server error' })
    next()
}

const tokenExtractor = async (req, res, next) => {
    const auth = await req.get('Authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        req.token = auth.substring(7).toString()
    }
    next()
}

module.exports = {
    unknownEndpoint,
    genericErrorHandler,
    unknownErrorHandler,
    tokenExtractor
}