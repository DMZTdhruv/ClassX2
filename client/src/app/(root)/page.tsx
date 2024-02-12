import Post from '@/components/cards/Post'
import { cookies } from 'next/headers'
// import { Skeleton } from '@/components/ui/skeleton'

interface IComments {
  _id: string
  commentText: string
  postedBy: {
    _id: string
    username: string
  }
}

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
  likes: any[]
  comments: IComments[]
  createdAt: string
}

export default async function Home() {
  const cookie = cookies()
  // const cookie = useCookieProvider()
  // const [posts, setPosts] = useState<IPost[]>([])
  // const [errorMessage, setErrorMessage] = useState<string>('')
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  // const [isPostLiked, setIsPostLiked] = useState<boolean>(false)

  const token = cookie.get('classX_user_token')
  const api = process.env.NEXT_PUBLIC_API

  const getPosts = async () => {
    try {
      const response = await fetch(
        `${api}/post/get-post?page=${1}&limit=${10}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      )

      if (!response.ok) {
        console.log('Failed to fetch data')
      }

      const { data } = await response.json()
      return data
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const posts: IPost[] = await getPosts()

  // useEffect(() => {
  //   const api = process.env.NEXT_PUBLIC_API
  //   const getPosts = async () => {
  //     setIsLoading(true)
  //     try {
  //       const response = await fetch(
  //         `${api}/post/get-post?page=${1}&limit=${10}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${cookie?.cookie}`,
  //           },
  //         }
  //       )

  //       if (!response.ok) {
  //         const result = await response.json()
  //         try {
  //           if (result.message) {
  //             setErrorMessage(result.message)
  //           } else {
  //             setErrorMessage('There was an error in fetching posts')
  //           }
  //         } catch (err: any) {
  //           console.log(err.message)
  //         }
  //       }

  //       const { data } = await response.json()
  //       setPosts(data)
  //       console.log(data)
  //     } catch (err: any) {
  //       console.log(err.message)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   getPosts()
  // }, [])

  // if (isLoading) {
  //   return (
  //     <div className='flex  flex-col space-y-3 px-[16x] mt-[40px] gap-5  items-center'>
  //       <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
  //       <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
  //     </div>
  //   )
  // }

  return (
    <section
      className={`w-full mt-[40px]  px-[16px] flex flex-col gap-5 items-center`}
    >
      {posts?.map(post => {
        return (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            imageUrl={post.imageUrl}
            caption={post.caption}
            location={post.location}
            category={post.category}
            postedBy={post.postedBy}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        )
      })}
    </section>
  )
}
