import { useRecoilValue } from 'recoil';
import { homeListState } from '../../store/atom';
import { Link } from 'react-router-dom';

export default function HomeList() {
  const products = useRecoilValue(homeListState);
  const addComma = (price: string): string => {
    const priceStr = String(price);
    const commaPrice = priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return commaPrice;
  };

  return (
    <ul className='overflow-y-auto border h-96 md:h-full md:w-96 bg-rgba(255,255,255,.7)'>
      {Array.isArray(products) &&
        products.map((product) => (
          <Link to={`posts/${product.goods_id}`} key={`_${product.goods_id}`}>
            <li className='flex items-center justify-start p-3 border gap-x-5'>
              <img src={product.thumbnail_url} alt='thumbnail' className='w-24 h-24 rounded-xl' />
              <div className='font-bold'>
                <h3 className='mb-3 text-xl'>{product.goods_name}</h3>
                <p className='text-lg md:text-base'>{`${addComma(product.price)}원`}</p>
              </div>
            </li>
          </Link>
        ))}
    </ul>
  );
}
