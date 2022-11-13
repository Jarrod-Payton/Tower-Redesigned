import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { Ticket } from "../models/Ticket"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"
import { eventService } from "./EventService"

class TicketService {

  async getEventsTickets(eventId) {
    const res = await api.get(`ticket/${eventId}`)
    const tickets = await this._convertTicketsToModels(res.data, true)
    AppState.tickets = tickets
  }

  async getMyTickets() {
    const res = await api.get(`ticket`)
    const tickets = await this._convertTicketsToModels(res.data, true)
    AppState.tickets = tickets
    tickets.forEach(ticket => {
      AppState.events.push(new Event(ticket.event))
    })
  }

  async changeAttendance(eventId, attending) {
    if (attending) {
      const existingTicket = await this._findInAppState(eventId, AppState.account.id)
      await api.delete(`ticket/${existingTicket.id}`)
      AppState.tickets = AppState.tickets.filter(ticket => ticket.attendeeId !== AppState.account.id)
      Pop.toast('No Longer Attending This Event!')
    } else {
      const res = await api.post(`ticket/${eventId}`)
      const ticket = await this._convertTicketsToModels(res.data)
      AppState.tickets.push(ticket)
      Pop.toast('Attending!')
    }
  }


  async _findInAppState(eventId, accountId) {
    let found = {}
    for (const ticket of AppState.tickets) {
      if ((ticket.eventId == eventId) && (ticket.attendeeId == accountId)) {
        found = ticket
      }
    }
    return found
  }

  async _convertTicketsToModels(ticket, isArray = false) {
    let returned = {}
    if(isArray) {
      returned = []
      for (const _ticket of ticket) {
        const newTicket = new Ticket({..._ticket})
        returned.push(newTicket)
      }
    } else {
      returned = new Ticket({...ticket})
    }
    return returned
  }
}

export const ticketService = new TicketService()