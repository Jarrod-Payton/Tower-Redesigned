import { AppState } from "../AppState"
import { api } from "../services/AxiosService"
import { logger } from "../utils/Logger"

export class Event {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creatorId = data.creatorId
    // Virtuals
    this.creator = data.creator
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  // This isn't very clean code to have it's delete function in the model but just wanted to give it a try
  async cancelEvent() {
    try {
      if (this.id) {
        await api.delete(`event/${this.id}`)
        this.isCanceled = true
      } else {
        throw new Error('No Id on this event!')
      }
    } catch (error) {
      logger.error(error)
    }
  }

  // I was planning on creating a built in storing system that allows you to both the create and edit functionality from the model itself but I realize that would be terribly unclean code
  // async storeEdits() {
  //   try {
  //     if (this.id) {
  //     await api.put(`event/${id}`, this)
      
  //     } else {
      
  //     }
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }
}