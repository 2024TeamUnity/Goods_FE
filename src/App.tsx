import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isAuthState } from './store/atom';
import { onMessage } from 'firebase/messaging';
import { messaging } from './util/initFirebase';
import icon from './assets/logo.ico';

export default function App() {
  const setIsAuth = useSetRecoilState(isAuthState);

  useEffect(() => {
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

    if (localStorage.getItem('access_token')) {
      setIsAuth(true);
      return;
    }
    setIsAuth(false);
  }, [setIsAuth]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
