export const sideBarData = [
  {
    id: 1,
    name: 'Home',
    icon: 'home.svg',
    filledIcon: 'home-fill.svg',
    routes: '/',
  },
  {
    id: 2,
    name: 'Explore',
    icon: 'explore.svg',
    filledIcon: 'explore-fill.svg',
    routes: '/explore',
  },
  {
    id: 3,
    name: 'Upload',
    icon: 'upload.svg',
    filledIcon: 'upload-fill.svg',
    routes: '/upload-post',
  },
  {
    id: 4,
    name: 'Message',
    icon: 'message.svg',
    filledIcon: 'message-fill.svg',
    routes: '/message',
  },
  {
    id: 5,
    name: 'Classroom',
    icon: 'classroom.svg',
    filledIcon: 'classroom-fill.svg',
    routes: '/classroom',
  },
]
export const BottomBarData = [
  {
    id: 1,
    name: 'Home',
    icon: 'home.svg',
    filledIcon: 'home-fill.svg',
    routes: '/',
  },
  {
    id: 2,
    name: 'Explore',
    icon: 'explore.svg',
    filledIcon: 'explore-fill.svg',
    routes: '/explore',
  },
  {
    id: 3,
    name: 'Upload',
    icon: 'upload.svg',
    filledIcon: 'upload-fill.svg',
    routes: '/upload-post',
  },
  {
    id: 5,
    name: 'Classroom',
    icon: 'classroom.svg',
    filledIcon: 'classroom-fill.svg',
    routes: '/classroom',
  },
]

interface IDeletePostDetails {
  deleteId: string
  userProfileId: string
  handleModal?: (data: boolean) => void
  className?: string
}

// types
interface IPost {
  _id: string
  title: string
  saved: string[]
  imageUrl: string
  caption: string
  location: string
  category: string
  serverRenderedPost: boolean
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  index: number
  likes: string[]
  comments: IComments[]
  createdAt: string
  handleDeletePostDetails: (data: IDeletePostDetails) => void
  handleDeleteModal: (data: boolean) => void
}

interface IPostMinimal {
  _id: string
  title: string
  imageUrl: string
  caption: string
  location: string
  category: string
  saved: string[]
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  likes: any[]
  comments: IComments[]
  createdAt: string
}

interface IComments {
  _id: string
  commentText: string
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  createdAt: string
  likes: string[]
  commentReplies: string[]
}

interface UpdateReplyCommentData {
  parentCommentId: string
  repliedUserId: string
}

interface Comment {
  replyUsername: string
  commentText: string
}

interface MessageContextProps {
  conversation: any
  setConversation: React.Dispatch<React.SetStateAction<any>>
  messages: any[]
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
}

interface AuthContext {
  userId: string
  userProfileId: string
  userProfileImage: string
}

interface IReplyMessage {
  repliedUser: string
  repliedUserMessage: string
}

export type {
  IReplyMessage,
  IComments,
  IPost,
  IPostMinimal,
  UpdateReplyCommentData,
  Comment,
  MessageContextProps,
  AuthContext,
}

export const Api = process.env.NEXT_PUBLIC_API
export const webUrl = process.env.NEXT_PUBLIC_WEBURL
