import LoadingSpinner from '../components/common/LoadingSpinner';
import { getTime } from '../util/getTime';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useChatRoomListHistory } from '../service/chat/useChatRoomListQuery';
import React, { useState } from 'react';
import { useMemoHistory } from '../util/useMemoHistory';
import Observer from '../components/common/Observer';
import { useDeleteChatRoomMutation } from '../service/chat/useDeleteChatRoomMutation';
import Modal from '../components/common/Modal';
import ChatRoomListItem from '../components/chatroomList/ChatRoomListItem';

export default function ChatRoomList() {
  const [deleteState, setDeleteState] = useState({
    showButton: false,
    showModal: false,
  });
  const { data, isLoading, hasNextPage, fetchNextPage } = useChatRoomListHistory();
  const deleteChatRoom = useDeleteChatRoomMutation();
  const chatroomList = useMemoHistory(data!);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const roomId = searchParams.get('roomId');

  const handleNavigate = () => navigate(-1);

  const handleTime = (timeString: string) => {
    const localTime = new Date(`${timeString}Z`);
    const timestamp = localTime.getTime();
    const now = new Date();
    const nowTimestamp = now.getTime();
    return getTime((nowTimestamp - timestamp) / 1000);
  };

  /** 채팅방 리스트아이템에 삭제 버튼(휴지통)이 보이도록 */
  const handleShowButton = () =>
    setDeleteState((prev) => ({
      ...prev,
      showButton: !prev.showButton,
    }));

  /** 채팅방 리스트아이템의 삭제 버튼을 누르면 모달이 보이도록 */
  const handleShowModal = (e: React.MouseEvent<HTMLButtonElement>, roomId: number) => {
    e.preventDefault();
    setDeleteState((prev) => ({
      ...prev,
      showModal: true,
    }));
    navigate(`/roomList?roomId=${roomId}`);
  };

  /** 모달 닫기 */
  const handleCloseModal = () => {
    setDeleteState({ showButton: true, showModal: false });
    navigate('/roomList');
  };

  /** 모달의 나가기 버튼을 눌러서 채팅방 삭제 */
  const handleDeleteChatroom = () => {
    deleteChatRoom(Number(roomId));
    handleCloseModal();
  };

  return (
    <div className='w-full px-5 md:mx-auto md:max-w-5xl'>
      <ul className='flex flex-col items-center justify-center w-full mx-auto mb-20 md:max-w-xl'>
        <div className='relative flex items-center w-full py-10'>
          <button className='absolute' onClick={handleNavigate}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className=' size-6 md:size-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
              />
            </svg>
          </button>
          <h2 className='m-auto text-2xl md:text-3xl'>채팅 목록</h2>
        </div>

        {Array.isArray(chatroomList) && chatroomList.length !== 0 && (
          <button
            onClick={handleShowButton}
            className={`ml-auto btn btn-outline btn-sm ${
              deleteState.showButton ? 'btn-success ' : 'btn-error'
            }`}
          >
            {deleteState.showButton ? '완료' : '채팅방 삭제'}
          </button>
        )}
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          Array.isArray(chatroomList) &&
          (chatroomList.length === 0 ? (
            <h3 className='text-lg'>결과가 없습니다.</h3>
          ) : (
            chatroomList.map((item) => (
              <ChatRoomListItem
                key={item.room_id}
                {...item}
                deleteState={deleteState}
                handleShowModal={handleShowModal}
                handleTime={handleTime}
              />
            ))
          ))
        )}
      </ul>
      {deleteState.showButton && deleteState.showModal && (
        <Modal
          isOpen={deleteState.showModal}
          title='채팅방 나가기'
          handleSubmit={handleDeleteChatroom}
          handleCloseModal={handleCloseModal}
          confirmBtnMsg='나가기'
        >
          <p className='py-4 text-lg font-normal text-center'>채팅방을 나가시겠습니까?</p>
        </Modal>
      )}
      <Observer hasNext={hasNextPage} loadMore={fetchNextPage} />
    </div>
  );
}
