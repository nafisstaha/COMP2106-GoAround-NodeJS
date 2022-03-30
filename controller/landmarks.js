var express = require('express');
const req = require('express/lib/request')
var router = express.Router();

// import Landmark model for CRUD operations
const Landmark = require('../models/landmark');

/* GET landmarks page. */
router.get('/', (req, res) => {
    // the list of landmarks in mongodb
    Landmark.find((err, landmarks) => {
        if (err) {
            console.log(err)
        }
        else {
             res.render('landmarks/index', { 
                title: 'Landmarks',
                landmarks: landmarks    
            })
        }
    })})

/* GET landmarks/create */
router.get('/create', (req, res) => {
    res.render('landmarks/create', {
        title: 'Landmark Details'
    })
})

module.exports = router;