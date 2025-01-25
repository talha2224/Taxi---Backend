const { getWalletHistory } = require("../services/wallet.service");
const router = require("express").Router()
router.get("/history/:id",getWalletHistory)





module.exports = router