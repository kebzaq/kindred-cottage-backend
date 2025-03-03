const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: [true, "Please provide a check-in date"]
    },
    endDate: {
      type: Date,
      required: [true, "Please provide a check-out date"]
    },
    numberOfGuests: {
      type: Number,
      required: [true, "Please provide number of guests"],
      min: 1,
    },
    numberOfNights: {
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled", "completed"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user ID who created the Booking"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
