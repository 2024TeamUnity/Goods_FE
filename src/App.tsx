import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isAuthState } from './store/atom';
import { requestPermission } from './util/requestPermission';
import { messaging } from './util/initFirebase';
import icon from './assets/logo.ico';
import { useSendTokenMutation } from './service/notification/useSendTokenMutation';
import { onMessage } from 'firebase/messaging';

export default function App() {
  const setIsAuth = useSetRecoilState(isAuthState);
  const mutate = useSendTokenMutation();

  useEffect(() => {
    const sendNotificationToken = async () => {
      const token = await requestPermission();
      if (token) {
        mutate(token);
      }

      onMessage(messaging, (payload) => {
        const notificationTitle = payload.notification!.title!;
        const notificationOptions = {
          body: payload.notification!.body,
          icon,
        };

        if (Notification.permission === 'granted') {
          // eslint-disable-next-line no-new
          new Notification(notificationTitle, notificationOptions);
        }
      });
    };
    sendNotificationToken();

    if (localStorage.getItem('access_token')) {
      setIsAuth(true);
      return;
    }
    setIsAuth(false);
  }, [setIsAuth, mutate]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
