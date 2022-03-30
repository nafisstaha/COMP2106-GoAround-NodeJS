var express = require('express');
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

module.exports = router;