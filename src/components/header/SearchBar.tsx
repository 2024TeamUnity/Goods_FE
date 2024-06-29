import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useSearchQuery, useUpdateSearchMutation } from '../../service/map/useSearchMutation';
import { IGoodsList } from '../../types/interface';
import { useSetRecoilState } from 'recoil';
import { goodsListState, homeListState } from '../../store/atom';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [autocomplete, setAutocomplete] = useState<IGoodsList[]>([]);
  const [selectedItem, setSelectedItem] = useState(0);

  const navigate = useNavigate();
  const homeMatch = useMatch('/');
  const updateSearch = useUpdateSearchMutation(setAutocomplete, keyword);
  const { refetch, hasNextPage, fetchNextPage } = useSearchQuery(keyword, setKeyword);
  const setHomeList = useSetRecoilState(homeListState);
  const setGoodsList = useSetRecoilState(goodsListState);

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const handleSearch = async () => {
    const res = (await refetch()).data;
    const searchData = res?.pages.reduce((acc, cur) => [...acc, ...cur], []);
    setHomeList({
      data: searchData!,
      hasNext: hasNextPage,
      loadMore: fetchNextPage,
    });
    setGoodsList(searchData!);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (!keyword) return;
    if (selectedItem < autocomplete.length) {
      if (key === 'Enter') {
        handleSearch();
        if (!homeMatch) navigate('/'); // 홈 아닌 다른페이지에서 검색했다면 홈으로 이동
      } else if (key === 'ArrowUp' && selectedItem >= 0) {
        setSelectedItem((prev) => (prev === 0 ? prev + autocomplete.length - 1 : prev - 1));
      } else if (key === 'ArrowDown' && selectedItem < autocomplete.length) {
        setSelectedItem((prev) => (prev < autocomplete.length - 1 ? prev + 1 : 0));
      } else if (key === 'Escape') {
        setAutocomplete([]);
      }
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) updateSearch();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword, updateSearch]);

  return (
    <div className='relative w-1/2 md:w-1/3'>
      <label
        htmlFor='searchInput'
        className='flex items-center w-full gap-2 input rounded-3xl input-bordered input-sm md:input-md'
      >
        <input
          value={keyword}
          onChange={handleWordChange}
          onKeyDown={handleKeyDown}
          id='searchInput'
          type='text'
          className='grow'
          placeholder='Search'
          autoComplete='off'
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='w-5 h-5 text-black'
        >
          <path
            fillRule='evenodd'
            d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
            clipRule='evenodd'
          />
        </svg>
      </label>
      {keyword && autocomplete.length > 0 && (
        <ul className='absolute left-0 w-full p-3 bg-neutral-50 rounded-xl '>
          {autocomplete.map((item, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              onClick={handleSearch}
              className={`p-2 font-bold hover:bg-neutral-200 rounded-xl ${
                selectedItem === index && 'bg-neutral-200'
              }`}
              key={`${item.goods_id}_${item.lat}`}
            >
              {item.goods_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
