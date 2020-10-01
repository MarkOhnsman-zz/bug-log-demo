import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

var Note = new Schema({
  body: { type: String, required: true },
  bug: { type: ObjectId, ref: 'Bug', required: true },
  flagged: { type: String, enum: ["pending", "completed", "rejected"] },
  creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

export default Note