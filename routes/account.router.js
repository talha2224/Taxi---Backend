const router = require("express").Router()
const { createAccount, loginAccount, getAccountById, resendOtp, verifyOtp, changeLocation, changeRate, getAccountByCategory } = require("../services/account.service")
const { multipleupload } = require("../config/multer.config")

router.post("/register",multipleupload.fields([{ name: 'profilePhoto', maxCount: 1 },{ name: 'licenseImage', maxCount: 3},{ name: 'carPhotos', maxCount: 3},{ name: 'insuranceImage', maxCount: 3},]),createAccount)
router.post("/login",loginAccount)
router.post("/resend-otp/:id",resendOtp)
router.post("/verify-otp",verifyOtp)
router.get("/single/:id",getAccountById)
router.put("/update/location/:id",changeLocation)
router.put("/update/rate/:id",changeRate)
router.get("/category/:id",getAccountByCategory)



module.exports = router