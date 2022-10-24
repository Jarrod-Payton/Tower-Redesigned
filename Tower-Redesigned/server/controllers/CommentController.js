import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService";
import BaseController from "../utils/BaseController";

export class CommentController extends BaseController {
  constructor() {
    super('comment')
    this.router
      .get('/:eventId', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getMyComments)
      .post('/:eventId', this.createComment)
      .put('/:commentId', this.editComment)
      .delete('/:commentId', this.deleteComment)
  }

  async getEventComments (req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await commentService.getEventsComments(eventId)
      res.send(comments)
    } catch (error) {
      next (error)
    }
  }

  async getMyComments (req, res, next) {
    try {
      const userInfo = req.userInfo
      const comments = await commentService.getMyComments(userInfo)
      res.send(comments)
    } catch (error) {
      next (error)
    }
  }

  async createComment (req, res, next) {
    try {
      const eventId = req.params.eventId
      const userInfo = req.userInfo
      const comment = req.body
      const newComment = await commentService.createComment(eventId, userInfo, comment)
      res.send(newComment)
    } catch (error) {
      next (error)
    }
  }

  async editComment (req, res, next) {
    try {
      const commentId = req.params.commentId
      const userInfo = req.userInfo
      const comment = req.body
      const editedComment = await commentService.editComment(commentId, userInfo, comment)
      res.send(editedComment)
    } catch (error) {
      next (error)
    }
  }

  async deleteComment (req, res, next) {
    try {
      const commentId = req.params.commentId
      const userInfo = req.userInfo
      await commentService.deleteComment(commentId, userInfo)
      res.send('Success')
    } catch (error) {
      next (error)
    }
  }

}