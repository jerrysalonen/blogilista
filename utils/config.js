if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let PORT = process.env.PORT
let MONGOURL = process.env.MONGOURL

module.exports = {
    MONGOURL,
    PORT
}