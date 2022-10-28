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
    const res = await api.post(`comment`, comment)
    const newComment = await this._convertToModels(res.data)
    AppState.comments.push(newComment)
  }

  async editComment(commentId, comment) {
    const res = await api.put(`comment/${commentId}`, comment)
    const newComment = await this._convertToModels(res.data)
    await this._updateAppStateArray(commentId, newComment)
  }

  async deleteComment(commentId) {
    await api.delete(`comment/${commentId}`)
    await this._updateAppStateArray(commentId, null, true)
    Pop.toast('Success')
  }

  async _updateAppStateArray(commentId, updatedComment, erase = false) {
    AppState.comments = await AppState.comments.forEach(comment => {
      if (comment.id === commentId) {
        if (!erase) {
          return updatedComment
        }
      } else {
        return comment
      }
    })
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