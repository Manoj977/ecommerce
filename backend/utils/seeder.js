const products = require('../data/Products.json');
const product = require('../models/productModel');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();
const seederProducts = async () => {
  try {
    await product.deleteMany();
    console.log('Products Deleted!');
    await product.insertMany(products);
    console.log('all products inserted');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

seederProducts();
