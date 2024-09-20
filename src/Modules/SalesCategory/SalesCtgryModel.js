const mongoose = require("mongoose");
const { Schema } = mongoose;

const salesCategorySchema = new Schema(
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
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    itemLimit: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

salesCategorySchema.methods.addItem = async function (itemId) {
  if (this.items.length >= this.itemLimit) {
    throw new Error("Item limit reached for this category.");
  }
  this.items.push(itemId);
  await this.save();
};

const SalesCategory = mongoose.model("SalesCategory", salesCategorySchema);
module.exports = SalesCategory;
