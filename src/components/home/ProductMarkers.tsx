import { MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { homeListState, searchResultState } from '../../store/atom';
import { IGoodsList } from '../../types/interface';
import useBottomSheet from '../../util/useBottomSheet';
import { useEffect, useState } from 'react';
import { useClusterInfoQuery } from '../../service/map/useClusterInfoQuery';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProductMarkers({
  goodsList,
  isLoading,
}: {
  goodsList: IGoodsList[];
  isLoading: boolean;
}) {
  const setListState = useSetRecoilState(homeListState);
  const searchList = useRecoilValue(searchResultState);
  const { setIsOpen } = useBottomSheet();
  const [payload, setPayload] = useState({
    base_lat: 0,
    base_lng: 0,
    ne_lat: 0,
    ne_lng: 0,
    sw_lat: 0,
    sw_lng: 0,
    quantity: 0,
  });

  const { refetch, hasNextPage, fetchNextPage } = useClusterInfoQuery(payload);

  const handleClusterClick = async (_: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
    const bounds = cluster.getBounds();
    const center = cluster.getCenter();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    const newPayload = {
      base_lat: center.getLat(),
      base_lng: center.getLng(),
      ne_lat: northEast.getLat(),
      ne_lng: northEast.getLng(),
      sw_lat: southWest.getLat(),
      sw_lng: southWest.getLng(),
      quantity: cluster.getSize(),
    };
    setPayload(newPayload);
    setIsOpen(true);
  };

  useEffect(() => {
    (async () => {
      if (Object.values(payload).every((item) => item !== 0)) {
        const res = (await refetch()).data;
        const clusterInfo = res?.pages.reduce((acc, cur) => [...acc, ...cur], []);
        setListState({
          data: clusterInfo!,
          hasNext: hasNextPage,
          loadMore: fetchNextPage,
        });
      }
    })();
  }, [payload, refetch, setListState, fetchNextPage, hasNextPage]);

  const handleMarkerClick = (pos: IGoodsList) => {
    // setListState([pos]);

    const { lat, lng } = pos;
    console.log({ lat, lng });
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <MarkerClusterer
      averageCenter
      minLevel={2}
      minClusterSize={1}
      disableClickZoom
      onClusterclick={handleClusterClick}
      gridSize={100}
    >
      {searchList.length > 0
        ? searchList.map((item) => (
            <MapMarker
              // eslint-disable-next-line react/no-array-index-key
              key={`${item.goods_id}`}
              position={{
                lat: item.lat,
                lng: item.lng,
              }}
              onClick={() => handleMarkerClick(item)}
            />
          ))
        : Array.isArray(goodsList) &&
          goodsList.map((pos) => (
            <MapMarker
              key={`${pos.goods_id}_${pos.thumbnail_url}_${pos.trade_spot}`}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
              onClick={() => handleMarkerClick(pos)}
            />
          ))}
    </MarkerClusterer>
  );
}
