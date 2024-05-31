export type FormValueTypes = {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  phoneNumber: number;
  paymentPassword: number;
};

/* profile update mock interface */
export interface IProfileUpdate {
  nick_name: string;
  phone_number: string;
  profile_image_url?: string;
  profile_image_file?: File;
}

export interface IMapLocation {
  lat: number;
  lng: number;
}

export interface IMyLocation {
  center: IMapLocation;
  errMsg: null | string;
  isLoading: boolean;
}

export interface IPointCalc {
  type: string;
  bank?: string;
  account?: number;
  password?: number;
  price?: number;
  goodsId?: number;
  sellerId?: number;
}

export interface ISalesHistoryData {
  goods_name: string;
  price: number;
  goods_thumbnail: string;
  goods_status: string;
  uploaded_before?: number;
  goods_id: number;
  traded_before?: number;
}
export interface IPurchaseHistoryData extends ISalesHistoryData {
  seller_name: string;
  member_id: number;
}

export interface IRatingModal {
  onCloseModal: () => void;
  onComplete: () => void;
  id: number;
}

export interface IWishHistoryData extends ISalesHistoryData {
  seller_name: string;
  address: string;
}

export interface ICardListItemProps {
  id: number;
  img: string;
  name: string;
  uploaded_before?: number;
  traded_before?: number;
  status: string;
  price: number;
}

export interface IPostCreate {
  goods_name: string;
  price: number;
  description: string;
  goods_image_files: File[];
  lat: number;
  lng: number;
  address: string;
  user_defined_location: string;
}

export interface IGoodsData {
  seller_id: number;
  seller_profile_image: string;
  seller_name: string;
  badge_list: string[];
  goods_name: string;
  price: number;
  description: string;
  goods_images: string[];
  status: string;
  liked: boolean;
  uploaded_before: number;
  lat: number;
  lng: number;
  address: string;
  goods_id?: number;
}

export interface IEditPostData extends IPostCreate {
  goods_id: string;
  images_to_delete: string[];
  curImages: string[];
}

export interface IChatRoomListData {
  room_id: number;
  goods_id: number;
  goods_name: string;
  goods_image: string;
  goods_price: number;
  sender: string;
  receiver: string;
  not_read: number;
  last_message: string;
  updated_at: string;
  partner: string;
}

export interface IChatLog {
  message: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
}

export interface IChatHistoryData {
  room_id: number;
  goods_id: number;
  goods_seller: string;
  goods_name: string;
  goods_image: string;
  goods_price: number;
  chat_logs: IChatLog[];
  member_id: number;
  partner: string;
  member_type: string;
}

export interface IMyInfo {
  member_id: number;
  nick_name: string;
  phone_number: string;
  profile_image: string | null;
  trade_password_exists: boolean;
  star: number;
  badge_list: string[];
}

export interface IChargePoint {
  price: string;
  payment_id: string;
}

export interface IWithdrawPoint {
  price: string;
}

export interface ITradePoint {
  seller_id: number;
  goods_id: number;
  price: string;
  trade_password: string;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface IPageResponse {
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ISalesHistoryResponse extends IPageResponse {
  content: ISalesHistoryData[];
}

export interface IPurchaseHistoryResponse extends IPageResponse {
  content: IPurchaseHistoryData[];
}

export interface IWishHistoryResponse extends IPageResponse {
  content: IWishHistoryData[];
}

export interface IGoodsList {
  goods_id: number;
  seller_id: string;
  goods_name: string;
  price: string;
  trade_spot: string;
  thumbnail_url: string;
  lat: number;
  lng: number;
  uploaded_before: number;
}
