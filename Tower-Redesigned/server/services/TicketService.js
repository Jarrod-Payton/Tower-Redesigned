import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TicketService {

  async getTicketsByEventId(eventId) {
    const res = await dbContext.Ticket.find({eventId: eventId}).populate({path: 'attendee'}).populate({path: 'event', populate: 'creator'})
    return res
  }

  async getTicketsByUserId(userId) {
    const res = await dbContext.Ticket.find({attendeeId: userId}).populate({path: 'attendee'}).populate({path: 'event', populate: 'creator'})
    return res
  }

  async getMyTickets(userInfo) {
    const res = await dbContext.Ticket.find({attendeeId: userInfo.id}).populate({path: 'attendee'}).populate({path: 'event', populate: 'creator'})
    return res
  }

  async attendEvent(eventId, userInfo) {
    const existingTicket = await dbContext.Ticket.findOne({eventId: eventId, attendeeId: userInfo.id})
    if (existingTicket) {
      throw new Forbidden('You are already attending this event?')
    }
    const ticket = {
      attendeeId: userInfo.id,
      eventId: eventId
    }
    const newTicket = await dbContext.Ticket.create(ticket)
    const foundNew = await dbContext.Ticket.findById(newTicket._id).populate({path: 'attendee'}).populate({path: 'event', populate: 'creator'})
    return foundNew
  }

  async deleteTicket(ticketId, userInfo) {
    const ticket = await dbContext.Ticket.findById(ticketId)
    if (!ticket) {
      throw new BadRequest('No Ticket Found')
    }
    if (ticket.attendeeId !== userInfo.id) {
      throw new Forbidden(`This isn't your ticket`)
    }
    await dbContext.Ticket.findByIdAndDelete(ticket.id)
  }

}

export const ticketService = new TicketService()