import { AppState } from "../AppState"
import { Event } from "../models/Event";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { api } from "./AxiosService"

class EventService {

  async getAllEvents() {
    const res = await api.get(`event`)
    const newEvents = await this._convertEventsToModels(res.data, true)
    AppState.events = newEvents
  }

  async getEventsHostedById(userId) {
    const res = await api.get(`event/host/${userId}`)
    const newEvents = await this._convertEventsToModels(res.data, true)
    AppState.events = newEvents
  }

  async getEventById(id) {
      const res = await api.get(`event/${id}`)
      const event = await this._convertEventsToModels(res.data)
      AppState.openedEvent = event
  }

  async createEvent(event) {
    const res = await api.post(`event`, event)
    const newEvent = await this._convertEventsToModels(res.data)
    AppState.events.push(newEvent)
    Pop.toast('Success')
  }

  async editEvent(id, event) {
    const res = await api.put(`event/${id}`, event)
    const editedEvent = await this._convertEventsToModels(res.data)
    AppState.openedEvent = editedEvent
    Pop.toast('Success')
  }

  async cancelEvent(id) {
    await api.delete(`event/${id}`)
    let found = await this._findInAppStateArray(id)
    found.isCanceled = true
    await this._updateAppStateArray(id, found)
    AppState.openedEvent = found
    Pop.toast('Successfully canceled!')
  }

  async _findInAppStateArray(eventId) {
    let found = null
    for (const event of AppState.events) {
      if (event.id === eventId) {
        found = event
      }
    }
    return found
  }

  async _updateAppStateArray(eventId, updatedEvent) {
    AppState.events = await AppState.events.forEach(event => {
      if (event.id === eventId) {
        return updatedEvent
      } else {
        return event
      }
    })
  }

  async _convertEventsToModels(event, isArray = false) {
    let returned = {}
    if (isArray) {
      returned = []
      for (const _event of event) {
        const newEvent = new Event({..._event})
        returned.push(newEvent)
      }
    } else {
      returned = new Event({...event})
    }
    return returned
  }

}

export const eventService = new EventService()