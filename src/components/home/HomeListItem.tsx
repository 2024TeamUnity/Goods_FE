import { IGoodsList } from '../../types/interface';
import { Link } from 'react-router-dom';
import { addComma } from '../../util/addComma';

export default function HomeListItem({ products }: { products: IGoodsList[] }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {Array.isArray(products) &&
        products.map((product) => (
          <Link to={`posts/${product.goods_id}`} key={`_${product.goods_id}`}>
            <li className='flex items-center justify-start px-2 py-3 border-b md:p-3 gap-x-5'>
              <img
                src={product.thumbnail_url}
                alt='thumbnail'
                className='w-20 h-20 md:w-24 md:h-24 rounded-xl'
              />
              <div className='font-bold'>
                <h3 className='mb-3 md:text-lg lg:text-xl'>{product.goods_name}</h3>
                <p>{`${addComma(String(product.price))}원`}</p>
              </div>
            </li>
          </Link>
        ))}
    </>
  );
}
