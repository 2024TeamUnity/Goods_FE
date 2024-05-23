import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuth = localStorage.getItem('access_token');

  const protect = () => {
    // eslint-disable-next-line no-alert
    alert('로그인 후 이용 가능합니다.');
    return <Navigate to='/signin' />;
  };
  return isAuth ? <Outlet /> : protect();
}
