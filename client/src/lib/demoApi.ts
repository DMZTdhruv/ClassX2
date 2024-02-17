interface User {
  name: string
  username: string
  _id: string
}

interface Comment {
  id: string
  postId: string
  commentText: string
  postedBy: User
  likes: string[]
  commentReplies: string[]
}

const demoApi = [
  {
    id: "1",
    postId: '1',
    commentText:
      'This is a great post! This is a great post! This is a great post! This is a great post! This is a great post!',
    postedBy: { name: 'John Doe', username: 'john_doe', _id: 'user1' },
    likes: ['user2', 'user3'],
    commentReplies: ['reply1', 'reply2'],
  },
  {
    id: "2",
    postId: '1',
    commentText: 'I agree with you!',
    postedBy: { name: 'Jane Smith', username: 'jane_smith', _id: 'user2' },
    likes: ['user1'],
    commentReplies: [],
  },
  {
    id: "3",
    postId: '1',
    commentText: 'Nice content!',
    postedBy: {
      name: 'Alice Johnson',
      username: 'alice_johnson',
      _id: 'user3',
    },
    likes: [],
    commentReplies: ['reply3'],
  },
]

export { demoApi }

export type { User, Comment }
