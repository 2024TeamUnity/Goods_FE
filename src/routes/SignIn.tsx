import { Link } from 'react-router-dom';
import KakaoLoginButton from '../components/socialLogin/KakaoLoginButton';

export default function SignIn() {
  return (
    <div className='absolute top-0 left-0 flex items-center justify-center w-full h-screen p-3'>
      <div className='flex flex-col items-center w-full'>
        <h1 className='my-10 text-3xl md:text-4xl'>로그인</h1>

        <div className='flex flex-col p-2 md:w-96'>
          <KakaoLoginButton />
          <div className='my-8 divider'>또는</div>
          <form className='flex flex-col items-center justify-center mb-5 gap-y-3'>
            <label htmlFor='email' className='flex items-center w-full gap-2 input input-bordered'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='w-4 h-4 opacity-70'
              >
                <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
              </svg>
              <input type='email' id='email' className='grow' placeholder='이메일' />
            </label>

            <label
              htmlFor='password'
              className='flex items-center w-full gap-2 input input-bordered'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='w-4 h-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                  clipRule='evenodd'
                />
              </svg>
              <input id='password' type='password' className='grow' placeholder='비밀번호' />
            </label>
            <button className='w-full btn btn-neutral'>이메일로 로그인</button>
          </form>
          <Link className='text-sm text-center' to='/signup'>
            <span>회원가입</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
