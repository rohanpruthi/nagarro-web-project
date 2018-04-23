const route = require('express').Router()
const db = require('../../db')


route.post('/signup', (req, res) => {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        if (user) {
            res.redirect('/login.html')
        }
    }).catch((err) => res.send("ERROR CREATING USER"))
})

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login.html',
    successRedirect: '/index.html'
}))