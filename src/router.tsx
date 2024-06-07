import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import ProfileUpdate from './routes/ProfileUpdate';
import KakaoRedirection from './components/socialLogin/KakaoRedirection';
import PostCreate from './routes/PostCreate';
import PostEdit from './routes/PostEdit';
import Shop from './routes/Shop';
import PostDetail from './routes/PostDetail';
import PointCharge from './routes/PointCharge';
import Transfer from './routes/Transfer';
import PurchaseHistory from './routes/PurchaseHistory';
import MyPage from './routes/MyPage';
import Payment from './routes/Payment';
import WishHistory from './routes/WishHistory';
import NotFoundPage from './components/common/NotFoundPage';
import ChatRoomList from './routes/ChatRoomList';
import ChatRoom from './routes/ChatRoom';
import ProtectedRoute from './components/common/ProtectedRoute';
import PayRedirect from './routes/PayRedirect';
import SalesHistoryContainer from './components/common/SalesHistoryContainer';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/posts/:id' element={<PostDetail />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/posts/new' element={<PostCreate />} />
          <Route path='/posts/edit/:id' element={<PostEdit />} />
          <Route path='/purchase-history' element={<PurchaseHistory />} />
          <Route path='/sales-history' element={<SalesHistoryContainer />} />
          <Route path='/wish-history' element={<WishHistory />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/update' element={<ProfileUpdate />} />
        <Route path='/mypage/charge' element={<PointCharge />} />
        <Route path='/mypage/transfer' element={<Transfer />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/room/:roomId' element={<ChatRoom />} />
        <Route path='/roomList' element={<ChatRoomList />} />
        <Route path='/payment/redirect' element={<PayRedirect />} />
      </Route>
      <Route path='/oauth/kakao' element={<KakaoRedirection />} />
      <Route path='/shop/:id' element={<Shop />} />
      <Route path='/posts/undefined' element={<NotFoundPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
