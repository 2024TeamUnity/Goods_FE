import { Link } from 'react-router-dom';
import { IChatRoomListItem } from '../../types/interface';

export default function ChatRoomListItem(props: IChatRoomListItem) {
  return (
    <li key={props.room_id} className='relative w-full border-b h-36'>
      <Link
        to={`/room/${props.room_id}`}
        className='flex items-center justify-start h-full p-4 gap-x-8'
        state={{ roomId: props.room_id }}
      >
        <img
          className='relative object-cover w-20 h-20 grow-0 rounded-xl md:w-28 md:h-28'
          src={props.goods_image}
          alt='thumbnail'
        />
        {props.deleteState.showButton && (
          <button
            onClick={(e) => props.handleShowModal(e, props.room_id)}
            className='absolute object-cover flex hover:bg-[rgba(0,0,0,.5)] justify-center items-center w-20 h-20 bg-[rgba(0,0,0,.3)] grow-0 rounded-xl md:w-28 md:h-28'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-10 fill-red-500 stroke-black'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
          </button>
        )}
        <div className='flex flex-col justify-around flex-1 w-full h-full min-w-0 py-2'>
          <p className='text-lg font-bold truncate'>{props.partner}</p>
          <p className='truncate'>{props.last_message}</p>
          <p className='text-sm truncate text-stone-400'>{props.handleTime(props.updated_at)}</p>
        </div>
        {props.not_read > 0 && (
          <div className='btn btn-circle btn-secondary btn-sm'>{props.not_read}</div>
        )}
      </Link>
    </li>
  );
}
