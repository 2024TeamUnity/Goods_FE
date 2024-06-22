// import { http, HttpResponse } from 'msw';
// import { IWishHistoryData } from '../types/interface';
// import { positions } from './data/positionData';
// import { purchaseHistoryData } from './data/purchaseHistoryData';
// import { salesHistoryData } from './data/salesHistoryData';
// import { searchData } from './data/searchData';
// import { goodsData } from './data/goodsDetailData';
// import { chatRoomList } from './data/chatRoomListData';
// import { chatHistoryData } from './data/chatHistoryData';
// import { goodsListData } from './data/goodsListData';

// /* profile mock data */
// export const profileData = {
//   member_id: 1,
//   nick_name: '홍길동',
//   phone_number: '010-1234-5678',
//   profile_image: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
//   star: 3.5,
//   badge_list: ['판매왕'],
// };

// const tokenData = { accessToken: 'accessaccessaccess', refreshToken: 'refreshrefreshrefresh' };

// let wishHistoryData: IWishHistoryData[] = [
//   {
//     seller_name: '유니티',
//     goods_name: 'Z Flip5',
//     price: 1000000,
//     goods_thumbnail:
//       'https://images.samsung.com/kdp/goods/2023/08/03/98f31ad5-b606-4b93-8ed0-5a78af443e7d.png?$PD_GALLERY_L_PNG$',
//     goods_status: '예약중',
//     uploaded_before: 2,
//     address: 'loc',
//     goods_id: 4,
//   },
//   {
//     seller_name: '유니티',
//     goods_name: 'Galaxy Book',
//     price: 1000000,
//     goods_thumbnail:
//       'https://image-us.samsung.com/SamsungUS/home/computing/galaxy-books/052820/NT930QCGI_001_Front-Open_QLED_Blue-Gallery-1600x1200.jpg?$product-details-jpg$',
//     goods_status: '예약중',
//     uploaded_before: 2,
//     address: 'loc',
//     goods_id: 5,
//   },
//   {
//     seller_name: '유니티',
//     goods_name: 'Galaxy S24',
//     price: 1000000,
//     goods_thumbnail:
//       'https://media.wired.com/photos/65a6c0643d4e31ae36fab6d9/master/pass/Gear-Samsung-Galaxy-S24-Series-SOURCE-Julian-Chokkattu.jpg',
//     goods_status: '예약중',
//     uploaded_before: 2,
//     address: 'loc',
//     goods_id: 6,
//   },
// ];

// export const handlers = [
//   http.get('/member/profile', () => {
//     return HttpResponse.json(profileData);
//   }),
//   http.post('/auth/kakao', () => {
//     return HttpResponse.json(tokenData);
//   }),
//   http.post('/auth/email', () => HttpResponse.json(1234)),
//   http.put('/member/profile', async ({ request }) => {
//     const req = await request.formData();
//     return HttpResponse.formData(req);
//   }),
//   http.get(`/location`, () => HttpResponse.json(positions)),
//   http.put('/member/resign', async ({ request }) => {
//     const req = await request.json();
//     return HttpResponse.json(req);
//   }),
//   http.get('api/goods/purchase', () => HttpResponse.json(purchaseHistoryData)),
//   http.post(`/api/trade/goods/:goodsId/star`, async ({ request }) => {
//     const req = await request.json();
//     console.log(req);

//     return HttpResponse.json(req);
//   }),
//   http.get('/goods/:goodsId', ({ params }) => {
//     const { goodsId } = params;
//     const item = goodsData.filter((data) => data.goods_id === Number(goodsId));
//     return HttpResponse.json(item[0]);
//   }),
//   http.put('/goods/:goodsId/state', async ({ request }) => {
//     const req = await request.json();
//     console.log(req);
//     return HttpResponse.json(req);
//   }),
//   http.post('/goods/new', async ({ request }) => {
//     const req = await request.formData();
//     return HttpResponse.formData(req);
//   }),
//   http.get('/api/goods/sell-list/:sellerId', () => HttpResponse.json(salesHistoryData)),
//   http.get('/api/goods/likes', () => HttpResponse.json(wishHistoryData)),
//   http.delete('/api/goods/:goodsId/likes', ({ params }) => {
//     wishHistoryData = wishHistoryData.filter((item) => item.goods_id !== Number(params.goodsId));
//     return HttpResponse.json(wishHistoryData);
//   }),
//   http.post('/api/goods/likes', async ({ request }) => {
//     const req = await request.json();
//     wishHistoryData.push(req as IWishHistoryData);
//     return HttpResponse.json(wishHistoryData);
//   }),
//   http.put('/goods/:goodsId', async ({ request }) => {
//     const req = await request.formData();
//     return HttpResponse.formData(req);
//   }),
//   http.get('/api/goods/all', () => HttpResponse.json(searchData)), // 임시
//   http.post('/api/goods/search', async ({ request }) => {
//     // 검색
//     const { keyword } = (await request.json()) as { keyword: string };
//     const res = searchData.filter((item) =>
//       item.name.toLowerCase().includes(String(keyword).toLowerCase()),
//     );
//     return HttpResponse.json(res);
//   }),
//   http.delete('/goods/:goodsId', ({ params }) => {
//     const { goodsId } = params;
//     const newSalesHistoryData = salesHistoryData.filter(
//       (item) => item.goods_id !== Number(goodsId),
//     );
//     console.log(newSalesHistoryData);
//     return HttpResponse.json(newSalesHistoryData);
//   }),
//   http.put('/member/password', async ({ request }) => {
//     const req = await request.json();
//     return HttpResponse.json(req);
//   }),
//   http.put('/member/trade-password', async ({ request }) => {
//     const req = await request.json();
//     return HttpResponse.json(req);
//   }),
//   http.post('/api/member/signup', async ({ request }) => {
//     // 회원 가입
//     const req = await request.formData();
//     return HttpResponse.formData(req);
//   }),
//   http.post('/api/email/verification', async ({ request }) => {
//     // 이메일 인증 요청
//     const { email } = (await request.json()) as { email: string };
//     return HttpResponse.json(`send to ${email}`);
//   }),
//   http.post('/api/email/verification/check', async ({ request }) => {
//     const req = (await request.json()) as { email: string; code: number };

//     return HttpResponse.json(req.code === 123);
//   }),
//   http.get(`/api/chat/:roomId`, async () => {
//     // 채팅방 정보,대화 내역
//     // const { roomId } = params;

//     return HttpResponse.json(chatHistoryData);
//   }),
//   http.get('/member/:sellerId/profile', () => {
//     return HttpResponse.json(profileData);
//   }),
//   http.get('/api/chat/room', () => {
//     return HttpResponse.json(chatRoomList);
//   }),
//   http.get('api/goods', ({ request }) => {
//     const url = new URL(request.url);

//     const lat = url.searchParams.get('lat');
//     const lng = url.searchParams.get('lng');
//     if (!lat && !lng) {
//       return new HttpResponse(null, { status: 404 });
//     }

//     return HttpResponse.json(goodsListData);
//   }),
// ];
