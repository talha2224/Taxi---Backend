const router = require("express").Router()
const { loginAccountWithGoogle,createAccount, loginAccount, getAccountById, resendOtp, verifyOtp, changeLocation, changeRate, getAccountByCategory, adminLoginAccount, createAdminAccount, getAccounts, toogleAccountActivation } = require("../services/account.service")
const { multipleupload } = require("../config/multer.config")

router.post("/register",multipleupload.fields([{ name: 'profilePhoto', maxCount: 1 },{ name: 'licenseImage', maxCount: 3},{ name: 'carPhotos', maxCount: 3},{ name: 'insuranceImage', maxCount: 3},]),createAccount)
router.post("/login",loginAccount)
router.post("/login-google",loginAccountWithGoogle)
router.post("/admin/register",createAdminAccount)
router.post("/admin/login",adminLoginAccount)
router.post("/resend-otp/:id",resendOtp)
router.post("/verify-otp",verifyOtp)
router.post("/toogle-account",toogleAccountActivation)
router.get("/single/:id",getAccountById)
router.get("/all",getAccounts)
router.put("/update/location/:id",changeLocation)
router.put("/update/rate/:id",changeRate)
router.get("/category/:id",getAccountByCategory)



module.exports = router
