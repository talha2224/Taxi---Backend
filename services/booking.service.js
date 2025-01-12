const bookingModel = require("../models/booking.model");

const createBooking = async (req, res) => {
    try {
        const { riderId, driverId, pickupLocation, dropoffLocation, dropoffAddress,pickUpAddress,distance} = req.body;

        if (!riderId || !driverId || !pickupLocation || !dropoffLocation) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const fare = distance * 5;
        const newBooking = await bookingModel.create({ rider: riderId, driver: driverId, pickupLocation, dropoffLocation, fare, distance, status: 'Pending', dropoffAddress,pickUpAddress });
        return res.status(201).json({ message: 'Booking created successfully', data: newBooking,status:200 });

    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const getPendingBookingForDriver = async (req, res) => {
    try {
        const newBooking = await bookingModel.find({ driver: req.params.id, status:req.params.status}).populate("rider")
        return res.status(200).json({ data: newBooking,status:200,msg:null});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}
const getPendingBookingForRider= async (req, res) => {
    try {
        const newBooking = await bookingModel.find({ rider: req.params.id, status:req.params.status}).populate("driver")
        return res.status(200).json({ data: newBooking,status:200,msg:null});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

const acceptBooking = async (req, res) => {
    try {
        const newBooking = await bookingModel.findByIdAndUpdate(req.params.id, { status: 'Ongoing', accepted: true },{new:true});
        return res.status(200).json({ data: newBooking,msg:"Ride accepted by driver",status:200 });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

const cancellBooking = async (req, res) => {
    try {
        const newBooking = await bookingModel.findByIdAndUpdate(req.params.id, { status: 'Cancelled', cancelled: true },{new:true});
        return res.status(200).json({ data: newBooking,msg:"Ride cancelled",status:200 });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}
const completedRide = async (req, res) => {
    try {
        const newBooking = await bookingModel.findByIdAndUpdate(req.params.id, { status: 'Completed', accepted: true }, { $new: true });
        return res.status(200).json({ data: newBooking,msg:"Ride completed",status:200 });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


const getBookingById = async (req, res) => {
    try {
        const newBooking = await bookingModel.findById(req.params.id).populate("rider").populate("driver")
        return res.status(200).json({ data: newBooking,msg:null,status:200 });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}


module.exports = {createBooking,getPendingBookingForDriver,getPendingBookingForRider,acceptBooking,completedRide,cancellBooking,getBookingById}