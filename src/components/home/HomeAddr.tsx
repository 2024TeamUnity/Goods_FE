import { useState } from 'react';
import { hangjungdong } from '../../constants';
import { useSearchAddrMutation } from '../../service/map/useSearchMutation';
import { useSetRecoilState } from 'recoil';
import { searchAddrState } from '../../store/atom';

export default function HomeAddr() {
  const [siValue, setSiValue] = useState<string>('');
  const [guValue, setGuValue] = useState<string>('');
  const [dongValue, setDongValue] = useState<string>('');
  const { sido, sigugun, dong } = hangjungdong;
  const setKeyword = useSetRecoilState(searchAddrState);

  const search = useSearchAddrMutation();

  const handleSiValue = (selectedSi: string) => {
    setSiValue(selectedSi);
    setGuValue('');
    setDongValue('');
  };

  const handleGuValue = (selectedGu: string) => {
    setGuValue(selectedGu);
    setDongValue('');
  };

  const handleSubmit = () => {
    if (siValue && guValue && dongValue) {
      const siName = sido.filter((item) => item.sido === siValue)[0].codeNm;
      const guName = sigugun.filter((item) => item.sido === siValue && item.sigugun === guValue)[0]
        .codeNm;
      const dongName = dong.filter(
        (item) => item.sido === siValue && item.sigugun === guValue && item.dong === dongValue,
      )[0]?.codeNm;
      if (siName === guName) {
        search(`${siName} ${dongName}`);
        setKeyword(`${siName} ${dongName}`);
      } else {
        search(`${siName} ${guName} ${dongName}`);
        setKeyword(`${siName} ${guName} ${dongName}`);
      }
    }
  };

  return (
    <div className='flex items-center justify-center px-5 py-2 gap-x-5'>
      <select
        value={siValue}
        onChange={(e) => handleSiValue(e.target.value)}
        className='w-full max-w-xs pl-2 pr-8 md:pr-10 select select-bordered md:pl-4'
      >
        <option value=''>시 선택</option>
        {sido.map((item) => (
          <option key={item.sido} value={item.sido}>
            {item.codeNm}
          </option>
        ))}
      </select>

      <select
        value={guValue}
        onChange={(e) => handleGuValue(e.target.value)}
        className='w-full max-w-xs pl-2 pr-8 select select-bordered md:pr-10 md:pl-4'
      >
        <option value=''>구 선택</option>
        {sigugun
          .filter((item) => item.sido === siValue)
          .map((item) => (
            <option key={item.sigugun} value={item.sigugun}>
              {item.codeNm}
            </option>
          ))}
      </select>

      <select
        value={dongValue}
        onChange={(e) => setDongValue(e.target.value)}
        className='w-full max-w-xs pl-2 pr-8 select select-bordered md:pr-10 md:pl-4'
      >
        <option value=''>동 선택</option>
        {dong
          .filter((item) => item.sido === siValue && item.sigugun === guValue)
          .map((item) => (
            <option key={item.dong} value={item.dong}>
              {item.codeNm}
            </option>
          ))}
      </select>
      <button type='button' onClick={handleSubmit} className='btn btn-outline'>
        검색
      </button>
    </div>
  );
}
