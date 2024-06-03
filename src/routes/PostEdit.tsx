import { useParams } from 'react-router-dom';
import { useReadPostQuery } from '../service/post/useReadPostQuery';
import PostCreate from './PostCreate';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function PostEdit() {
  const { id: goodsId } = useParams();

  const { data, isLoading } = useReadPostQuery(goodsId!);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <PostCreate
      goods_id={goodsId}
      goods_name={data!.goods_name}
      price={data!.price}
      description={data!.description}
      curImages={data!.goods_images}
      lat={data!.lat}
      lng={data!.lng}
    />
  );
}
