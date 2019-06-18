const getDb = require('../utils/database').getDb;

class Product {
  constructor(title, price, description, imgUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
  }
  save(){

  }
}

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;