import { IModal } from '../../types/interface';

export default function Modal({
  isOpen,
  children,
  title,
  keyword,
  isError,
  hasSubmit,
  isEmpty,
  handleSubmit,
  handleCloseModal,
  confirmBtnMsg,
}: Partial<IModal>) {
  if (!isOpen) return null;

  return (
    <dialog open className='bg-black/40 modal duration-0'>
      <div className='modal-box'>
        <p className='py-4 text-xl font-bold text-center'>{title}</p>
        {hasSubmit &&
          (isError ? (
            <p className='py-4 text-lg font-normal text-center text-red-700'>
              {`${keyword} 다시 입력해주세요.`}
            </p>
          ) : (
            <p className='py-4 text-lg font-normal text-center'>{`${keyword} 입력하세요.`}</p>
          ))}
        <div className='justify-center mt-0 modal-action'>
          <form method='dialog'>
            {children}
            <div className='flex justify-around w-full mt-8 mb-4'>
              <button
                type='button'
                onClick={handleSubmit}
                className={`btn w-32 mr-2 shrink md:w-40 btn-accent ${
                  !isEmpty ? '' : ' btn-disabled'
                }`}
              >
                {confirmBtnMsg}
              </button>
              <button
                onClick={handleCloseModal}
                className='w-32 ml-2 btn shrink md:w-40 btn-neutral'
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
