import { useProfileQuery } from '../../service/mypage/useUserQueries';
import { useChargeMutation } from '../../service/point/useChargeMutation';
import * as PortOne from '@portone/browser-sdk/v2';

export default function ChargeBtn({ point, isValid }: { point: string; isValid: boolean }) {
  const { data, isLoading } = useProfileQuery();
  const { mutate: charge } = useChargeMutation();

  async function requestPayment() {
    const response = await PortOne.requestPayment({
      storeId: 'store-c25657c2-20cd-46be-a4b7-7251c9edaac6',
      channelKey: 'channel-key-7befbae7-69b4-4a6e-8ff6-744de647707a',
      paymentId: `payment${crypto.randomUUID()}`,
      orderName: '포인트 충전',
      totalAmount: Number(point),
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      customer: {
        fullName: data!.nick_name,
        phoneNumber: data!.phone_number,
        email: 'test@portone.io',
      },
      redirectUrl: `http://localhost:5173/payment/redirect`,
    });

    if (!response || response?.code !== null) {
      // eslint-disable-next-line no-alert
      return alert(response?.message);
    }

    if (response) {
      charge({
        price: point,
        payment_id: response.paymentId!,
      });
    }
  }

  if (isLoading) return <p>Loading...</p>;
  return (
    <button
      onClick={() => requestPayment()}
      className={`w-full max-w-lg btn btn-accent${isValid ? '' : ' btn-disabled'}`}
    >
      충전하기
    </button>
  );
}