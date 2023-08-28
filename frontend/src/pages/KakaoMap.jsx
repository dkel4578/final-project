import React, { useEffect, useState } from 'react';  // eslint-disable-line no-unused-vars
import { Map, Marker } from 'react-kakao-maps';
import "../css/KakaoMap.css";
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";
import "../css/variables.css";
import "../css/total.css";

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [rv, setRv] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState('');
  const searchFestival = (festivalName) => {
    // 실제 검색 로직 구현
    console.log(`Searching for ${festivalName}`);
  };

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.450701, 127.970667),
      level: 13,
    };
    const mapInstance = new kakao.maps.Map(container, options);
    setMap(mapInstance);

    const apiKey = '311487783261c149cf26700f7356690c';
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        const rvContainer = document.getElementById('roadview');
        const rvInstance = new kakao.maps.Roadview(rvContainer);
        setRv(rvInstance);


        kakao.maps.event.addListener(mapInstance, 'idle', function () {
          const center = mapInstance.getCenter();
          const rvClient = new kakao.maps.RoadviewClient();

          rvClient.getNearestPanoId(center, 50, function (panoId) {
            if (panoId) {
              rvInstance.setPanoId(panoId, center);
            } else {
              console.error('No panoId found for the given coordinates.');
            }
          });
        });

        kakao.maps.event.addListener(mapInstance, 'click', function (mouseEvent) {
          addMarker(mouseEvent.latLng);
        });

        searchFestival('기본_축제_이름'); // 실제 기본 축제 이름으로 교체하세요
        addMarker(new kakao.maps.LatLng(37.5665, 126.9780));
      }
    };
  }, []);

  const addMarker = (position) => {
    const marker = new kakao.maps.Marker({
      position: position,
    });

    marker.setMap(map);
    setMarkers([...markers, marker]);
  };

  const setAllMarkersMap = (map) => {
    markers.forEach((marker) => {
      marker.setMap(map);
    });
  };

  const hideMarkers = () => {
    markers.forEach((marker) => {
      if (marker.infowindow) {
        marker.infowindow.close();
      }
      marker.setMap(null);
    });
    setMarkers([]);
  };

  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert('장소를 입력해주세요');
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
  };

  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlaces(data);

      if (map) {
        markers.forEach((marker) => {
          marker.setMap(null);
        });

        const markerImage = new kakao.maps.MarkerImage(
          'https://cdn.discordapp.com/attachments/1135733712768729099/1144447321854193714/map-marker.png',
          new kakao.maps.Size(40, 40),
          { offset: new kakao.maps.Point(15, 15) }
        );

        data.forEach((place) => {
          const markerPosition = new kakao.maps.LatLng(place.y, place.x);

          const marker = new kakao.maps.Marker({
            position: markerPosition,
            map: map,
            title: place.place_name,
            image: markerImage,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `
              <div class="map-marker-name">【 ${place.place_name} 】</div>
              <div class="map-marker-address-name">위치:${place.address_name}</div>
              <div class="map-marker-phone">☎ : ${place.phone || '정보 없음'}</div>`,
          });

          let isInfowindowOpen = false;

          kakao.maps.event.addListener(marker, 'click', function () {
            if (isInfowindowOpen) {
              infowindow.close();
            } else {
              infowindow.open(map, marker);
            }
            isInfowindowOpen = !isInfowindowOpen;
          });

          marker.infowindow = infowindow;

          setMarkers((prevMarkers) => [...prevMarkers, marker]);
        });

        const firstResult = data[0];
        if (firstResult) {
          const newPosition = new kakao.maps.LatLng(firstResult.y, firstResult.x);
          map.panTo(newPosition);
        }
      }
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };


  return (
    <div className="App">
      <div className="map">
        <div className='please-wanna-search'>
          <Link to="/TouristAIP" className='map-back'>
          * 뒤로가기 *
          </Link>
        </div>
        <div id="myMap" style={{ width: '360px', height: '600px', borderRadius: '10px' }}>
          <div className='search-marker-hide-box'>
            <input
              type="text"
              placeholder="장소를 검색하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className='search-festival-input'
            />
            <button className='search_btn' onClick={searchPlaces}> 길찾기</button>
            <button className='marker-hide-btn' onClick={hideMarkers}>
              <svg width="25px" height="25px" viewBox="0 -64 640 640" xmlns="http://www.w3.org/2000/svg">
                <path d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z" />
              </svg>
            </button>
          </div>
          <div className="map_wrap">
            <ul id="placesList">
              {places.map((place, index) => (
                <li className='mapList-item' key={index}>
                  <div className='map_title'>【 {place.place_name} 】</div>
                  <div id="place-info">
                    <p id="place_address_name">위치 : {place.address_name}</p>
                    <p id="place_phone">☎ : {place.phone || '정보 없음'}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div id="roadview" style={{ width: '360px', height: '350px', position: 'relative' }}>
          로드뷰 열람중...
        </div>


      </div>
    </div>
  );
};

export default KakaoMap;