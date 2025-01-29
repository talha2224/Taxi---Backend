const mongoose = require("mongoose")



const walletSchema = mongoose.Schema({
    accountId:{type:mongoose.Schema.Types.ObjectId,ref:"Account",required:true},
    type:{type:String,default:false},
    amount:{type:Number,default:false},
    msg:{type:String,default:false},
    bookingId:{type:mongoose.Schema.Types.ObjectId,ref:"Booking",required:true}
})



const Wallet = mongoose.model("Wallet",walletSchema,"Wallet")


module.exports ={ Wallet }
