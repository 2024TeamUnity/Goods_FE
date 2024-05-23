import { MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { homeListState, searchResultState } from '../../store/atom';
import { IGoodsList } from '../../types/interface';

export default function ProductMarkers({ goodsList }: { goodsList: IGoodsList[] }) {
  const setListState = useSetRecoilState(homeListState);
  const searchList = useRecoilValue(searchResultState);

  const handleClusterClick = (_: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
    const markerList = cluster.getMarkers().map((item) => item.getPosition().getLat().toFixed(10));

    const res = goodsList?.filter((item) => {
      const pos = new kakao.maps.LatLng(item.lat, item.lng).getLat().toFixed(10);
      return markerList.findIndex((item) => item === pos) !== -1;
    });
    setListState(res!);
  };

  const handleMarkerClick = (pos: IGoodsList) => {
    setListState([pos]);
  };

  return (
    <MarkerClusterer
      averageCenter
      minLevel={2}
      minClusterSize={1}
      disableClickZoom
      onClusterclick={handleClusterClick}
      gridSize={100}
    >
      {Array.isArray(searchList) && searchList.length > 0
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
        : goodsList?.map((pos) => (
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
