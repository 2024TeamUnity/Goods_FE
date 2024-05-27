import { Link, useParams } from 'react-router-dom';
import logo from '../assets/logo.webp';
import Profile from '../components/profile/Profile';
import { useSellerProfileQuery } from '../service/mypage/useUserQueries';
import { useSalesHistoryQuery } from '../service/mypage/useSalseHistoryQuery';
import CardListItem from '../components/common/CardListItem';

export default function Shop() {
  const { id } = useParams();

  const { data: profile, isLoading: profileLoading } = useSellerProfileQuery(id!);
  const { data: salesData, isLoading: salesLoading } = useSalesHistoryQuery(id!);

  return (
    <>
      <div className='flex h-20 px-3 py-3 justify-normal md:px-7'>
        <Link to='/'>
          <div className='p-1 rounded-lg hover:bg-neutral-100 '>
            <img src={logo} alt='logo img' className='w-12 h-12' />
          </div>
        </Link>
      </div>
      <div className='w-full px-5 md:mx-auto md:max-w-5xl'>
        <h1 className='my-12 text-2xl font-bold text-center md:text-3xl'>판매자 프로필</h1>
        <div className='flex flex-col md:flex-row md:items-end'>
          {!profileLoading && (
            <Profile
              nick_name={profile!.nick_name}
              profile_image={profile!.profile_image}
              star={profile!.star}
              badge_list={profile!.badge_list}
            />
          )}
        </div>
        <div className='w-full max-w-md mx-auto border-t-2 md:max-w-5xl md:mt-8'>
          <h2 className='mt-8 mb-4 ml-4 text-xl font-bold md:text-2xl'>판매 목록</h2>
          {!salesLoading && (
            <ul className='flex flex-col items-center justify-center w-full max-w-md mx-auto mb-20 md:max-w-5xl gap-y-3'>
              {salesData!.content.length === 0 ? (
                <div className='flex flex-col items-center justify-center w-full h-96 gap-y-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-10 h-10'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  <h1 className='text-xl font-bold'>결과가 없습니다.</h1>
                  <Link to='/'>
                    <button className='btn btn-outline'>물건 보러 가기</button>
                  </Link>
                </div>
              ) : (
                salesData!.content.map((item) => {
                  return (
                    <CardListItem
                      key={item.goods_id}
                      id={item.goods_id}
                      img={item.goods_thumbnail}
                      name={item.goods_name}
                      price={item.price}
                      status={item.goods_status}
                      uploaded_before={item.uploaded_before}
                    />
                  );
                })
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
