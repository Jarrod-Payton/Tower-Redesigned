import mongoose from "mongoose";

const Schema = mongoose.Schema

export const EventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, default: 'https://thiscatdoesnotexist.com' },
    location: { type: String, required: true },
    capacity: { type: Number, min: 0, max: 10000 },
    startDate: { type: Date, min: Date.now },
    isCanceled: { type: Boolean, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },
    creatorId: { type: Object },
    creator: { type: Object }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})