import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { useForm } from 'react-hook-form';
import { IProfileUpdate } from '../types/interface';
import React, { useEffect, useRef, useState } from 'react';
import { useProfileQuery, useUpdateProfileMutation } from '../service/mypage/useUserQueries';
import PasswordModal from '../components/profile/PasswordModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ProfileUpdate() {
  const { isLoading, data } = useProfileQuery();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [curImg, setCurImg] = useState<string>('');

  const imageRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (data?.profile_image) {
      setCurImg(data.profile_image);
    }
  }, [data?.profile_image]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileUpdate>();

  const handleRemove = () => {
    if (selectedFile) {
      /* 새로 추가한 사진 삭제하는 경우 */
      setSelectedFile(null);
      URL.revokeObjectURL(curImg);
      setCurImg(data!.profile_image ?? '');
    } else {
      /* 기존 사진 삭제하는 경우 */
      setCurImg('');
    }
  };

  const mutate = useUpdateProfileMutation();

  const onSubmit = handleSubmit((form: IProfileUpdate) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('profile_image_file', selectedFile);
    } else if (curImg !== '') {
      formData.append('profile_image_url', curImg);
    }
    formData.append('nick_name', form.nick_name);
    formData.append('phone_number', String(form.phone_number));
    mutate(formData);
  });

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
    setSelectedFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setCurImg(url);
  };

  return (
    <>
      <div className='flex h-20 px-3 py-3 justify-normal md:px-7'>
        <Link to='/'>
          <div className='p-1 rounded-lg hover:bg-neutral-100 '>
            <img src={logo} alt='logo img' className='w-12 h-12' />
          </div>
        </Link>
      </div>
      <div className='flex flex-col items-center justify-center w-full px-5 mx-auto md:max-w-5xl'>
        <h2 className='my-12 text-2xl font-bold text-center md:text-3xl'>프로필 수정</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className='flex justify-center mb-6'>
              <div className='avatar'>
                <div className='w-28 rounded-xl md:w-36'>
                  {curImg ? (
                    <div className='relative h-full'>
                      <img src={curImg} alt='profile_image' />
                      <button
                        onClick={handleRemove}
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
            </div>
            <input
              type='file'
              accept='image/*'
              name='thumbnail'
              ref={imageRef}
              onChange={onUploadImage}
              className='hidden'
            />
            <button type='button' onClick={onUploadBtnClick} className='mb-10 btn btn-neutral'>
              이미지 업로드
            </button>
            <form
              id='userInfo'
              className='flex flex-col items-start justify-center w-full max-w-lg px-5 mb-4 gap-y-4'
            >
              <label
                htmlFor='nick_name'
                className='flex items-center w-full max-w-lg gap-2 font-bold input input-bordered'
              >
                닉네임
                <input
                  {...register('nick_name', {
                    required: { message: '필수항목입니다.', value: true },
                    pattern: {
                      value: /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/,
                      message: '한글, 영문, 숫자만 가능하며 2-10자리로 설정',
                    },
                  })}
                  id='nick_name'
                  type='text'
                  placeholder='닉네임'
                  defaultValue={data!.nick_name}
                  className='font-normal text-right grow'
                />
              </label>
              {errors?.nick_name && <p className='text-red-700'>{errors.nick_name.message}</p>}

              <label
                htmlFor='phone_number'
                className='flex items-center justify-between w-full max-w-lg gap-2 font-bold input input-bordered md:max-w-5xl'
              >
                전화번호
                <input
                  {...register('phone_number', {
                    required: { message: '필수항목입니다.', value: true },
                    pattern: {
                      value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/,
                      message: '전화번호를 올바르게 입력해주세요.',
                    },
                  })}
                  id='phone_number'
                  type='text'
                  placeholder='000-0000-0000'
                  defaultValue={data!.phone_number}
                  className='font-normal text-right max-w-40'
                />
              </label>
              {errors?.phone_number && (
                <p className='text-red-700'>{errors.phone_number.message}</p>
              )}
            </form>
            <div className='w-full max-w-lg px-5 mb-10'>
              <div className='flex items-center justify-between w-full max-w-lg gap-2 mb-4 font-bold input input-bordered md:max-w-5xl'>
                <span>비밀번호</span>
                <PasswordModal title='비밀번호' noExist={false} />
              </div>
              <div className='flex items-center justify-between w-full max-w-lg gap-2 mb-4 font-bold input input-bordered md:max-w-5xl'>
                <div>
                  <span>간편결제 비밀번호</span>
                  {!data?.trade_password_exists && <span className='ml-4 text-accent'>*</span>}
                </div>
                <PasswordModal title='간편결제 비밀번호' noExist={!data!.trade_password_exists} />
              </div>
              <button
                onClick={onSubmit}
                form='updateUser'
                className='w-full max-w-lg btn btn-primary'
              >
                수정 완료
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
