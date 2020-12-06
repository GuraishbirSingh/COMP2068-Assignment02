var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Store Inventory' });
});

/* GET About page. */
router.get('/about', (req, res, next) => {
    res.render('about', { message: 'About' })
});

module.exports = router;
