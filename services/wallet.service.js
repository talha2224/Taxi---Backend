const { Wallet } = require("../models/wallet.history");


const getWalletHistory = async (req,res)=>{
    try {
        let data = await Wallet.find({accountId:req.params.id})
        return res.status(200).json({ data:data,msg:null,status:200 });
    } 
    catch (error) {
        console.log(error)
    }
}


module.exports = {getWalletHistory}
