// const Product = require('../../db').Product
const route = require('express').Router()
const db = require('../../db')
route.get('/', (req, res) => {
    db.Product.findAll({
        include: [{
            model: db.Vendor
        }]
    })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((e) => {
            res.status(500).send({
                error: "Could not retrieve Product(s)"
            })
        })
})
route.get('/:id', (req, res) => {
    db.Product.findAll({
        include: [{
            model: db.Vendor
        }],
        where: {
            vendorId: req.params.id
        }
    }).then((products) => {
        res.status(200).send(products)
    })
        .catch((e) => {
            res.status(500).send({
                error: "Could not retrieve Product(s)"
            })
        })
})

route.post('/', (req, res) => {
    // if(isNaN(req.body.price)){
    //     return res.status(403).send({
    //         error: "Price is not a valid number"
    //     })
    // }
    db.Product.create({
        name: req.body.name,
        vendorId: req.body.vendorId,
        price: parseFloat(req.body.price)

    })
        .then((product) => {
            res.status(201).send(product)
        })
        .catch((e) => {
            res.status(501).send({
                error: "Could not add new product"
            })
        })
})

exports = module.exports = route