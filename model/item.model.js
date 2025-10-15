import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    partId: {
      type: String,
      required: [true, "Please enter the part ID"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please enter the item description"],
    },
    quantity: {
      type: Number,
      required: [true, "please enter the quantity"],
      default: 0,
      min: 0,
    },
    unitOfItem: {
      type: String,
      required: true,
      default: "Unit",
    },
    costPerUnit: {
      type: Number,
      required: [true, "Please enter the item cost per unit"],
      min: 0,
    },
    costUnit: {
      type: String,
      require: true,
      default: "THB",
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
