import { useEffect, useState } from 'react';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';
import MyLocationMarker from './MyLocationMarker';
import { IMyLocation } from '../../types/interface';
import ProductMarkers from './ProductMarkers';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
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
import useBottomSheet from '../../util/useBottomSheet';
import LoadingSpinner from '../common/LoadingSpinner';
import { useNearbyGoodsList, useNearbyGoodsPage } from '../../service/map/useNearbyGoods';
import { useMemoHistory } from '../../util/useMemoHistory';

export default function HomeMap() {
  const [state, setState] = useState<IMyLocation>({
    center: {
      lat: 0,
      lng: 0,
    },
    errMsg: null,
    isLoading: true,
  });
  const setSearchList = useSetRecoilState(searchResultState);
  const setHomeList = useSetRecoilState(homeListState);
  const resetHomeList = useResetRecoilState(homeListState);
  const [goodsList, setGoodsList] = useRecoilState(goodsListState);
  const isAuth = useRecoilValue(isAuthState);
  const keyword = useRecoilValue(searchAddrState);
  const { isOpen } = useBottomSheet();

  const [currentPos, setCurrentPos] = useState({
    lat: 0,
    lng: 0,
  });
  const {
    refetch,
    hasNextPage: dragHasNext,
    fetchNextPage: dragFetchNext,
  } = useNearbyGoodsPage(
    {
      lat: currentPos.lat,
      lng: currentPos.lng,
    },
    false,
  );
  const { page, hasNextPage, fetchNextPage } = useNearbyGoodsPage(state.center, true);
  const { listData, isLoading } = useNearbyGoodsList(state.center);
  const pageData = useMemoHistory(page!);

  useEffect(() => {
    if (pageData) {
      setHomeList({
        data: pageData!,
        hasNext: hasNextPage,
        loadMore: fetchNextPage,
      });
      setGoodsList(listData!);
    }
  }, [pageData, setHomeList, setGoodsList, listData, fetchNextPage, hasNextPage]);

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
    resetHomeList();
  };

  useEffect(() => {
    (async () => {
      if (Object.values(currentPos).every((item) => item !== 0)) {
        const res = (await refetch()).data;
        const currentPostData = res?.pages.reduce((acc, cur) => [...acc, ...cur], []);
        setHomeList({
          data: currentPostData!,
          hasNext: dragHasNext,
          loadMore: dragFetchNext,
        });
      }
    })();
  }, [currentPos, refetch, setHomeList, dragFetchNext, dragHasNext]);

  const handleMapDrag = async (map: kakao.maps.Map) => {
    const latlng = map.getCenter();

    const newListData = (
      await axios.get('/api/api/goods', {
        params: { lat: latlng.getLat(), lng: latlng.getLng(), responseType: 'list' },
      })
    ).data;
    setCurrentPos({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });
    setGoodsList(newListData);
  };

  const debounceHandleMapDrag = debounce(handleMapDrag, 300);

  if (isLoading) return <LoadingSpinner />;
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
          <button
            className={`absolute p-3 text-white transition-colors duration-200 bg-black rounded-full bottom-5 right-5 md:p-4 md:bottom-8 md:right-8 hover:bg-neutral-700 ${
              isOpen ? 'z-[101]' : 'z-30'
            }`}
          >
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
