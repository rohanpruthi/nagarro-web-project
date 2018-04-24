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
            res.send(user)
        }
    }).catch((err) => res.send(err))
})

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/index.html',
    successRedirect: '/index.html'
}))

route.get('/', (req, res) => {

    console.log(req.user)
    if (req.user) {
        res.json(req.user)
    } 
    // else {
    //     res.send("YOU ARE NOT LOGGED IN")
    // }
})
route.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        res.send({
            success:true
        })
    })
})

exports = module.exports = route