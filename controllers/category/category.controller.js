

const { default: mongoose } = require("mongoose");
const Category = require("../../models/category/category.model");
const ApiResponse = require("../../utils/ApiResponse");
const BadRequest = require("../../utils/Badrequest");
const NotFound = require("../../utils/NotFound");

const createCategoryController = async(req, res, next)=>{
    const{name, description, coverImage} = req.body;

      try {
        if(!name.trim() || !description.trim() || !coverImage.trim()){
             return next(new BadRequest("all fields are required"))
        }

           const category = await Category.create({
               name: name,
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

           const response = new ApiResponse(201, data, "category created successfully")
           res.status(201).json(response)

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

           const response = new ApiResponse(201, data, "single category get successfully")
           res.status(201).json(response)

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
              updateData.name = name
          }

          if(description !== undefined){
              updateData.description = description
          }

            if(coverImage !== undefined){
              updateData.coverImage = coverImage
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

        const deleteCategory = await Category.findByIdAndDelete(categoryId)

        if(!deleteCategory){
             return next (new NotFound(`category not found ${categoryId}`))
        }

        let data = {
                 data: deleteCategory,
                 success: true
           }

           const response = new ApiResponse(201, data, "category delete successfully")
         return  res.status(201).json(response)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    createCategoryController, getAllCategoriesController, getSingleCategoryController, updateCategoryController, deleteCategoryController
}

