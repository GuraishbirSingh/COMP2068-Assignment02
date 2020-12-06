// add Mongoose
const mongoose = require('mongoose')

const productschema = new mongoose.Schema(
   {
      name:      {
         type: String,
         required: 'Name is Required',
         trim: true
      },
      quantity: Number,
      department:{
         type: String,
         required: 'Department name is Required',
         trim: true
      }
   })

// making it public
module.exports = mongoose.model('Product', productschema)