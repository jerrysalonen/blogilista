const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const genericErrorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

const unknownErrorHandler = (error, req, res) => {
    res.status(500).send({ error: 'unknown server error' })
}

module.exports = {
    unknownEndpoint,
    genericErrorHandler,
    unknownErrorHandler
}