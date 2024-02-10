import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

interface UserDetails {
  userID: string;
  userProfileId: string | null;
}

interface UseCookieProviderResult {
  cookie: string;
  userID: string;
  userProfileId: string | null;
}

export default function useCookieProvider(): UseCookieProviderResult | null {
  const router = useRouter();
  const cookie = Cookies.get('classX_user_token') || '';

  if (!cookie) {
    useEffect(() => {
      router.push('/auth/sign-in');
    }, [cookie])
    return null;
  }

  try {
    const decodedCookie: UserDetails = jwtDecode(cookie);

    if (!decodedCookie.userID) {
      useEffect(() => {
        router.push('/auth/sign-up');
      }, [cookie])
      return null;
    }

    if (!decodedCookie.userProfileId) {
      useEffect(() => {
        router.push('/user/create-user-profile');
      }, [cookie])
      return null;
    }

    return {
      cookie,
      userID: decodedCookie.userID,
      userProfileId: decodedCookie.userProfileId,
    };
    
  } catch (error) {
    console.error('Error decoding token:', error);
    router.push('/auth/sign-in');
    return null;
  }
}
