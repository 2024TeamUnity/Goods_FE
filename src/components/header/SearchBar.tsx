import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ISearchData } from '../../mocks/data/searchData';
import { useSearchMutation } from '../../service/map/useSearchMutation';

export default function SearchBar() {
  const [word, setWord] = useState('');
  const [autocomplete, setAutocomplete] = useState<ISearchData[]>([]);
  const [selectedItem, setSelectedItem] = useState(0);

  const navigate = useNavigate();
  const homeMatch = useMatch('/');
  const search = useSearchMutation(setWord);

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.currentTarget.value);
  };

  const handleKeywordSubmit = (word: string) => search(word);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (!word) return;
    if (selectedItem < autocomplete.length) {
      if (key === 'Enter') {
        search(autocomplete[selectedItem].name);
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
    const updateWord = async () => {
      const res = (await axios.get(`/api/goods/search?word=${word}`)).data;
      setAutocomplete([{ id: Date.now(), name: word }, ...res]);
    };

    const debounce = setTimeout(() => {
      if (word) updateWord();
    }, 1000);
    return () => {
      clearTimeout(debounce);
    };
  }, [word]);

  return (
    <div className='relative w-1/2 md:w-1/3'>
      <label
        htmlFor='searchInput'
        className='flex items-center w-full gap-2 input rounded-3xl input-bordered input-sm md:input-md'
      >
        <input
          value={word}
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
      {word && autocomplete!.length > 0 && (
        <ul className='absolute left-0 w-full p-3 bg-neutral-50 rounded-xl '>
          {autocomplete?.map((item, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              onClick={() => handleKeywordSubmit(item.name)}
              className={`p-2 font-bold hover:bg-neutral-200 rounded-xl ${
                selectedItem === index && 'bg-neutral-200'
              }`}
              key={item.id}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
