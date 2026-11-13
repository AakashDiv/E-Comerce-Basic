

const { default: mongoose } = require("mongoose");
const Category = require("../../models/category/category.model");
const Product = require("../../models/product/product.model")
const ApiResponse = require("../../utils/ApiResponse");
const BadRequest = require("../../utils/Badrequest");
const NotFound = require("../../utils/NotFound");

const createCategoryController = async(req, res, next)=>{
    const{name, description, coverImage} = req.body;

      try {
        if(typeof name !== 'string' || !name.trim() 
           || description !== 'string' || description.trim()
           || coverImage !== 'string'  || coverImage.trim()
        
        ){
             return next(new BadRequest("all fields are required"))
        }

        const normalizedName = name.trim().toLowerCase()

        //check duplicate category
        const isCategoryExist = await Category.findOne({name: normalizedName});

        if(isCategoryExist){
             return next(new BadRequest(`category ${name} already present`))
        }


           const category = await Category.create({
               name: normalizedName,
               description: description,
               coverImage: coverImage,
           })    

        
           let data = {
                 data: category,
                 success: true
           }

           const response = new ApiResponse(201, data, "category created successfully")
           res.status(201).json(response)

      } catch (error) {
        return next(error)
      }
}

const getAllCategoriesController = async(req, res, next)=>{
    try {
        const category = await Category.find({});

          let data = {
                 data: category,
                 success: true
           }

           const response = new ApiResponse(200, data, "category created successfully")
           res.status(200).json(response)

    } catch (error) {
        return next(error)
    }
}

const getSingleCategoryController = async(req, res, next)=>{
    const{id: categoryId} = req.params;
     try {
        if(!mongoose.isValidObjectId(categoryId)){
               return next(new BadRequest(`Invalid category ${categoryId}`))
        }

  const category = await Category.findById(categoryId);

  if(!category){
    return next (new NotFound(`category not found ${categoryId}`))
  }

        let data = {
                 data: category,
                 success: true
           }

           const response = new ApiResponse(200, data, "single category get successfully")
           res.status(200).json(response)

    } catch (error) {
        return next(error)
    }
}

const updateCategoryController = async(req, res, next)=>{
     const{id: categoryId} = req.params;
      const { name, description, coverImage } = req.body;
      try {
          
           if(!mongoose.isValidObjectId(categoryId)){
               return next(new BadRequest(`No Cateogry Found ${categoryId}`))
        };

          const updateData = {};

          if(name !== undefined){
              if(typeof name !== 'string' || !name.trim()){
                 return next (new BadRequest("Category name cannot be empty"))
              }
              const normalizeName = name.trim().toLowerCase();

        const isCategoryExist = await Category.findOne({name: normalizeName, _id: {$ne: categoryId}});

        if(isCategoryExist){
             return next(new BadRequest(`category ${name} already present`))
        }

              updateData.name = normalizeName
          }

          if(description !== undefined){
              updateData.description = description
          }

            if(coverImage !== undefined){
              updateData.coverImage = coverImage
          }

          if(Object.keys(updateData).length == 0){
                return next(new BadRequest("Please provide fields to update"));
          }


        const updateCategory = await Category.findByIdAndUpdate(
              categoryId,
              updateData,
             {
                new: true,
                runValidators: true
             }
        )

        if(!updateCategory){
            return next (new NotFound(`category not found ${categoryId}`))
        }
        

        const response = new ApiResponse(200, updateCategory, "category updated successfully");

        return res.status(200).json(response)

    } catch (error) {
        return next(error)
    }
}

const deleteCategoryController = async(req, res, next)=>{
    const{id: categoryId} = req.params;
     try {
     
        if(!mongoose.isValidObjectId(categoryId)){
               return next(new BadRequest(`No Cateogry Found ${categoryId}`))
        };

  //check before delete category has product
  const isCategoryUsed = await Product.exists({category: categoryId})

  if(isCategoryUsed){
      return next(new BadRequest(`Cannot delete category because products are linked to it `))
  }

        const deleteCategory = await Category.findByIdAndDelete(categoryId)

        if(!deleteCategory){
             return next (new NotFound(`category not found ${categoryId}`))
        }

        let data = {
                 data: deleteCategory,
                 success: true
           }

           const response = new ApiResponse(200, data, "category delete successfully")
         return  res.status(200).json(response)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    createCategoryController, getAllCategoriesController, getSingleCategoryController, updateCategoryController, deleteCategoryController
}

