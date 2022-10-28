
export class Ticket {
  constructor(data) {
    this.id = data.id
    this.eventId = data.eventId
    this.attendeeId = data.attendeeId

    // Virtuals
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.attendee = data.attendee
    this.event = data.event
  }
}