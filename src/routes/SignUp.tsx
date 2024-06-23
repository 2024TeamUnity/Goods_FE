import { useForm } from 'react-hook-form';
import { FormValueTypes } from '../types/interface';
import React, { useState } from 'react';
import { useSignupMutation } from '../service/signup/useSignupMutation';
import EmailAuthModal from '../components/common/EmailAuthModal';

export default function SignUp() {
  const formData = new FormData();
  const [disableModal, setDisableModal] = useState(false);
  const [file, setfile] = useState<File | null>(null);
  const [preview, setPreivew] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValueTypes>();

  const signup = useSignupMutation();

  const onSubmit = handleSubmit((data) => {
    if (!disableModal) {
      // eslint-disable-next-line no-alert
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('chk_password', data.confirmPassword);
    formData.append('phone_number', String(data.phoneNumber));
    formData.append('trade_password', String(data.paymentPassword));
    formData.append('nick_name', data.nickName);
    if (file) {
      formData.append('profile_image', file);
    }
    signup(formData);
  });

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = e;
    try {
      if (files && files.length > 0) {
        setfile(files[0]);
        setPreivew(URL.createObjectURL(files[0]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleImgReset = () => {
    setfile(null);
    setPreivew('');
  };

  return (
    <div className='absolute top-0 left-0 w-full h-screen p-3 mt-24'>
      <div className='flex flex-col items-center w-full'>
        <h1 className='my-3 text-3xl md:text-4xl'>회원가입</h1>

        <div className='flex flex-col p-2 md:w-96'>
          <form
            onSubmit={onSubmit}
            className='flex flex-col items-center justify-center mb-5 gap-y-3'
          >
            <div className='relative flex flex-col gap-y-3'>
              {preview ? (
                <img
                  className='w-24 h-24 rounded-xl md:w-36 md:h-36'
                  src={preview}
                  alt='preview img'
                />
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='fill-neutral'
                  className='w-24 h-24 p-2 rounded-xl md:w-36 md:h-36 bi bi-person-fill bg-neutral-200'
                  viewBox='0 0 16 16'
                >
                  <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6' />
                </svg>
              )}
              <button
                onClick={handleImgReset}
                type='button'
                className='absolute flex items-center justify-center w-6 h-6 p-1 text-white rounded-full bg-neutral top-1 right-1'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
            <label htmlFor='profile' className='cursor-pointer '>
              <div className='btn btn-neutral'>이미지 업로드</div>
              <input
                onChange={handleImgChange}
                accept='image/*'
                type='file'
                id='profile'
                className='hidden'
              />
            </label>
            <input
              {...register('email', {
                required: { message: '필수항목입니다.', value: true },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                  message: '올바른 이메일 유형이 아닙니다.',
                },
              })}
              type='email'
              placeholder='이메일'
              className='w-full input input-bordered'
            />
            {errors?.email && <p className='mr-auto text-red-700'>{errors.email.message}</p>}

            <EmailAuthModal email={watch('email')} setDisableModal={() => setDisableModal(true)} />

            <input
              {...register('password', {
                required: { message: '필수항목입니다.', value: true },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/,
                  message: '영문,숫자,특수문자 포함 (8자 이상, 20자 이하)',
                },
              })}
              type='password'
              placeholder='비밀번호'
              className='w-full input input-bordered'
            />
            {errors?.password && <p className='mr-auto text-red-700'>{errors.password.message}</p>}
            <input
              {...register('confirmPassword', {
                required: { message: '필수항목입니다.', value: true },
              })}
              type='password'
              placeholder='비밀번호 확인'
              className='w-full input input-bordered'
            />
            {watch('password') !== watch('confirmPassword') && (
              <p className='mr-auto text-red-700'>비밀번호가 일치하지 않습니다.</p>
            )}
            {errors?.confirmPassword && (
              <p className='mr-auto text-red-700'>{errors.confirmPassword.message}</p>
            )}

            <input
              {...register('nickName', {
                required: { message: '필수항목입니다.', value: true },
                pattern: {
                  value: /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/,
                  message: '한글, 영문, 숫자만 가능하며 2-10자리로 설정',
                },
              })}
              type='text'
              placeholder='닉네임'
              className='w-full input input-bordered'
            />
            {errors?.nickName && <p className='mr-auto text-red-700'>{errors.nickName.message}</p>}
            <input
              {...register('phoneNumber', {
                required: { message: '필수항목입니다.', value: true },
                pattern: {
                  value: /\d{3}-\d{4}-\d{4}/,
                  message: '전화번호를 올바르게 입력해주세요.',
                },
              })}
              type='text'
              placeholder='전화번호(- 포함)'
              className='w-full input input-bordered'
            />
            {errors?.phoneNumber && (
              <p className='mr-auto text-red-700'>{errors.phoneNumber.message}</p>
            )}
            <input
              {...register('paymentPassword', {
                required: { message: '필수항목입니다.', value: true },
                pattern: { value: /^[0-9]{6}$/, message: '6자리 숫자를 입력해주세요.' },
              })}
              type='password'
              placeholder='간편 결제 비밀번호'
              className='w-full input input-bordered'
            />
            {errors?.paymentPassword && (
              <p className='mr-auto text-red-700'>{errors.paymentPassword.message}</p>
            )}
            <button className='w-full btn btn-primary'>가입 완료</button>
          </form>
        </div>
      </div>
    </div>
  );
}
