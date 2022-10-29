import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

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
  }

  async changeAttendance(eventId, attending) {
    if (attending) {
      await api.delete(`ticket/${eventId}`)
      await this._eraseFromAppState(eventId)
    } else {
      const res = await api.post(`ticket/${eventId}`)
      const ticket = await this._convertTicketsToModels(res.data)
      AppState.tickets.unshift(ticket)
      Pop.toast('Attending!')
    }
  }


  async _findInAppState(ticketId) {
    let found = {}
    for (const ticket of AppState.tickets) {
      if (ticket.id === ticketId) {
        found = ticket
      }
    }
    return found
  }

  async _eraseFromAppState(ticketId) {
    AppState.tickets = AppState.tickets.forEach(ticket => {
      if (ticket.id !== ticketId) {
        return ticket
      }
    })
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
      returned = new Ticket({ticket})
    }
    return returned
  }
}

export const ticketService = new TicketService()