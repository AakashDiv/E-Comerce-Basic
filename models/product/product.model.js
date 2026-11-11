
const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
          title: {
               type:String,
               required: true,
               trim: true
          },
            description: {
               type:String,
               required: true
          },
          price: {
               type:Number,
               required: true,
               min:0
          },
          discountPrice: {
               type:Number,
               default:null
          },
          category: {
               type:mongoose.Types.ObjectId,
               ref: "Category",
               required: true
          },
           brand: {
               type:String,
               required: true,
               trim: true
          },
            
          isActive: {
              type: Boolean,
              default: true,

          },
          
         isFeature: {
              type: Boolean,
              default: false,

          },

          images:{
            type: String,
            required: true,
          },

        SKU: {
            type:String,
            required: true,
            unique: true,
            trim: true,
        },

          stock: {
            type:Number,
            required: true,
            default: 0,
            min: 0,
        },

        reviews: [
            {
            type:mongoose.Types.ObjectId,
            ref: "Review",
        }
        ],

          createdBy: {
               type: mongoose.Types.ObjectId,
               ref: "Users",
               required: true
          },
          
})

productSchema.pre("validate", function(){
      if(this.discountPrice !== null && this.discountPrice !== undefined && this.discountPrice >= this.price ){
           this.invalidate('discountPrice', 'Discount price must be less than original price')
      }
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;