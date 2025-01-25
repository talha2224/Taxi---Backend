const mongoose = require("mongoose")



const walletSchema = mongoose.Schema({
    accountId:{type:mongoose.Schema.Types.ObjectId,ref:"Account",required:true},
    type:{type:String,default:false},
    amount:{type:Boolean,default:false},
    msg:{type:String,default:false}
})



const Wallet = mongoose.model("Wallet",walletSchema,"Wallet")


module.exports ={ Wallet }