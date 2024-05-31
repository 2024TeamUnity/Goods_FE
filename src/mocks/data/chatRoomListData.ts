import { IChatRoomListData } from '../../types/interface';

export const chatRoomList: IChatRoomListData[] = [
  {
    room_id: 1,
    goods_id: 1,
    goods_name: '감자 1kg',
    goods_image: 'https://health.chosun.com/site/data/img_dir/2023/06/27/2023062702164_0.jpg',
    goods_price: 20000,
    sender: '구매자',
    receiver: '판매자',
    not_read: 10,
    last_message: '삽니다',
    updated_at: '2024-05-14',
    partner: '판매자',
  },
  {
    room_id: 2,
    goods_id: 2,
    goods_name: '유니폼',
    goods_image:
      'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5849861552/B.jpg?157000000',
    goods_price: 100000,
    sender: '구매자',
    receiver: '판매자',
    not_read: 0,
    last_message: '삽니다',
    updated_at: '2024-05-14',
    partner: '판매자',
  },
  {
    room_id: 3,
    goods_id: 3,
    goods_name: '유니폼',
    goods_image:
      'https://m.thirdkit-mall.com/web/product/big/202303/f30c6ed12a4c69d6f9c0f6eadfb38024.jpg',
    goods_price: 100000,
    sender: '구매자',
    receiver: '판매자',
    not_read: 2,
    last_message: '삽니다',
    updated_at: '2024-05-14',
    partner: '판매자',
  },
  {
    room_id: 4,
    goods_id: 4,
    goods_name: 'Z Flip5',
    goods_image:
      'https://images.samsung.com/kdp/goods/2023/08/03/98f31ad5-b606-4b93-8ed0-5a78af443e7d.png?$PD_GALLERY_L_PNG$',
    goods_price: 1000000,
    sender: '구매자',
    receiver: '판매자',
    not_read: 8,
    last_message:
      'https://images.samsung.com/kdp/goods/2023/08/03/98f31ad5-b606-4b93-8ed0-5a78af443e7d.png?$PD_GALLERY_L_PNG$',
    updated_at: '2024-05-14',
    partner: '판매자',
  },
];
