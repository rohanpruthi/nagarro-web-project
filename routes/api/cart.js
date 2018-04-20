const route = require('express').Router()
// const Cart = require('../../db').Cart
// const Product = require('../../db').Product
const db = require('../../db')

route.get('/', (req, res) => {
    db.Cart.findAll({
        include: [{
            model: db.Product
        }]
    })
        .then((cart) => {
            // console.log(cart)
            res.status(200).send(cart)
        })
        .catch((e) => {
            res.status(500).send({
                error: "Could not retrieve Cart Product(s)" + e
            })
        })
})

route.post('/', (req, res) => {
    // if (isNaN(req.body.quantity) && isNaN(req.body.productId)) {
    //     return res.status(403).send({
    //         error: "Input is not a valid number"
    //     })
    // }
    db.Product.find({
        where: {
            id: req.body.productId
        }
    }).then((product) => {
        db.Cart.create({
            productId: product.id,
            quantity: 1
        })
    })
        .then((cart) => {
            res.status(201).send(cart)
        })
        .catch((e) => {
            res.status(501).send({
                error: "Could not add new cart object"
            })
        })
})

route.delete('/:id', (req, res) => {
    db.Cart.destroy({
        where: {
            id: req.params.id
        }
    })
        .catch((e) => {
            res.status(500).send({
                error: ("Could not delete cart item")
            })
        })
})

route.put('/', (req, res) => {
    if (req.body.sign == 1) {
        db.Cart.increment('quantity', {
            where: {
                id: req.body.id
            }
        })
            .catch((e) => {
                res.status(500).send({ error: "Could not update Cart Product" })
            })
    }
    if (req.body.sign == -1) {
        db.Cart.findById(req.body.id)
            .then((cart) => {
                if (cart.quantity == 1) {
                    db.Cart.destroy({
                        where: {
                            id: req.body.id
                        }
                    })
                }
                else {
                    db.Cart.decrement('quantity', {
                        where: {
                            id: req.body.id
                        }
                    })
                }
            }).catch((e) => {
                res.status(500).send({ error: "Could not update Cart Product" })
            })
    }
    res.status(500).send({ error: "Bad request" })
})

exports = module.exports = route