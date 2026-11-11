
const Product = require("../../models/product/product.model");
const ApiResponse = require("../../utils/ApiResponse")
const ApiError = require("../../utils/ApiError");
const BadRequest = require("../../utils/Badrequest")
const Unauthorized = require("../../utils/Unauthorized");
const NotFound = require("../../utils/NotFound");
const { response } = require("../../app");

const getAllProducts = async(req, res, next)=>{
            try {
                const products = await Product.find({})
                let data = {
                       data: products,
                       success: true,
                       length: products.length
                }

               const response = new ApiResponse(200, data, 'All products')
                res.status(200).json(response);

            } catch (error) {
                return next(error)
            }
}

const getSingleProducts = async(req, res, next)=>{
          const {id: productId} = req.params.id
            try {
                 
                const product = await Product.findById({_id: productId})

                if(!product){
                    return next(new NotFound(`Product not found on this id ${productId}`) )
                }

                let data = {
                    data: product,
                    success: true
                }

                const response = new ApiResponse(200, data, 'Single Product')
                res.status(200).json(response)

            } catch (error) {
                return next(error)
            }
}

const createProducts = async(req, res, next)=>{
        const {title, description, price, discountPrice, category, brand, isActive, isFeature, images, SKU, stock, createdBy} = req.body;

          const userId = req.user.userId;

            try {
               
              if(!title|| !description ||  !price || !discountPrice ||  !category || !brand || !isActive || !isFeature || !images || !reviews || !SKU || !stock || !createdBy){
                    return next(new BadRequest("All fields required"))
              }

              const product = await Product.create({
                title: title,
                description: description,
                price: price,
                discountPrice: discountPrice,
                category: category,
                brand: brand,
                isActive: isActive,
                isFeature: isFeature,
                images: images,
                SKU: SKU,
                stock: stock,
                reviews: [reviews],
                createdBy: userId,
              });

              let data = {
                  data: product,
                  success: true
              }

              const response = new ApiResponse(201, data, "Product Created Successfuly");
              res.status(201).json(response)

            } catch (error) {
                return next(error)
            }
}

const updateProducts = async(req, res, next)=>{
         const {id: productId} = req.params.id;
         const {title, description, price, discountPrice, category, brand, isActive, isFeature, images, SKU, stock, createdBy} = req.body;

          const userId = req.user.userId;
        
            try {
              
                const product = await Product.findById({_id: productId});
                if(!product){
                     return next(new NotFound(`Product not found on this id ${productId}`) )
                }

                const updateProduct = await Product.findOneAndUpdate({...req.body})

            } catch (error) {
                return next(error)
            }
}

const deleteProducts = async(req, res, next)=>{
            try {
                res.status(200).json({
                    message: "Delete product"
                })
            } catch (error) {
                return next(error)
            }
}

module.exports = {
    getAllProducts,getSingleProducts, createProducts, updateProducts,deleteProducts
}

