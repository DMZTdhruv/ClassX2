interface User {
  name: string
  username: string
  _id: string
}

interface ReplyComment {
  id: string
  postId: string
  commentText: string
  postedBy: User
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

const demoApi: Comment[] = [
  {
    id: '1',
    postId: '1',
    commentText:
      'This is a great post! This is a great post! This is a great post! This is a great post! This is a great post!',
    postedBy: { name: 'John Doe', username: 'john_doe', _id: 'user1' },
    likes: ['user2', 'user3'],
    commentReplies: [
      {
        id: '1',
        postId: '1',
        commentText:
          'This is a great post! This is a great post! This is a great post! This is a great post! This is a great post!',
        postedBy: { name: 'John Doe', username: 'john_doe', _id: 'user1' },
        likes: ['user2', 'user3'],
      },
      {
        id: '2',
        postId: '1',
        commentText: 'I agree with you!',
        postedBy: { name: 'Jane Smith', username: 'jane_smith', _id: 'user2' },
        likes: ['user1'],
      },
      {
        id: '3',
        postId: '1',
        commentText: 'Nice content!',
        postedBy: {
          name: 'Alice Johnson',
          username: 'alice_johnson',
          _id: 'user3',
        },
        likes: [],
      },
    ],
  },
  {
    id: '2',
    postId: '1',
    commentText: 'I agree with you!',
    postedBy: { name: 'Jane Smith', username: 'jane_smith', _id: 'user2' },
    likes: ['user1'],
    commentReplies: [
      {
        id: '1',
        postId: '1',
        commentText:
          'This is a great post! This is a great post! This is a great post! This is a great post! This is a great post!',
        postedBy: { name: 'John Doe', username: 'john_doe', _id: 'user1' },
        likes: ['user2', 'user3'],
      },
      {
        id: '2',
        postId: '1',
        commentText: 'I agree with you!',
        postedBy: { name: 'Jane Smith', username: 'jane_smith', _id: 'user2' },
        likes: ['user1'],
      },
      {
        id: '3',
        postId: '1',
        commentText: 'Nice content!',
        postedBy: {
          name: 'Alice Johnson',
          username: 'alice_johnson',
          _id: 'user3',
        },
        likes: [],
      },
    ],
  },
  {
    id: '3',
    postId: '1',
    commentText: 'Nice content!',
    postedBy: {
      name: 'Alice Johnson',
      username: 'alice_johnson',
      _id: 'user3',
    },
    likes: [],
    commentReplies: [
      {
        id: '1',
        postId: '1',
        commentText:
          'This is a great post! This is a great post! This is a great post! This is a great post! This is a great post!',
        postedBy: { name: 'John Doe', username: 'john_doe', _id: 'user1' },
        likes: ['user2', 'user3'],
      },
      {
        id: '2',
        postId: '1',
        commentText: 'I agree with you!',
        postedBy: { name: 'Jane Smith', username: 'jane_smith', _id: 'user2' },
        likes: ['user1'],
      },
      {
        id: '3',
        postId: '1',
        commentText: 'Nice content!',
        postedBy: {
          name: 'Alice Johnson',
          username: 'alice_johnson',
          _id: 'user3',
        },
        likes: [],
      },
    ],
  },
]

export { demoApi }

export type { User, Comment, ReplyComment }
