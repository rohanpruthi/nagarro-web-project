const route = require('express').Router()
const db = require('../../db')
const session = require('express-session')
const passport = require('../../passport')


route.post('/signup', (req, res) => {
    console.log(req.body.username)
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        if (user) {
            res.redirect('/login.html')
        }
    }).catch((err) => res.send(err))
})

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login.html',
    successRedirect: '/index.html'
}))

route.get('/', (req, res) => {

    console.log(req.user)
    if (req.user) {
        res.json(req.user.username)
    } 
    //else {
    //     res.send("YOU ARE NOT LOGGED IN")
    // }
})

exports = module.exports = route