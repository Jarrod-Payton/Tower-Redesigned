import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventService {

  async getAllEventsYetToHappen(query = {}) {

    if (Object.keys(query).length === 0) {
      query = {isCanceled: false}
    }
    const res = await dbContext.Events.find(query).populate({path: 'creator'})
    return res
  }

  async getEventById(id) {
    const res = await dbContext.Events.findById(id).populate({path: 'creator'})
    if (!res) {
      throw new BadRequest('No Event Found')
    }
    return res
  }

  async getAllEventsHostedByUserId(id) {
    const user = await dbContext.Account.findById(id)
    const res = await dbContext.Events.find({creatorId: id}).populate({path: 'creator'})
    if (!user && !res) {
      throw new BadRequest('No User Found')
    }
    return res
  }

  async createEvent(userInfo, event) {
    if (event.startDate < Date.now()) {
      throw new BadRequest('Event Scheduled in the past')
    }
    event.creatorId = userInfo.id
    event.isCanceled = false
    const newEvent = await (await dbContext.Events.create(event)).populate({path: 'creator'})
    return newEvent
  }

  async editEvent(userInfo, eventId, newEvent) {
    let oldEvent = await dbContext.Events.findById(eventId)
    if (!oldEvent) {
      throw new BadRequest('No Previous Event to Edit')
    }
    if (oldEvent.isCanceled) {
      throw new Forbidden(`You Can't Edit a cancelled event`)
    }
    if (oldEvent.creatorId !== userInfo.id) {
      throw new Forbidden('Not your event')
    }
    // if (newEvent.startDate?.getMilliseconds() < Date.now()) {
    //   throw new BadRequest('Event Scheduled in the past')
    // }
    oldEvent.name = newEvent.name || oldEvent.description
    oldEvent.description = newEvent.description || oldEvent.description
    oldEvent.startDate = newEvent.startDate || oldEvent.startDate
    oldEvent.coverImg = newEvent.coverImg || oldEvent.coverImg
    oldEvent.location = newEvent.location || oldEvent.location
    oldEvent.capacity = newEvent.capacity || oldEvent.capacity
    oldEvent.type = newEvent.type || oldEvent.type

    await dbContext.Events.findByIdAndUpdate(eventId, oldEvent)
    const updatedEvent = await dbContext.Events.findById(eventId).populate({path: 'creator'})
    return updatedEvent
  }

  async cancelEvent(userInfo, eventId) {
    let event = await dbContext.Events.findById(eventId)
    if (!event) {
      throw new BadRequest('No Event Exists')
    }
    if (event.creatorId !== userInfo.id) {
      throw new Forbidden(`You aren't the host`)
    }
    if (event.startDate.getMilliseconds() < Date.now()) {
      throw new Forbidden(`Event Already Happened`)
    }
    event.isCanceled = true
    await dbContext.Events.findByIdAndUpdate(eventId, event)
    const cancelledEvent = await dbContext.Events.findById(eventId).populate({path: 'creator'})
    return cancelledEvent
  }

}

export const eventService = new EventService()