var express = require('express');
var router = express.Router();

/* GET landmarks page. */
router.get('/', (req, res) => {
    res.render('landmarks/index', { title: 'Landmarks' });
})

module.exports = router;