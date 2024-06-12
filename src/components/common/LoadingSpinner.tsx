export default function LoadingSpinner() {
  return (
    <div className='absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-white border gap-x-5'>
      <span className='loading loading-spinner loading-lg' />
      <h1 className='text-lg font-bold md:text-2xl'>로딩 중 입니다...</h1>
    </div>
  );
}
