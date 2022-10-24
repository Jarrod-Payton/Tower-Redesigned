import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketService } from "../services/TicketService";
import BaseController from "../utils/BaseController";

export class TicketController extends BaseController {
  constructor() {
    super('ticket')
    this.router
      .get('/:eventId', this.getTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getMyTickets)
      .post('/:eventId', this.attendEvent)
      .delete('/:ticketId', this.deleteTicket)
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const tickets = await ticketService.getTicketsByEventId(eventId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getMyTickets(req, res, next) {
    try {
      const userInfo = req.userInfo
      const tickets = await ticketService.getMyTickets(userInfo)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async attendEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userInfo = req.userInfo
      const newTicket = await ticketService.attendEvent(eventId, userInfo)
      res.send(newTicket)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const ticketId = req.params.ticketId
      const userInfo = req.userInfo
      await ticketService.deleteTicket(ticketId, userInfo)
      res.send('Success')
    } catch (error) {
      next(error)
    }
  }
}