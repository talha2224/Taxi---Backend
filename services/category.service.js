const { Category } = require("../models/category.model");



const createCategory = async(req,res)=>{
    try {
      let data = await Category.create(req.body) 
      return  res.status(200).json({data,msg:"Category Created",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}
const updateCategory = async(req,res)=>{
    try {
      let data = await Category.findByIdAndUpdate(req.params.id,req.body) 
      return  res.status(200).json({data,msg:"Category Updated",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

const getCategory = async(req,res)=>{
    try {
      let data = await Category.find({}) 
      return  res.status(200).json({data,msg:"Category Found",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}


module.exports = {createCategory,getCategory,updateCategory}