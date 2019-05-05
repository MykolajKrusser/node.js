const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(
  rootDir,
  'data', 
  'products.json'
);

const getProductsFromFile = callback => {
  fs.readFile(p, (err, fileContent)=>{
    if(err){
      callback([])
    } else {
      callback(JSON.parse(fileContent));
    };
    
  })
};

module.exports = class Product {
  constructor(title, imgUrl, description, price){
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }
  save(){
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err)=>{
        console.log(err);
      });
    });
  }
  static fetchAll(callback){
    getProductsFromFile(callback);
  }
}