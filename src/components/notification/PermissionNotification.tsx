import { getToken } from 'firebase/messaging';
import { useEffect } from 'react';
import { messaging } from '../../util/initFirebase';
import { useSendTokenMutation } from '../../service/notification/useSendTokenMutation';

export default function PermissionNotification() {
  const mutate = useSendTokenMutation();

  useEffect(() => {
    const getPermissionNotification = async () => {
      try {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
          });

          if (token) {
            mutate(token);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPermissionNotification();
  }, [mutate]);

  return null;
}
