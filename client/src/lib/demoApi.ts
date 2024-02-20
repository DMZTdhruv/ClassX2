interface User {
  name: string
  username: string
  userProfileImage: string
  _id: string
}

interface ReplyComment {
  _id: string
  postId: string
  commentText: string
  postedBy: User
  createdAt: string,
  likes: string[]
}

interface Comment {
  id: string
  postId: string
  commentText: string
  postedBy: User
  likes: string[]
  commentReplies: ReplyComment[]
}

export type { User, Comment, ReplyComment }
