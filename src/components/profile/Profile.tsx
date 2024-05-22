import { IMyInfo } from '../../types/interface';
import Star from './Star';

export default function Profile({ nickName, profileImage, star, badgeList }: Partial<IMyInfo>) {
  return (
    <div className='w-full max-w-md mx-auto h-36 md:flex-auto md:m-0'>
      <div className='h-full pb-8 card card-side md:pb-0'>
        <div className='avatar'>
          <div className='mr-4 w-28 rounded-xl md:w-36 md:mr-8'>
            {profileImage ? (
              <img src={profileImage} alt='profile_image' />
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
        <div className='flex flex-col items-start justify-around w-full'>
          <div className='flex items-center'>
            <h2 className='mr-2 card-title'>{nickName}</h2>
            <Star star={star!} />
          </div>
          <div className='justify-end card-actions'>
            {Array.isArray(badgeList) && badgeList!.includes('판매왕') && (
              <div className='badge badge-secondary badge-outline md:badge-lg'>판매왕</div>
            )}
            {Array.isArray(badgeList) && badgeList!.includes('매너왕') && (
              <div className='badge badge-primary badge-outline md:badge-lg'>매너왕</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
