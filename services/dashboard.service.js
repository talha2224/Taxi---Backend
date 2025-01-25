const { Account } = require("../models/account.model");
const bookingModel = require("../models/booking.model");



const dashboardData = async (req,res)=>{
    try {
      let totalRiders = await Account.find({role:"rider"})  
      let totalDrivers = await Account.find({role:"driver"})  
      let totalBookings = await bookingModel.find({}).populate("rider").populate("driver")
      let completedBookings = await bookingModel.find({status:"Completed"}).populate("rider").populate("driver")
      return res.status(200).json({ data:{totalRiders:totalRiders?.length,totalDrivers:totalDrivers?.length,totalBookings:totalBookings.length,completedBookings:completedBookings?.length,totalBookingsData:totalBookings,completedBookingsData:completedBookings,totalDriversData:totalDrivers}, msg: "" });
    } 
    catch (error) {
      console.log(error)
    }
}

module.exports={dashboardData}