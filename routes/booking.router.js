const { createBooking, getPendingBookingForDriver, getPendingBookingForRider, acceptBooking, cancellBooking, completedRide, getBookingById } = require("../services/booking.service")

const router = require("express").Router()
router.post("/create",createBooking)
router.get("/rider/:id/:status",getPendingBookingForRider)
router.get("/driver/:id/:status",getPendingBookingForDriver)
router.put("/accept/:id",acceptBooking)
router.put("/cancel/:id",cancellBooking)
router.put("/complete/:id",completedRide)
router.get("/single/:id",getBookingById)








module.exports = router