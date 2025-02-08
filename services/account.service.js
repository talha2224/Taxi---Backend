const { Account } = require("../models/account.model");
const bcrypt = require("bcryptjs")
const { uploadFile, generatePin, sendOtp } = require("../utils/function")




const createAccount = async (req, res) => {
    try {
        let { role, username, email, password, dob, phone, category, vehcileName, vehicleNumber, longitude, latitude, rate } = req.body
        let findUser = await Account.findOne({ email })
        if (findUser) {
            return res.status(400).json({ data: null, msg: "Account already exits", code: 400 })
        }
        else {
            if (role == "rider") {
                let profilePhoto = req.files.profilePhoto && req.files.profilePhoto;
                let output = await uploadFile(profilePhoto?.length > 0 ? profilePhoto[0] : profilePhoto);
                let hash = await bcrypt.hash(password, 10)
                let result = await Account.create({ phone, role, username, email, password: hash, dob, profilePhoto: output, longitude, latitude })
                return res.status(200).json({ data: result, msg: null, status: 200 })
            }
            else {
                let profilePhoto = req.files.profilePhoto && req.files.profilePhoto;
                let licenseImage = req.files.licenseImage && req.files.licenseImage;
                let insuranceImage = req.files.insuranceImage && req.files.insuranceImage;
                let carPhotos = req.files.carPhotos && req.files.carPhotos;

                let output = await uploadFile(profilePhoto);
                let output2;
                let output3;
                let output4 = [];
                if (licenseImage && licenseImage.length > 0) {
                    const uploadPromises = licenseImage.map(async (i) => {
                        let result = await uploadFile(i)
                        return result;
                    });
                    output2 = await Promise.all(uploadPromises);
                }
                if (insuranceImage && insuranceImage.length > 0) {
                    const uploadPromises = insuranceImage.map(async (i) => {
                        let result = await uploadFile(i)
                        return result;
                    });
                    output3 = await Promise.all(uploadPromises);
                }
                if (carPhotos && carPhotos.length > 0) {
                    const uploadPromises = carPhotos.map(async (i) => {
                        let result = await uploadFile(i)
                        return result;
                    });
                    output4 = await Promise.all(uploadPromises);
                }
                console.log(output,output2,output3,output4,'output')
                let hash = await bcrypt.hash(password, 10)
                let result = await Account.create({ rate, category,phone, role, username, email, password: hash, dob, profilePhoto: output, carPhotos: output4, insuranceImage: output3, licenseImage: output2, vehcileName, vehicleNumber, longitude, latitude })
                return res.status(200).json({data: result, msg: null, status: 200 })
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}
const loginAccount = async (req, res) => {
    try {
        let { phone } = req.body
        let findUser = await Account.findOne({ phone })
        if (!findUser) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else if (findUser.accountBlocked) {
            return res.status(403).json({ data: null, msg: "Account blocked by admin", code: 403 })
        }
        else {
            let pin = generatePin()
            await sendOtp(findUser?.phone, pin);
            await Account.findByIdAndUpdate(findUser?._id, { otp: pin }, { new: true })
            return res.status(200).json({ otp: pin, data: findUser, code: 200, msg: "Login successful" })
        }
    }
    catch (error) {
        console.log(error)
    }
}
const loginAccountWithGoogle = async (req, res) => {
    try {
        let { email } = req.body
        let findUser = await Account.findOne({ email })
        if (!findUser) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else if (findUser.accountBlocked) {
            return res.status(403).json({ data: null, msg: "Account blocked by admin", code: 403 })
        }
        else {
            return res.status(200).json({data: findUser, code: 200, msg: "Login successful" })
        }
    }
    catch (error) {
        console.log(error)
    }
}

const createAdminAccount = async (req, res) => {
    try {
        let { username, email, password } = req.body
        let findUser = await Account.findOne({ email })
        if (findUser) {
            return res.status(400).json({ data: null, msg: "Account already exits", code: 400 })
        }
        else {
            let hash = await bcrypt.hash(password, 10)
            let result = await Account.create({ role: "admin", username, email, password: hash })
            return res.status(200).json({ data: result, msg: "Account created", status: 200 })
        }
    }
    catch (error) {
        console.log(error)
    }
}
const adminLoginAccount = async (req, res) => {
    try {
        let { email, password } = req.body
        let findUser = await Account.findOne({ email, role: "admin" })
        if (!findUser) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        let compare = await bcrypt.compare(password, findUser.password)
        if (compare) {
            return res.status(200).json({ data: findUser, code: 200, msg: "Login Successful" })
        }
        else {
            return res.status(403).json({ data: null, msg: "Invalid credentails", code: 403 })
        }
    }
    catch (error) {
        console.log(error)
    }
}

const resendOtp = async (req, res) => {
    try {
        let { id } = req.params
        let user = await Account.findById(id)
        if (!user) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            let pin = generatePin()
            await sendOtp(user?.phone, pin);
            await Account.findByIdAndUpdate(id, { otp: pin }, { new: true })
            return res.status(200).json({ data: null, msg: "OTP send sucessfully", code: 200 })

        }
    }
    catch (error) {
        console.log(error)
    }
}
const verifyOtp = async (req, res) => {
    try {
        let { id, otp } = req.body
        let user = await Account.findById(id)
        if (!user) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            if (otp == user?.otp) {
                await Account.findByIdAndUpdate(id, { otp: null, accountVerified: true }, { new: true })
                return res.status(200).json({ data: user, msg: "Account Verified", code: 200 })
            }
            else {
                return res.status(403).json({ data: user, msg: "Invalid Otp", code: 403 })
            }

        }
    }
    catch (error) {
        console.log(error)
    }
}
const getAccountById = async (req, res) => {
    try {
        let findUser = await Account.findById(req.params.id).populate("category")
        return res.status(200).json({ data: findUser, code: 200 })

    }
    catch (error) {
        console.log(error)
    }
}
const getAccountByCategory = async (req, res) => {
    try {
        let findUser = await Account.find({ category: req.params.id }).populate("category")
        return res.status(200).json({ data: findUser, code: 200 })

    }
    catch (error) {
        console.log(error)
    }
}

const getAccounts = async (req, res) => {
    try {
        let findUser = await Account.find({}).populate("category")
        return res.status(200).json({ data: findUser, code: 200 })

    }
    catch (error) {
        console.log(error)
    }
}

const changeLocation = async (req, res) => {
    try {
        let { id } = req.params
        let user = await Account.findByIdAndUpdate(id, { latitude: req.body.latitude, longitude: req.body.longitude }, { new: true })
        if (!user) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            return res.status(200).json({ data: user, msg: "Location Updated", code: 200 })

        }
    }
    catch (error) {
        console.log(error)
    }
}

const changeRate = async (req, res) => {
    try {
        let { id } = req.params
        let user = await Account.findByIdAndUpdate(id, { rate: req.body.rate }, { new: true })
        if (!user) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            return res.status(200).json({ data: user, msg: "Rate Updated", code: 200 })

        }
    }
    catch (error) {
        console.log(error)
    }
}

const toogleAccountActivation = async (req, res) => {
    try {
        let { accountId, toogle } = req.body
        console.log(accountId, 'accountId')
        let toogleAccount = await Account.findByIdAndUpdate(accountId, { accountBlocked: Boolean(toogle) }, { new: true })
        console.log(toogleAccount, 'toogleAccount')
        return res.status(200).json({ data: toogleAccount, msg: `Account ${Boolean(toogle) ? "Deactivated" : "Activated"} ` })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ data: null, msg: error })
    }
}

module.exports = { toogleAccountActivation, getAccounts, loginAccountWithGoogle,createAccount, loginAccount, createAdminAccount, adminLoginAccount, getAccountById, resendOtp, verifyOtp, changeLocation, changeRate, getAccountByCategory }
