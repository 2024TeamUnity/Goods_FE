import { IEditPostData, IPostCreate } from '../types/interface';
import { useForm } from 'react-hook-form';
import { useCreatePostMutation } from '../service/post/useCreatePostMutation';
import { useRecoilValue } from 'recoil';
import {
  clickedLocationState,
  imgFilesState,
  imgUrlListState,
  imgUrlsToDeleteState,
} from '../store/atom';
import PostImgList from '../components/postImg/PostImgList';
import { useMatch } from 'react-router-dom';
import { useUpdatePostMutation } from '../service/post/useUpdatePostMutation';
import PostMap from '../components/postMap/PostMap';

export default function PostCreate({
  goods_id,
  goods_name,
  price,
  description,
  lat,
  lng,
  user_defined_location,
  curImages,
}: Partial<IEditPostData>) {
  const newPostMatch = useMatch('/posts/new');
  const files = useRecoilValue<File[]>(imgFilesState);
  const imgUrls = useRecoilValue<string[]>(imgUrlListState);
  const imgUrlsToDelete = useRecoilValue<string[]>(imgUrlsToDeleteState);
  const clickedLocation = useRecoilValue(clickedLocationState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCreate>();

  /* 데이터 전송 관련 */
  const newPostMutate = useCreatePostMutation();
  const updateMutate = useUpdatePostMutation();

  const onSubmit = handleSubmit((form: IPostCreate) => {
    if (imgUrls.length + files.length < 1) {
      // eslint-disable-next-line no-alert
      alert('사진을 업로드해주세요.');
      return;
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('goods_image_files', file);
    });
    formData.append('goods_name', form.goods_name);
    formData.append('price', String(form.price));
    formData.append('description', form.description);
    if (clickedLocation.lat === 0) {
      formData.append('lat', String(lat) ?? String(clickedLocation.center.lat));
    } else {
      formData.append('lat', String(clickedLocation.lat));
    }
    if (clickedLocation.lng === 0) {
      formData.append('lng', String(lng) ?? String(clickedLocation.center.lng));
    } else {
      formData.append('lng', String(clickedLocation.lng));
    }
    formData.append('user_defined_location', form.user_defined_location);
    formData.append('address', clickedLocation.address || '서울 종로구 세종로 1-80');
    if (newPostMatch) {
      newPostMutate(formData);
    } else {
      imgUrlsToDelete.forEach((url) => {
        formData.append('images_to_delete', url);
      });
      updateMutate({
        post: formData,
        goods_id: goods_id!,
      });
    }
  });

  return (
    <div className='w-full px-5 md:mx-auto md:max-w-5xl'>
      <h2 className='my-12 text-2xl font-bold text-center md:text-3xl'>
        {newPostMatch ? '상품 등록' : '상품 수정'}
      </h2>
      <PostImgList prevThumbnails={curImages ?? []} />
      <form
        onSubmit={onSubmit}
        className='flex flex-col items-start w-full max-w-lg mx-auto mb-10 md:max-w-5xl'
      >
        <label
          htmlFor='priceInput'
          className='flex items-center w-full max-w-lg gap-2 font-bold md:mt-8 input input-bordered md:max-w-5xl'
        >
          가격
          <input
            {...register('price', {
              required: { message: '필수항목입니다.', value: true },
            })}
            id='priceInput'
            type='number'
            className='font-normal text-right grow'
            defaultValue={price}
          />
          원
        </label>
        {errors?.price && <p className='mt-2 text-red-700'>{errors.price.message}</p>}

        <label
          htmlFor='nameInput'
          className='flex items-center w-full max-w-lg gap-2 mt-4 font-bold md:mt-8 input input-bordered md:max-w-5xl'
        >
          상품명
          <input
            {...register('goods_name', {
              required: { message: '필수항목입니다.', value: true },
            })}
            id='nameInput'
            type='text'
            className='font-normal text-right grow'
            defaultValue={goods_name}
          />
        </label>
        {errors?.goods_name && <p className='mt-2 text-red-700'>{errors.goods_name.message}</p>}

        <textarea
          {...register('description', {
            required: { message: '필수항목입니다.', value: true },
          })}
          placeholder='상세 내용'
          defaultValue={description}
          className='w-full max-w-lg p-4 mt-4 text-base textarea md:mt-8 textarea-bordered textarea-sm md:max-w-5xl md:min-h-60'
        />
        {errors?.description && <p className='mt-2 text-red-700'>{errors.description.message}</p>}
        <PostMap lat={lat!} lng={lng!} />
        <input
          {...register('user_defined_location', {
            required: { message: '필수항목입니다.', value: true },
          })}
          type='text'
          placeholder='상세 주소 입력'
          defaultValue={user_defined_location}
          className='w-full max-w-lg mt-4 md:mt-8 input input-bordered md:max-w-5xl'
        />
        {errors?.user_defined_location && (
          <p className='mt-2 text-red-700'>{errors.user_defined_location.message}</p>
        )}

        <button className='w-full max-w-lg mt-4 md:btn-lg md:mt-8 btn btn-primary md:max-w-32'>
          {newPostMatch ? '등록하기' : '수정하기'}
        </button>
      </form>
    </div>
  );
}
