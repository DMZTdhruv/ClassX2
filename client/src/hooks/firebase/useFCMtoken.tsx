import firebaseApp from '@/firebase/firebase';
import { getMessaging, getToken } from 'firebase/messaging';
import React, { useEffect, useState } from 'react';

const useFCMtoken = () => {
  const [token, setToken] = useState<undefined | string>(undefined);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<
    undefined | string
  >('');

  const retrieveToken = async () => {
    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        const messaging = getMessaging(firebaseApp);
        const permission = await Notification.requestPermission();
        setNotificationPermissionStatus(permission);
        if (permission === 'granted') {
          const currentToken = await getToken(messaging, {
            vapidKey:
              'BDkaySs9ftDej8Sq4jIzcYE-tWbEX_sdQglOaXjpmFmN4p9Ni9VAYGmdPmT6FEZi0DpTT6vtbUN1mpP4N2zlXTg',
          });

          if (currentToken) {
            setToken(currentToken);
          } else {
            console.log(
              'No registration token available. Request permission to generate one.'
            );
          }
        }
      }
    } catch (error: any) {
      console.error(`Error retrieving token: ${error.message}`);
    }
  };

  useEffect(() => {
    retrieveToken();
  }, []);

  return { token, notificationPermissionStatus };
};

export default useFCMtoken;
