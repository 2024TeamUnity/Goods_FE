import { getToken } from 'firebase/messaging';
import { messaging } from './initFirebase';

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      return token;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
