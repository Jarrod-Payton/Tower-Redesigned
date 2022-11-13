import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentService {
  async getAllComments(eventId) {
    const res = await api.get(`comment/${eventId}`)
    const newComments = await this._convertToModels(res.data, true)
    AppState.comments = newComments
  }

  async getMyComments() {
    const res = await api.get(`comment`)
    const newComments = await this._convertToModels(res.data, true)
    AppState.comments = newComments
  }

  async createComment(comment) {
    const res = await api.post(`comment/${AppState.openedEvent.id}`, comment)
    const newComment = await this._convertToModels(res.data)
    console.log(newComment)
    AppState.comments.push(newComment)
  }

  async editComment(commentId, comment) {
    const res = await api.put(`comment/${commentId}`, comment)
    const newComment = await this._convertToModels(res.data)
    await this.replaceComment(commentId, newComment)
  }

  async deleteComment(commentId) {
    await api.delete(`comment/${commentId}`)
    AppState.comments = AppState.comments.filter(comment => comment.id !== commentId)
    Pop.toast('Success')
  }

  async replaceComment(commentId, newComment) {
    let newAppState = []
    AppState.comments.forEach(comment => {
      if (comment.id === commentId) {
        newAppState.push(newComment)
      } else {
        newAppState.push(comment)
      }
    })
    AppState.comments = newAppState
  }

  async _convertToModels(comment, isArray = false) {
    let returned = {}
    if (isArray) {
      returned = []
      for (const _comment of comment) {
        const newComment = new Comment({..._comment})
        returned.push(newComment)
      }
    } else {
      returned = new Comment({...comment})
    }
    return returned
  }
}

export const commentService = new CommentService()