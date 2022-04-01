const express = require('express')
const router = express.Router()

// references for auth
const passport = require('passport')
const User = require('../models/user')

// GET: /auth/register
router.get('/register', (req, res) => {
    res.render('auth/register', {
        title: 'Register'
    })
})

// POST: /auth/register => update the new user
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            return res.render('auth/register')
        }
        else {
            req.login(user, (err) => {
                res.redirect('/landmarks')
            })
        }
    })
})

// GET: /auth/login
router.get('/login', (req, res) => {
    let messages = req.session.messages || []
    req.session.messages = []
    res.render('auth/login', {
        title: 'Login',
        messages: messages
    })
})

// POST: /auth/login => validate user with passport-local 
router.post('/login', passport.authenticate('local', {
    successRedirect: '/landmarks',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}))

// GET /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth/login')
})

// make controller public
module.exports = router