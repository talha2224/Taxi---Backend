const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  pickupLocation: { type: Array, required: true }, // Array of numbers
  dropoffLocation: { type:Array, required: true }, // Array of numbers
  fare: { type: Number, required: true },
  distance: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  bookingTime: { type: Date, default: Date.now },
  accepted: { type: Boolean, default: false },
  cancelled: { type: Boolean, default: false },
  dropoffAddress: { type: String, default: '' },
  pickUpAddress: { type: String, default: '' }
}, { timestamps: true });


module.exports = mongoose.model('Booking', bookingSchema,'Booking');
