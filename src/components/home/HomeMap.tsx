import { Dispatch, SetStateAction, useEffect } from 'react';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';
import MyLocationMarker from './MyLocationMarker';
import { IGoodsList, IMyLocation } from '../../types/interface';
import ProductMarkers from './ProductMarkers';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  goodsListState,
  homeListState,
  isAuthState,
  searchAddrState,
  searchResultState,
} from '../../store/atom';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import axios from 'axios';

export default function HomeMap({
  state,
  setState,
  pageData,
  listData,
}: {
  state: IMyLocation;
  setState: Dispatch<SetStateAction<IMyLocation>>;
  pageData: IGoodsList[];
  listData: IGoodsList[];
}) {
  const setSearchList = useSetRecoilState(searchResultState);
  const setHomeList = useSetRecoilState(homeListState);
  const [goodsList, setGoodsList] = useRecoilState(goodsListState);
  const isAuth = useRecoilValue(isAuthState);
  const keyword = useRecoilValue(searchAddrState);

  useEffect(() => {
    if (pageData) {
      setHomeList(pageData!);
      setGoodsList(listData!);
    }
  }, [pageData, setHomeList, setGoodsList, listData]);

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    if (!keyword) return;
    geocoder.addressSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setState({
          center: {
            lat: Number(newSearch.y),
            lng: Number(newSearch.x),
          },
          errMsg: null,
          isLoading: true,
        });
      }
    });
  }, [keyword, setState]);

  const handleResetSearch = async () => {
    setSearchList([]);
    setHomeList(pageData!);
  };

  const handleMapDrag = async (map: kakao.maps.Map) => {
    const latlng = map.getCenter();

    const newListData = (
      await axios.get('/api/api/goods', {
        params: { lat: latlng.getLat(), lng: latlng.getLng(), responseType: 'list' },
      })
    ).data;
    const newPageData = (
      await axios.get('/api/api/goods', {
        params: { lat: latlng.getLat(), lng: latlng.getLng(), responseType: 'page' },
      })
    ).data.content;

    setHomeList(newPageData);
    setGoodsList(newListData);
  };

  const debounceHandleMapDrag = debounce(handleMapDrag, 300);
  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        className='relative w-full h-full'
        level={3} // 지도의 확대 레벨
        onDrag={debounceHandleMapDrag}
      >
        {/* 현재 내 위치  */}
        <MyLocationMarker state={state} setState={setState} />
        {/* 모든 상품 위치 */}
        <ProductMarkers goodsList={goodsList} />
        <ZoomControl position='RIGHT' />
      </Map>
      <button
        onClick={handleResetSearch}
        className='absolute z-30 top-[340px] right-1 btn btn-primary text-white btn-sm md:btn-md'
      >
        검색 초기화
      </button>
      {isAuth && (
        <Link to='/posts/new'>
          <button className='absolute z-[45] p-3 text-white transition-colors duration-200 bg-black rounded-full bottom-5 right-5 md:p-4 md:bottom-8 md:right-8 hover:bg-neutral-700'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
            </svg>
          </button>
        </Link>
      )}
    </>
  );
}
