const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
    default: "Pending",
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  shippingMethod: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  expectedDeliveryDate: {
    type: Date,
    required: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  isDelete:{
    type: Boolean ,
    default: false
  },

}, {
  timestamps:true
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
