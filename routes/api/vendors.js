const Vendor = require('../../db').Vendor
const route = require('express').Router()

route.get('/', (req, res) => {
    Vendor.findAll()
        .then((vendor) => {
            res.status(200).send(vendor)
        })
        .catch((e) => {
            res.status(500).send({
                error: "Could not retrieve Vendor(s)"
            })
        })
})

route.post('/', (req, res) => {
    Vendor.create({
        name: req.body.name,
    })
        .then((vendor) => {
            res.status(201).send(vendor)
        })
        .catch((e) => {
            res.status(501).send({
                error: "Could not add new vendor"
            })
        })
})

exports = module.exports = route