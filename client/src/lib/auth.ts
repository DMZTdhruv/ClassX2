import { jwtDecode } from 'jwt-decode'

interface jwtInterface {
  userID: string
}

export const verifyAuth = async (token: string ) => {
  const api = process.env.NEXT_PUBLIC_API;
  console.log("Api: " + api);
  const {userID}:jwtInterface = jwtDecode(token || '');
  console.log("UserId: " + userID)
  try {
    const checkUserExists = `${api}/auth/check-user?userID=${userID}`
    const response = await fetch(checkUserExists, {
      method: 'GET'
    })
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    console.log(error)
  }
}
