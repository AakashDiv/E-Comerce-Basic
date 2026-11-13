
const express = require("express");
const route = express.Router();

const {getAllProducts,getSingleProducts, createProducts, updateProducts,deleteProducts} = require("../controllers/product/product.controller")

route.get('/', getAllProducts);

module.exports = route