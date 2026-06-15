Building an E-Commerce Product Catalog API using Node.js & MongoDB
Scenario
You have joined an e-commerce company called ShopSphere.
The company currently stores product information in Excel sheets.
Problems:
No centralized database
Difficult to search products
No API for frontend teams
No validation rules
Duplicate product data
Management asks the development team to build a centralized Product Catalog Service using:
Node.js
Express.js
MongoDB Atlas
MongoDB Compass
Mongoose
By the end of this lab, you will:
Create a MongoDB Atlas account
Create a cloud MongoDB database
Connect Atlas with Node.js
Create collections
Create documents
Create Mongoose schemas
Create Mongoose models
Insert data
Retrieve data
Update data
Delete data
Validate data
Test APIs

Step 1 Create Project Folder
Open VS Code
Open Terminal
mkdir ProductCatalogApp

cd ProductCatalogApp
Step 2 Initialize Node Project
npm init -y
Output:
package.json
Step 3 Install Required Packages
npm install express mongoose dotenv

npm install nodemon --save-dev
Step 4 Create Project Structure
ProductCatalogApp
│
├── models
│     └── Product.js
│
├── routes
│     └── productRoutes.js
│
├── .env
│
├── server.js
│
├── package.json
│
└── node_modules

Step 5 Create MongoDB Atlas Account
Open:
https://www.mongodb.com/cloud/atlas
Create free account.
Verify email.
Login.
Step 6 Create Cluster
Click:
Create Cluster
Choose:
FREE TIER
Provider:
AWS
Region:
Mumbai
Cluster Name:
ProductCluster
Click:
Create Deployment
Wait 3-5 minutes.
Step 7 Create Database User
Navigate:
Security
→ Database Access
Click:
Add New Database User
Username:
admin
Password:
Password@123
Role:
Atlas Admin
Save.
Step 8 Configure Network Access
Navigate:
Network Access
Add IP Address
Choose:
Allow Access From Anywhere
Atlas adds:
0.0.0.0/0
Save.
Step 9 Get Connection String
Click:
Connect
Choose:
Drivers
Select:
Node.js
Copy connection string.
Example:
mongodb+srv://admin:<password>@productcluster.xyz.mongodb.net/?retryWrites=true&w=majority
Replace password.
mongodb+srv://admin:Password@123@productcluster.xyz.mongodb.net/ProductDB
Step 10 Create Environment File
Create:
.env
PORT=3000

MONGO_URI=mongodb+srv://admin:Password@123@productcluster.xyz.mongodb.net/ProductDB
Step 11 Create MongoDB Connection
Create:
server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
   console.log("MongoDB Connected");
})
.catch((err) => {
   console.log(err);
});

app.listen(process.env.PORT, () => {
   console.log(`Server Running`);
});
Step 12 Start Application
Add script in package.json
"scripts": {
 "start":"node server.js",
 "dev":"nodemon server.js"
}
Run:
npm run dev
Expected:
MongoDB Connected

Server Running
Step 13 Create First Schema
Create:
models/Product.js
Create Product Schema
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

   name:{
       type:String,
       required:true
   },

   description:{
       type:String
   },

   category:{
       type:String,
       required:true
   },

   price:{
       type:Number,
       required:true
   },

   stock:{
       type:Number,
       default:0
   }

},{
   timestamps:true
});

module.exports = mongoose.model('Product', ProductSchema);

Understanding Schema Fields
String
name:{
type:String
}
Example:
Laptop
Number
price:{
type:Number
}
Example:
50000
Required
required:true
Cannot be empty.
Default
default:0
Automatically assigns value.
Timestamps
timestamps:true
Creates:
{
"createdAt":"",
"updatedAt":""
}
automatically.
Step 14 Create Product Routes
Create:
routes/productRoutes.js

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

module.exports = router;
Register Routes
Open:
server.js
Add:
const productRoutes = require('./routes/productRoutes');

app.use('/api', productRoutes);

Step 15 Create First Document
Send POST Request
POST

http://localhost:3000/api/products
Body
{
 "name":"Dell Laptop",
 "description":"16GB RAM",
 "category":"Electronics",
 "price":75000,
 "stock":20
}
Response
{
 "_id":"...",
 "name":"Dell Laptop",
 "category":"Electronics",
 "price":75000
}
Step 16 View Data in MongoDB Compass
Open MongoDB Compass.
Click:
New Connection
Paste same Atlas URL.
Connect.
Open:
ProductDB
You will see:
products collection
Open collection.
View inserted document.
Understanding Model
Schema:
Blueprint
Model:
Actual object used for CRUD operations
Example:
const Product = mongoose.model(
'Product',
ProductSchema
);
Now:
Product.create()

Product.find()

Product.updateOne()

Product.deleteOne()
can be used.
Step 17 Add Get All Products API
Inside routes:
router.get('/products', async(req,res)=>{

   const products =
   await Product.find();

   res.json(products);

});
Test:
GET

http://localhost:3000/api/products
Step 18 Add Search API
router.get('/products/category/:category',async(req,res)=>{

   const products =
   await Product.find({
       category:req.params.category
   });

   res.json(products);

});
Test:
GET

/api/products/category/Electronics
Step 19 Add Update API
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
Request
PUT

/api/products/ID
Body
{
 "price":85000
}
Step 20 Add Delete API
router.delete('/products/:id', async(req,res)=>{

   await Product.findByIdAndDelete(
       req.params.id
   );

   res.json({
       message:"Deleted Successfully"
   });

});
Step 21 Advanced Schema Validation
Modify schema.
price:{
type:Number,
required:true,
min:1000
}
Stock Validation
stock:{
type:Number,
min:0
}

Name Validation
name:{
type:String,
required:true,
minlength:3,
maxlength:100
}
Category Enum
category:{
type:String,
enum:[
'Electronics',
'Fashion',
'Books',
'Home'
]
}
Test Validation
Try:
{
"name":"TV",
"category":"Unknown",
"price":500
}
Error returned.
Validation works.
Step 22 Create More Sample Documents
{
"name":"iPhone 16",
"category":"Electronics",
"price":95000,
"stock":10
}
{
"name":"Nike Shoes",
"category":"Fashion",
"price":5000,
"stock":50
}
{
"name":"JavaScript Guide",
"category":"Books",
"price":1200,
"stock":100
}
