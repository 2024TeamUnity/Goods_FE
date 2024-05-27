import { IMyInfo } from '../../types/interface';
import Star from './Star';

export default function Profile({ nick_name, profile_image, star, badge_list }: Partial<IMyInfo>) {
  return (
    <div className='w-full max-w-md mx-auto h-36 md:flex-auto md:m-0'>
      <div className='h-full pb-8 card card-side md:pb-0'>
        <div className='avatar'>
          <div className='mr-8 w-28 rounded-xl md:w-36 md:mr-8'>
            {profile_image ? (
              <img src={profile_image} alt='profile_image' />
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
          <h2 className='mb-2 card-title'>{nick_name}</h2>
          <Star star={star!} />
          <div className='justify-end mt-4 card-actions'>
            {Array.isArray(badge_list) && badge_list!.includes('판매왕') && (
              <div className='badge badge-secondary badge-outline md:badge-lg'>판매왕</div>
            )}
            {Array.isArray(badge_list) && badge_list!.includes('매너왕') && (
              <div className='badge badge-primary badge-outline md:badge-lg'>매너왕</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
