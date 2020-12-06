//link to the express package
var express = require('express');
//instanciate a new express route to handle http requests
var router = express.Router();


/* GET product Index View. */
router.get('/', function (req, res, next) {
            res.render('products/index')
})

//exposes this file as public
module.exports = router;