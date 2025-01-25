const { createCategory, getCategory, updateCategory } = require("../services/category.service")

const router = require("express").Router()
router.post("/create",createCategory)
router.put("/update/:id",updateCategory)
router.get("/all",getCategory)





module.exports = router