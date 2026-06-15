const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

   name:{
       type:String,
       required:true,
       minlength:3,
       maxlength:100

   },

   description:{
       type:String
   },

   category:{
       type:String,
       required:true,
       enum:[
        'Electronics',
        'Fashion',
        'Books',
        'Home'
        ]

   },

   price:{
       type:Number,
       required:true,
       min:1000
   },

   stock:{
       type:Number,
       default:0,
       min:0
   }

},{
   timestamps:true
});

module.exports = mongoose.model('Product', ProductSchema);
