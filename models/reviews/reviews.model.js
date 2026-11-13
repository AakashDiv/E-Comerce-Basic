
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
          product:{
             type: mongoose.Types.ObjectId,
             ref:"Product",
             required:true
          },
          comment:{
             type: String,
             required:true
          },
          rating:{
             type: Number,
             required:true,
             min:1,
             max:5,
             validate: {
                  validator: Number.isInteger,
                  message: "Rating must be whole number"
             }
          },
          createdBy:{
              type: mongoose.Types.ObjectId,
              ref: "Users",
              required:true,
          }
}, {timestamps: true})

reviewSchema.index(
      {product:1, createdBy: 1},
      {unique: true}
)

const Reviews = mongoose.model("Reviews", reviewSchema);
module.exports = Reviews