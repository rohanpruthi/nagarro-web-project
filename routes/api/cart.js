const route = require('express').Router()
// const Cart = require('../../db').Cart
// const Product = require('../../db').Product
const db = require('../../db')

route.get('/', (req, res) => {
    db.Cart.findAll()
        .then((cart) => {
            console.log(cart)
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
            productName: product.name,
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
    if (req.body.s === 1) {
        db.Cart.increment('quantity', {
            where: {
                id: req.body.id
            }
        })
            .catch((e) => {
                res.status(500).send({ error: "Could not update Cart Product" })
            })
    }
    else {
        console.log("decrement",req.body.s);
        db.Cart.decrement('quantity', {
            where: {
                id: req.body.id
            }
        })
            .catch((e) => {
                res.status(500).send({ error: "Could not update Cart Product" })
            })
    }
})

exports = module.exports = route