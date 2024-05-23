import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isAuthState } from './store/atom';

export default function App() {
  const setIsAuth = useSetRecoilState(isAuthState);
  useEffect(() => {
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
