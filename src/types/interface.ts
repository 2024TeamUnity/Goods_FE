export type FormValueTypes = {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  phoneNumber: number;
  paymentPassword: number;
};

/* profile mock interface */
export interface IProfileData {
  member_id: number;
  nick_name: string;
  phone_number: string;
  profile_image: string;
  star: number;
  badge_List: string[];
}

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
}

export interface ISalesHistoryData {
  goods_name: string;
  price: number;
  goods_thumbnail: string;
  goods_status: string;
  uploaded_before: number;
  goods_id: number;
}
export interface IPurchaseHistoryData extends ISalesHistoryData {
  seller_name: string;
  member_id: number;
  traded_before: number;
}

export interface IRatingModal {
  onCloseModal: () => void;
  onComplete: () => void;
  id: number;
}

export interface IWishHistoryData {
  seller_name: string;
  goods_name: string;
  price: number;
  goods_thumbnail: string;
  goods_status: string;
  uploaded_before: number;
  address: string;
  goods_id: number;
}

export interface ICardListItemProps {
  id: number;
  img: string;
  name: string;
  uploaded_before: number;
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
  non_read: number;
  last_message: string;
  updated_at: string;
}

export interface IChatLog {
  message: string;
  sender: string;
  receiver: string;
  created_at: string;
}

export interface IChatHistoryData {
  room_id: number;
  goods_id: number;
  goods_seller: string;
  goods_name: string;
  goods_image: string;
  goods_price: number;
  chatLog: IChatLog[];
}
