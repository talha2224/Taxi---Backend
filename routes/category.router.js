const { createCategory, getCategory } = require("../services/category.service")

const router = require("express").Router()
router.post("/create",createCategory)
router.get("/all",getCategory)





module.exports = router