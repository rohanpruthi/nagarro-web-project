// const Vendor = require('../../db').Vendor
const db = require('../../db')
const route = require('express').Router()

route.get('/', (req, res) => {
    db.Vendor.findAll()
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
     console.log("asdd")
    db.Vendor.create({
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