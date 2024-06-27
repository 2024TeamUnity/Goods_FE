import Carousel from '../components/carousel/Carousel';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useReadPostQuery } from '../service/post/useReadPostQuery';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUpdateStateMutation } from '../service/post/useUpdateStateMutation';
import AddWishListButton from '../components/common/AddWishListButton';
import PostDeleteBtn from '../components/postDelete/PostDeleteBtn';
import { useProfileQuery } from '../service/mypage/useUserQueries';
import { getTime } from '../util/getTime';
import client from '../util/authAxios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { addComma } from '../util/addComma';

export default function PostDetail() {
  const { id: goodsId } = useParams();
  const { data, isLoading } = useReadPostQuery(goodsId!);
  const { data: profile } = useProfileQuery();

  const isAutor = profile?.member_id && profile.member_id === data?.seller_id;

  const mutate = useUpdateStateMutation();

  const handleState = (state: string) => {
    mutate({
      goods_id: goodsId!,
      goods_status: state,
    });
  };

  const navigate = useNavigate();
  const handleToChat = async () => {
    try {
      const res = (await client.post(`api/chat/room/${goodsId}`)).data;
      if (res.room_id) {
        navigate(`/room/${res.room_id}`, { state: { roomId: res.room_id } });
      }
      return res;
    } catch (e) {
      navigate(`/notfound`);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className='w-full max-w-lg px-5 mx-auto mt-5 md:max-w-5xl'>
      <div className='md:flex'>
        <Carousel images={data!.goods_images} />
        <div className='mt-5 md:mt-0 md:flex md:flex-col md:justify-between md:flex-1'>
          <div className='md:flex md:flex-col-reverse md:flex-1 md:pb-8 md:mb-4 md:border-b'>
            <Link
              to={`/shop/${data!.seller_id}`}
              className='h-full pb-4 card card-side md:pb-0 md:h-20'
            >
              <div className='avatar'>
                <div className='w-16 mr-4 rounded-xl md:w-20 md:mr-6'>
                  {data!.seller_profile_image ? (
                    <img src={data!.seller_profile_image} alt='profile_image' />
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='fill-neutral'
                      className='w-full h-full bi bi-person-fill bg-neutral-200'
                      viewBox='0 0 16 16'
                    >
                      <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6' />
                    </svg>
                  )}
                </div>
              </div>
              <div className='flex flex-col items-start justify-center w-full'>
                <p className='mb-2 card-title'>{data!.seller_name}</p>
                <div className='justify-end card-actions'>
                  {Array.isArray(data!.badge_list) && data!.badge_list.includes('판매왕') && (
                    <div className='badge badge-secondary badge-outline md:badge-lg'>판매왕</div>
                  )}
                  {Array.isArray(data!.badge_list) && data!.badge_list.includes('매너왕') && (
                    <div className='badge badge-primary badge-outline md:badge-lg'>매너왕</div>
                  )}
                </div>
              </div>
            </Link>
            <div className='md:flex-1'>
              <div className='flex items-center font-extrabold md:text-3xl'>
                {data!.status === '예약중' && (
                  <div className='h-8 mr-2 text-white break-keep md:h-10 md:mr-4 badge badge-neutral-500 md:badge-lg bg-neutral-500'>
                    {data!.status}
                  </div>
                )}
                {data!.status === '거래완료' && (
                  <div className='h-8 mr-2 text-white break-keep md:h-10 md:mr-4 badge badge-neutral md:badge-lg bg-neutral'>
                    {data!.status}
                  </div>
                )}
                <h1 className='my-4 text-2xl md:my-8 md:text-3xl'>{data!.goods_name}</h1>
              </div>
              <h2 className='mb-4 text-sm text-stone-400 md:text-base'>
                {getTime(data!.uploaded_before)}
              </h2>
            </div>
          </div>
          <div className='fixed bottom-0 left-0 z-30 flex items-center w-full h-20 p-3 bg-white border-t md:relative md:border-0 md:p-0 gap-x-2'>
            <div className='flex items-center'>
              <AddWishListButton goodsId={Number(goodsId)} wish={data!.liked} />
            </div>
            <h3 className='flex-1 text-xl font-bold'>{addComma(String(data!.price))}원</h3>
            {!isAutor && (
              <button onClick={handleToChat} className='btn btn-primary'>
                채팅하기
              </button>
            )}
          </div>
          {isAutor && (
            <div className='flex items-center justify-between md:flex-1 gap-x-2'>
              <select
                name='goods-state'
                defaultValue={data!.status}
                onChange={(e) => handleState(e.target.value)}
                className='w-24 md:w-32 select select-bordered'
              >
                <option value='판매중'>판매중</option>
                <option value='예약중'>예약중</option>
                <option value='거래완료'>거래완료</option>
              </select>
              <div className='flex gap-x-2'>
                <Link to={`/posts/edit/${goodsId}`} className='btn-primary btn'>
                  수정
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-pencil-square'
                    viewBox='0 0 16 16'
                  >
                    <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                    <path
                      fillRule='evenodd'
                      d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
                    />
                  </svg>
                </Link>
                <PostDeleteBtn goodsId={goodsId!} memberId={profile!.member_id} />
              </div>
            </div>
          )}
        </div>
      </div>
      <h2 className='py-4 mt-6 whitespace-pre-wrap border-t min-h-44 md:mt-8 md:pt-8 md:min-h-60'>
        {data!.description}
      </h2>
      <div className='pt-4 border-t pb-28 md:pb-4 md:mb-12'>
        <div className='flex flex-col items-start mb-4 md:items-center md:flex-row md:gap-x-4'>
          <h3 className='font-bold text-left break-keep md:text-lg'>거래 희망 장소</h3>
          <h4 className='break-keep'>{data!.address}</h4>
        </div>
        <Map
          center={{
            lat: data!.lat,
            lng: data!.lng,
          }}
          level={4}
          className='w-full h-48 md:h-64 md:max-w-5xl'
        >
          <MapMarker
            position={{
              lat: data!.lat,
              lng: data!.lng,
            }}
          />
        </Map>
      </div>
    </div>
  );
}
