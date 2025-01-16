const mongoose = require("mongoose")



const AccountSchema = mongoose.Schema({
    role:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    profilePhoto:{type:String,required:true},
    dob:{type:String,required:true},
    licenseImage: { type: Array, default: null },
    insuranceImage: { type: Array, default: null },
    carPhoto:{ type: Array, required: true },
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    otp:{type:Number,default:null},
    accountVerified:{type:Boolean,default:false}
})



const Account = mongoose.model("Account",AccountSchema,"Account")


module.exports ={ Account }
