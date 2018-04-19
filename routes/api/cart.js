const route = require('express').Router()
const Cart = require('../../db').Cart
const Product = require('../../db').Product

route.get('/', (req, res) => {
    Cart.findAll()
        .then((cart) => {
            res.status(200).send(cart)
        })
        .catch((e) => {
            res.status(500).send({
                error: "Could not retrieve Cart Product(s)"
            })
        })
})

route.post('/', (req, res) => {
    if (isNaN(req.body.quantity)&&isNaN(req.body.productId)) {
        return res.status(403).send({
            error: "Input is not a valid number"
        })
    }
    Cart.create({
        productId: req.body.productId,
        productName: req.body.productName,
        quantity: req.body.quantity
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
    Cart.destroy({
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

route.delete('/', (req, res) => {
    Cart.destroy({
        truncate: true
    })
        .then((affectedRows) => {
            res.status(200).send(affectedRows)
        })
        .catch((e) => {
            res.status(500).send({
                error: "Could not truncate Cart"
            })
        })
})

route.put('/:id', (req, res) => {
    Cart.findAll({
        where: {
            id: req.params.id
        }
    }).then((cart) => { cart.quantity += 1 })
        .then((cart) => res.status(200).send(cart))
        .catch((e) => {
            res.status(500).send({ error: "Could not update Cart Product" })
        })
})

exports = module.exports = route