import mongoose from "mongoose";

const Schema = mongoose.Schema

export const TicketSchema = new Schema(
  {
    eventId: {type: Object, required: true},
    attendeeId: {type: Object, required: true},
  },
  { timestamps: true, toJSON: {virtuals: true}}
)
TicketSchema.virtual('attendee', {
  localField: 'attendeeId',
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