import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class CommentService {

  async getEventsComments (eventId) {
    const res = await dbContext.Comments.find({eventId: eventId}).populate({path: 'creator'}).populate({path: 'event'})
    return res
  }

  async getMyComments (userInfo) {
    const res = await dbContext.Comments.find({creatorId: userInfo.id}).populate({path: 'creator'}).populate({path: 'event'})
    return res
  }

  async createComment (eventId, userInfo, comment) {
    const event = await dbContext.Events.findById(eventId)
    if (!event) {
      throw new BadRequest('No Event Found')
    }
    comment.creatorId = userInfo.id
    comment.eventId = eventId
    const newComment = await dbContext.Comments.create(comment)
    const populatedComment = await dbContext.Comments.findById(newComment.id).populate({path: 'creator'}).populate({path: 'event'})
    return populatedComment
  }

  async editComment (commentId, userInfo, comment) {
    const existingComment = await dbContext.Comments.findById(commentId)
    if (!existingComment) {
      throw new BadRequest('No Comment Exists')
    }
    if (existingComment.creatorId !== userInfo.id) {
      throw new Forbidden(`You didn't post this comment`)
    }
    existingComment.body = comment.body
    await dbContext.Comments.findByIdAndUpdate(commentId, existingComment)
    const newComment = await dbContext.Comments.findById(commentId).populate({path: 'creator'}).populate({path: 'event'})
    return newComment
  }

  async deleteComment (commentId, userInfo) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest('No Comment Found?')
    }
    if (comment.creatorId !== userInfo.id) {
      throw new Forbidden('Not Your Comment') 
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
  }

}

export const commentService = new CommentService()