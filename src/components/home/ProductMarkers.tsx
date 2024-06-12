import { MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { homeListState, searchResultState } from '../../store/atom';
import { IGoodsList } from '../../types/interface';

export default function ProductMarkers({ goodsList }: { goodsList: IGoodsList[] }) {
  const setListState = useSetRecoilState(homeListState);
  const searchList = useRecoilValue(searchResultState);

  const handleClusterClick = async (_: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
    const bounds = cluster.getBounds();
    const center = cluster.getCenter();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    const payload = {
      northEast: { lat: northEast.getLat(), lng: northEast.getLng() },
      southWest: { lat: southWest.getLat(), lng: southWest.getLng() },
      center: { lat: center.getLat(), lng: center.getLng() },
    };
    console.log(payload); // 백엔드에서 api 추가되면 전송
  };

  const handleMarkerClick = (pos: IGoodsList) => {
    setListState([pos]);

    const { lat, lng } = pos;
    console.log({ lat, lng });
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
