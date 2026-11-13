
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
       name:{
        type:String,
        required:true,
        lowercase:true,
        unique: true,
        trim: true
       },
       description:{
        type:String,
        required:true,
       },
       coverImage:{
        type:String,
        required:true,
        trim:true,
       },
       parentCategory:{
           type:mongoose.Types.ObjectId,
           ref:"Category",
           default: null
       }
}, { timestamps: true})

const Category = mongoose.model("Category", categorySchema);
module.exports=Category