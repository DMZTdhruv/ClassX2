export const sideBarData = [
  {
    id: 1,
    name: "Home",
    icon: "house.svg",
    routes: "/"
  },
  {
    id: 2,
    name: "Explore",
    icon: "explore.svg",
    routes: "/explore"
  },
  {
    id: 3,
    name: "Upload",
    icon: "create.svg",
    routes: "/upload-post"
  },
  {
    id: 4,
    name: "Message",
    icon: "message.svg",
    routes: "/message",
  },
  {
    id: 5,
    name: "Classroom",
    icon: "classroom.svg",
    routes: "/classroom"
  },
  {
    id: 6,
    name: "Profile",
    icon: "profile.svg",
    routes: "/profile"
  },
  
]
export const BottomBarData = [
  {
    id: 1,
    icon: "house.svg",
    routes: "/"
  },
  {
    id: 2,
    icon: "explore.svg",
    routes: "/explore"
  },
  {
    id: 3,
    icon: "create.svg",
    routes: "/upload-post"
  },
  {
    id: 5,
    icon: "classroom.svg",
    routes: "/classroom"
  },
  {
    id: 6,
    icon: "profile.svg",
    routes: "/profile"
  },
  
]


// types
interface IPost {
  _id: string
  title: string

  imageUrl: string
  caption: string
  location: string
  category: string
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  likes: string[]
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

export type { IComments, IPost, UpdateReplyCommentData, Comment }


export const Api = process.env.NEXT_PUBLIC_API;
export const webUrl = process.env.NEXT_PUBLIC_WEBURL;