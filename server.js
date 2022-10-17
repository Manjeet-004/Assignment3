/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: ___________Manjeet Kaur___________ Student ID: ___162114219___________ Date: ________16 October 2022________
*
*  Online (Cyclic) Link: __________________https://calm-blue-crayfish-tie.cyclic.app
__________________________________
*
********************************************************************************/ 
const express = require('express');
const multer = require("multer");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const productData = require("./product-service");
const upload = multer();
const path = require("path");
const app = express();

cloudinary.config({ 
    cloud_name: 'dh9zzfsyd', 
    api_key: '763859315776413', 
    api_secret: '78a9jgOkhqA9ZJcsXTi4bENZVZk' 
  });

const HTTP_PORT = process.env.PORT || 8081;

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"))
});


app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"))
});

app.get('/product/add', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addProduct.html"))
});

    
  app.post("/products/add", upload.single("featureImage"), function (req, res) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
  
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
  
    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
      return result;
    }
  
    upload(req).then((uploaded) => {
      req.body.featureImage = uploaded.url;
    });
  
    
    productSrv.addProduct(req.body).then(() => {
      res.redirect("/demos"); 
    });
  });
  


  app.get("/products", function (req, res) {
    productSrv
      .getPublishedProducts()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json({ message: err });
      });
  });
  
  
  app.get("/demos", function (req, res) {
    
    if (req.query.category) {
      productSrv
        .getProductByCategory(req.query.category)
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json({ message: err });
        });
      
    } else if (req.query.minDateStr) {
      productSrv
        .getProductsByMinDate(req.query.minDateStr)
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json({ message: err });
        });
  
      
    } else {
      productSrv
        .getAllProducts()
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json({ message: err });
        });
    }
  });
  
  
  app.get("/categories", function (req, res) {
    productSrv
      .getCategories()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json({ message: err });
      });
  });
  
  
  app.get("/product/:value", function (req, res) {
    productSrv
      .getProductById(req.params.value)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json({ message: err });
      });
  });
  
app.use((req,res)=>{
    res.status(404).send("404 - Page Not Found")
})

productData.initialize().then(()=>{
    app.listen(HTTP_PORT, () => { 
        console.log('server listening on: ' + HTTP_PORT); 
    });
}).catch((err)=>{
    console.log(err);
})