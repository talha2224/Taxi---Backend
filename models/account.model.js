const mongoose = require("mongoose")



const AccountSchema = mongoose.Schema({
    role:{type:String,default:null},
    username:{type:String,default:null},
    email:{type:String,default:null},
    phone:{type:String,default:null},
    password:{type:String,default:null},
    profilePhoto:{type:String,default:null},
    dob:{type:String,default:null},
    licenseImage: { type: Array, default: null },
    insuranceImage: { type: Array, default: null },
    carPhoto:{ type: Array, required: true },
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    vehcileName:{type:String},
    vehicleNumber:{type:String},
    longitude:{type:Number,default:null},
    latitude:{type:Number,default:null},
    rate:{type:Number,default:0},
    otp:{type:Number,default:null},
    accountVerified:{type:Boolean,default:false}
})



const Account = mongoose.model("Account",AccountSchema,"Account")


module.exports ={ Account }
