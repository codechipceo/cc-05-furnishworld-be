const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageId: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    trim: true,
    required: true,
  },
  saleStatus: {
    type: String,
    enum: ["newArrived", "bestSellers", "saleItems"], // predefined sale statuses
    default: "newArrived", // default value
  },
  productDescription: {
    type: String,
    trim: true,
    default: "Product Description",
  },
  productImages: [imageSchema],
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  categoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    salePrice: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Product", productSchema);

module.exports = Products;
