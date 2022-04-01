var express = require('express');
const req = require('express/lib/request')
var router = express.Router();

// import Landmark model for CRUD operations
const Landmark = require('../models/landmark');

// auth
const passport = require('passport')
const { is } = require('express/lib/request')
function isAuthenticated(req, res, next) {
    // user is authenticated?
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/login')
}

// GET /landmarks page.
router.get('/', (req, res) => {
    // the list of landmarks in mongodb
    Landmark.find((err, landmarks) => {
        if (err) {
            console.log(err)
        }
        else {
             res.render('landmarks/index', { 
                title: 'Landmarks',
                landmarks: landmarks,
                user: req.user    
            })
        }
    })})

// GET /landmarks/create
router.get('/create', isAuthenticated, (req, res) => {
    res.render('landmarks/create', {
        title: 'Landmark Details',
        user: req.user    
    })
})

// POST /landmarks/create => update
router.post('/create', isAuthenticated, (req, res) => {
    Landmark.create(req.body, (err, landmark) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/landmarks')
        }
    })
})

// GET /landmarks/delete/id => delete landmark with special id
router.get('/delete/:_id', isAuthenticated, (req, res) => {
    Landmark.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/landmarks')
        }
    })
})

// GET /landmarks/edit/id => edit landmark with special id
router.get('/edit/:_id', isAuthenticated, (req, res) => {
    Landmark.findById(req.params._id, (err, landmark) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('landmarks/edit', {
                title: 'Landmark Details',
                landmark: landmark,
                user: req.user
            })
        }
    })
})

// POST /landmarks/edit/id => update landmark with special id in mongodb
router.post('/edit/:_id', isAuthenticated, (req, res) => {
    Landmark.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, landmark) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/landmarks')
        }
    })
})

module.exports = router;