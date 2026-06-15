const express = require('express');

const router = express.Router();

const Product = require('../models/Product');

router.post('/products', async(req,res)=>{

   try{

       const product = await Product.create(req.body);

       res.status(201).json(product);

   }
   catch(error){

       res.status(500).json(error.message);

   }

});

router.get('/products', async(req,res)=>{

   const products =
   await Product.find();

   res.json(products);

});

router.get('/products/category/:category',async(req,res)=>{

   const products =
   await Product.find({
       category:req.params.category
   });

   res.json(products);

});
router.put('/products/:id', async(req,res)=>{

   const product =
   await Product.findByIdAndUpdate(

       req.params.id,

       req.body,

       {
           new:true
       }

   );

   res.json(product);

});
router.delete('/products/:id', async(req,res)=>{

   await Product.findByIdAndDelete(
       req.params.id
   );

   res.json({
       message:"Deleted Successfully"
   });

});


module.exports = router;
