// add Mongoose
const mongoose = require('mongoose')

const productschema = new mongoose.Schema(
   {
      name:      {
         type: String,
         required: 'Name is Required',
         trim: true
      },
      Quantity: Number,
      Department:{
         type: String,
         required: 'Department name is Required',
         trim: true
      },
      Instock: {
         type: Boolean,
         default: No
      }
   })

// making it public
module.exports = mongoose.model('Product', productschema)