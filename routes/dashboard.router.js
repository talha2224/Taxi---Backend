const { dashboardData } = require("../services/dashboard.service")

const router = require("express").Router()
router.get("/data",dashboardData)





module.exports = router