const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    categoryTitle: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    categoryImage: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CATEGORY = new mongoose.model("Category", categorySchema);
module.exports = CATEGORY;
