export default class CommentRepositoryInterface {
  async createNewComment(postId, commentText, userId) {
    throw new Error('Method now implemented')
  }
  async pushComment(postId, commentId) {
    throw new Error('Method now implemented')
  }
  async findCommentById(commentId) {
    throw new Error('Method now implemented')
  }
  async pushLike(commentId, userID){
    throw new Error('Method now implemented')
  }
}
