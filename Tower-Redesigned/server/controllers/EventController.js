import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventService } from "../services/EventService";
import BaseController from "../utils/BaseController";

export class EventController extends BaseController {
  constructor() {
    super('event')
    this.router
      .get('', this.getAllEventsYetToHappen)
      .get('/:id', this.getEventById)
      .get('/host/:hostId', this.getAllEventsHostedById)
      // .get('/radius/:radiusRange/:coordinates', this.getEventsInARadius)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
  }

  async getAllEventsYetToHappen(req, res, next) {
    try {
      const query = req.query
      const events = await eventService.getAllEventsYetToHappen(query)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const eventId = req.params.id
      const event = await (await eventService.getEventById(eventId))
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAllEventsHostedById(req, res, next) {
    try {
      const hostId = req.params.hostId
      const events = await eventService.getAllEventsHostedByUserId(hostId)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      const userInfo = req.userInfo
      const body = req.body
      const newEvent = await eventService.createEvent(userInfo, body)
      res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const userInfo = req.userInfo
      const body = req.body
      const eventId = req.params.id
      const updatedEvent = await eventService.editEvent(userInfo, eventId, body)
      res.send(updatedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const userInfo = req.userInfo
      const eventId = req.params.id
      const cancelledEvent = await eventService.cancelEvent(userInfo, eventId)
      res.send(cancelledEvent)
    } catch (error) {
      next(error)
    }
  }

}