const route = require('express').Router()

route.use('/vendors', require('./vendors'))
route.use('/products', require('./products'))
route.use('/cart', require('./cart'))
route.use('/users', require('./users'))

exports = module.exports = {
    route
}