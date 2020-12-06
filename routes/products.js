//link to the express package
var express = require('express');
//instanciate a new express route to handle http requests
var router = express.Router();

//Reference the product model
const Product = require('../models/product')


/* GET product Index View. */
router.get('/', function (req, res, next) {
    Product.find((err, products) => {
        if (err) {
           console.log(err)
           res.end(err)
        }
        else {
           res.render('products/index',
              {
                 products: products
              })
        }
     })
})

//exposes this file as public
module.exports = router;