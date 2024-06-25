'use client';

import useFCMtoken from '@/hooks/firebase/useFCMtoken';
import firebaseApp from '@/firebase/firebase';
import { getMessaging, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';

const FcmTokenComponent = () => {
  const { token, notificationPermissionStatus } = useFCMtoken();
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, payload =>
          console.log('Foreground push notification received:', payload)
        );
        return () => {
          unsubscribe();
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null;
};

export default FcmTokenComponent;
