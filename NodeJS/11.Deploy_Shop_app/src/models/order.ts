const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

export {};
