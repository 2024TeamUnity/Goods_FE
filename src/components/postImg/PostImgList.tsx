import { Children, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { imgFilesState, imgUrlListState, imgUrlsToDeleteState } from '../../store/atom';
import { MAXFILECOUNT } from '../../constants';

export default function PostImgList({ prevThumbnails }: { prevThumbnails: string[] }) {
  const [files, setFiles] = useRecoilState<File[]>(imgFilesState);
  const [imgUrls, setImgUrls] = useRecoilState<string[]>(imgUrlListState);
  const [imgUrlsToDelete, setImgUrlsToDelete] = useRecoilState<string[]>(imgUrlsToDeleteState);
  const imageRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setImgUrls(prevThumbnails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 이미지 업로드 버튼 관련 메서드들 */
  const onUploadBtnClick = () => {
    if (!imageRef.current) {
      return;
    }
    imageRef.current.click();
  };

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const remainFileCount = MAXFILECOUNT - imgUrls.length;
    if (e.target.files.length > remainFileCount) {
      // eslint-disable-next-line no-alert
      return alert(`사진은 최대 ${MAXFILECOUNT}개까지 첨부 가능합니다.`);
    }
    const newFiles = Array.from(e.target.files);
    const allFiles = [...files, ...newFiles];
    setFiles(allFiles);

    const urlList = newFiles.map((file) => URL.createObjectURL(file));
    setImgUrls([...imgUrls, ...urlList]);
  };

  const handleRemove = (idx: number) => {
    if (Array.isArray(prevThumbnails) && prevThumbnails.includes(imgUrls[idx])) {
      /* 기존 사진 삭제하는 경우 */
      const imageToDelete = imgUrls[idx];
      setImgUrlsToDelete([...imgUrlsToDelete, imageToDelete]);
    } else {
      /* 새로 추가한 사진 삭제하는 경우 */
      const updatedFiles = files.filter((_, i) => i !== idx - imgUrls.length);
      URL.revokeObjectURL(imgUrls[idx]);
      setFiles([...updatedFiles]);
    }
    const updatedThumbnails = imgUrls.filter((_, i) => i !== idx);
    setImgUrls(updatedThumbnails);
  };

  return (
    <div className='w-full max-w-lg mx-auto md:max-w-5xl md:mt-24'>
      <div className='flex h-32 mb-6 overflow-x-auto md:h-44'>
        {imgUrls.map((url, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={url + idx} className='mr-4 avatar'>
            <div className='relative w-24 h-24 rounded-xl md:w-36 md:h-36'>
              <img src={url} alt='uploaded_image' />
              <button
                onClick={() => handleRemove(idx)}
                className='absolute top-1 right-1 btn btn-xs md:btn-sm btn-circle btn-neutral'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4 md:w-6 md:h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {Children.toArray(
          [...Array(MAXFILECOUNT - imgUrls.length)].map(() => (
            <div className='mr-4 avatar'>
              <div className='w-24 h-24 border-2 rounded-xl md:w-36 md:h-36' />
            </div>
          )),
        )}
      </div>
      <input
        type='file'
        accept='image/*'
        name='thumbnail'
        ref={imageRef}
        onChange={onUploadImage}
        className='hidden'
        multiple
      />
      <button type='button' onClick={onUploadBtnClick} className='mb-6 btn btn-neutral'>
        이미지 업로드
      </button>
    </div>
  );
}
