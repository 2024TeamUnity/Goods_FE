import { useLocation, useNavigate } from 'react-router-dom';
import { useChargeMutation } from '../service/point/useChargeMutation';
import { useEffect } from 'react';

export default function PayRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: charge } = useChargeMutation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const message = queryParams.get('message');
    const paymentId = queryParams.get('paymentId');
    const point = queryParams.get('point');
    if (code) {
      // eslint-disable-next-line no-alert
      alert(message);
      navigate('/mypage/charge');
    }

    if (paymentId && point) {
      charge({
        price: point,
        payment_id: paymentId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return <p>Payment Processing...</p>;
}
