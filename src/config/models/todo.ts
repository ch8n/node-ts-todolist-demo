import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  proirty: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model("todo", todoSchema);
