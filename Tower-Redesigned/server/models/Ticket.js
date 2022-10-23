import mongoose from "mongoose";

const Schema = mongoose.Schema

export const TicketSchema = new Schema(
  {
    eventId: {type: Object, required: true},
    creatorId: {type: Object, required: true},
    payment: {type: Boolean, required: true, default: false}
  },
  { timestamps: true, toJSON: {virtuals: true}}
)
TicketSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})