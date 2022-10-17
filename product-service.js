const fs = require("fs");

let products = [];
let categories = [];

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/products.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                products = JSON.parse(data);

                fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        categories = JSON.parse(data);
                        resolve();
                    }
                });
            }
        });
    });
}


module.exports.getAllProducts = function () {
    var all_products = [];
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < products.length; i++) {
        all_products.push(products[i]);
      }
      if (all_products.length == 0) {
        reject("no results returned");
      }
      resolve(all_products);
    });
  };
  
  
  module.exports.addProduct = (productData) => {
    if (typeof productData.published === "undefined") {
      productData.published = false;
    } else {
      productData.published = true;
    }
    productData.id = products.length + 1;
    products.push(productData);
  
    return new Promise((resolve, reject) => {
      if (products.length == 0) {
        reject("no results returned");
      } else {
        resolve(products);
      }
    });
  };
  
  
  module.exports.getPublishedProducts = function () {
    var published_products = [];
  
    return new Promise(function (resolve, reject) {
      for (var a = 0; a < products.length; a++) {
        if (products[a].published == true) {
          published_products.push(products[a]);
        }
      }
      if (published_products.length == 0) {
        reject("no results returned");
      }
      resolve(published_products);
    });
  };
  
  
  module.exports.getCategories = function () {
    var c_categories = [];
    return new Promise(function (resolve, reject) {
      if (products.length == 0) {
        reject("no data returned");
      } else {
        for (var v = 0; v < categories.length; v++) {
          c_categories.push(categories[v]);
        }
        if (c_categories.length == 0) {
          reject("no data returned");
        }
      }
      resolve(c_categories);
    });
  };
  
  
  module.exports.getProductByCategory = (category) => {
    return new Promise((resolve, reject) => { // p = product 
      var p_category = products.filter(
        (product) => product.category == category
      );
      if (p_category.length == 0) {
        reject("no results returned");
      }
      resolve(p_category);
    });
  };
  
  
  module.exports.getProductsByMinDate = (minDateStr) => {
    return new Promise((resolve, reject) => {
      var p_date = products.filter((products) => products.postDate >= minDateStr);
      if(new Date(someObj.postDate) >= new Date(minDateStr)){
        console.log("The postDate value is greater than minDateStr")
    }
    
      if (p_date.length == 0) {
        reject("no results returned");
      }
      resolve(p_date);
      
    });
  };
  
  
  module.exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
      var p_id = products.filter((products) => products.id == id);
      if (p_id.length == 0) {
        reject("no results returned");
      }
      resolve(p_id);
    });
  };
  