const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subcategoryTitle: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 20,
  },

  subcategoryDescription: {
    type: String,
    trim: true,
    default: "Subcategory Description",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  productCount: {
    type: Number,
    default: 0,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const SubCategory = new mongoose.model("SubCategory", subcategorySchema);
module.exports = SubCategory;
