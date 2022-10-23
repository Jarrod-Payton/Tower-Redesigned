import mongoose from "mongoose";

const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    creatorId: {type: Object, required: true},
    eventId: {type: Object, required: true},
    body: {type: String, required: true},
  },
  { timestamps: true, toJSON: {virtuals: true}}
)
CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
CommentSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})