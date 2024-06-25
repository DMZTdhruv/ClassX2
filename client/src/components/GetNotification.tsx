'use client';

import React, { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import fireBaseApp from '../firebase/firebase';

const GetNotification = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messaging = getMessaging();
  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Permission was granted for notification');
      try {
        const retrievedToken = await getToken(messaging, {
          vapidKey:
            'BDkaySs9ftDej8Sq4jIzcYE-tWbEX_sdQglOaXjpmFmN4p9Ni9VAYGmdPmT6FEZi0DpTT6vtbUN1mpP4N2zlXTg',
        });
        setToken(retrievedToken);
      } catch (err) {
        console.error('Error fetching FCM token:', err);
      }
    } else {
      console.log('Permission denied for notification');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return <></>;
};

export default GetNotification;
