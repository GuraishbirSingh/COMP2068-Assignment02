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

//GET products add view
router.get('/add', (req, res, next) => {
   res.render('products/add')
})

//POST products / add form submission
router.post('/add', (req, res, next) => {

   //use MONGOOSE to try to save a new product
   Product.create({
      name: req.body.name,
      quantity: req.body.quantity,
      department: req.body.department
   }, (err, product) => {
      if (err) {
         console.log(err)
         res.end(err)
      }
      else {
         res.redirect('/products')
      }
   })
})

//GET products delete
router.get('/delete/:_id', (req, res, next) => {
   
   //store the selected id in a local variable
   var _id = req.params._id;
   //Use Mongoose to delete the selected document from the DB
   Product.remove({ _id: _id }, (err) => {
      if (err) {
         console.log(err)
         res.end(err)
      }
      else {
         res.redirect('/products')
      }
   })
})

//Get products/edit
router.get('/edit/:_id', (req, res, next) => {
   //storing id parameter
   var _id = req.params._id
   //use the selected id parameter to edit 
   Product.findById(_id,(err,products) => {
      if(err)
      {
         console.log(err)
         res.end(err)
      }
      else
      {
      res.render('products/edit',
          { products: products  })
      }
   })
})



// POST /products/edit
router.post('/edit/:_id', (req, res, next) =>
{
   var _id = req.params._id

   //instantiate a Product object with the new values from the form submission
   var product = new Product({
      _id: _id,
      name: req.body.name,
      quantity: req.body.quantity,
      department: req.body.department
   })
   //update document with selected id, passing new product object to replace old values
   Product.update({_id: _id}, product, (err) => {
      if(err)
      {
         console.log(err)
         res.end(err)
      }
      else
      {
         res.redirect('/products')
      }
   })
})

//exposes this file as public
module.exports = router;