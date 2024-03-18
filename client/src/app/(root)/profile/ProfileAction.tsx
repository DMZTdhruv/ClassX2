import { Api } from '@/Constants'

export const getUserProfile = async (cookie: string) => {
  const userProfileApi = `${Api}/users/get-user-profile`
  try {
    const response = await fetch(userProfileApi, {
      method: 'GET',
      headers: {
        Cookies: `classX_user_token=${cookie}`,
      },
    })

    const data = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }

    return data.data
  } catch (err: any) {
    console.log(err.message)
  }
}
