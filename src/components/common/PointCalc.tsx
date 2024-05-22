import { ChangeEvent, useEffect, useState } from 'react';
import { IPointCalc } from '../../types/interface';
import { usePointQuery } from '../../service/point/usePointQuery';
import { useChargeMutation } from '../../service/point/useChargeMutation';
import { useWithdrawMutation } from '../../service/point/useWithdrawMutation';
import { useTradePointMutation } from '../../service/point/useTradePointMutation';

export default function PointCalc({ type, bank, account, password, price, goodsId }: IPointCalc) {
  const [point, setPoint] = useState('');
  const [isNegative, setIsNegative] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [curPoint, setCurPoint] = useState<number>(0);

  const typeDescription: { [key: string]: string } = {
    charge: '충전',
    transfer: '송금',
    payment: '결제',
  };

  const typeStr = typeDescription[type];

  const { data, isLoading } = usePointQuery();

  const addComma = (point: string): string => {
    const commaPoint = point.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return commaPoint;
  };

  const [newPoint, setNewPoint] = useState(addComma(String(curPoint)));

  const handlePoint = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const handledPoint = value.replace(/[^0-9]/g, '');
    setPoint(handledPoint);
  };

  const handleAddPoint = () => {
    const afterPointNum =
      type === 'charge' ? +curPoint + +Number(point) : +curPoint - +Number(point);
    if (afterPointNum < 0) {
      setIsNegative(true);
      return;
    }
    setIsNegative(false);
    const afterPointStr = addComma(String(afterPointNum));
    setNewPoint(afterPointStr);
  };

  useEffect(() => {
    if (!data) return;
    setCurPoint(data.price);

    if (price && data.price < price) {
      setIsNegative(true);
    }

    if (
      (type === 'transfer' && bank && account && point && !isNegative) ||
      (type === 'charge' && point) ||
      (type === 'payment' && password && point)
    ) {
      return setIsValid(true);
    }
    return setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bank, account, point, type, password, curPoint]);

  const { mutate: charge } = useChargeMutation();
  const { mutate: withdraw } = useWithdrawMutation();
  const { mutate: trade } = useTradePointMutation();
  const handleSubmit = () => {
    if (type === 'transfer') {
      withdraw({
        point,
        bank_name: bank!,
        account_number: String(account),
      });
    } else if (type === 'payment') {
      /* 임시 */
      trade({
        seller_id: 1,
        goods_id: goodsId!,
        price: String(price),
        trade_password: String(password),
      });
    } else {
      /* 임시 */
      charge({
        price: point,
        payment_id: 1,
        imp_uid: '1',
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className='w-full max-w-lg mt-6'>
        <h2 className='my-4 text-lg'>* {typeStr}할 금액을 입력해주세요</h2>
        <label
          htmlFor='pointInput'
          className='flex flex-row-reverse items-center w-full max-w-lg gap-2 font-bold input input-bordered md:max-w-5xl'
        >
          원
          {type !== 'payment' ? (
            <input
              id='pointInput'
              type='text'
              value={addComma(point) || ''}
              onChange={handlePoint}
              onBlur={handleAddPoint}
              className='text-right grow'
            />
          ) : (
            <input
              id='pointInput'
              type='text'
              value={addComma(String(price))}
              className='text-right grow'
              readOnly
            />
          )}
        </label>
        {isNegative && (
          <p className='mt-2 text-sm font-normal text-right text-red-700'>
            현재 포인트보다 많은 금액은 {typeStr}할 수 없습니다.
          </p>
        )}
      </div>
      <div className='flex flex-col justify-center w-full h-40 max-w-lg px-5 py-5 my-10 border rounded-xl border-neutral md:px-10'>
        <div className='flex items-center justify-between flex-auto w-full'>
          <p className='text-lg font-bold md:text-xl'>현재 포인트</p>
          <p className='text-lg font-bold md:text-xl'>{`${addComma(String(curPoint))}P`}</p>
        </div>
        <div className='flex items-center justify-between flex-auto w-full'>
          <p className='text-lg font-bold md:text-xl'>{typeStr} 후 포인트</p>
          <p className='text-lg font-bold md:text-xl'>{`${newPoint}P`}</p>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className={`w-full max-w-lg btn btn-accent${isValid ? '' : ' btn-disabled'}`}
      >
        {typeStr}하기
      </button>
    </>
  );
}
