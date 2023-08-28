import React, { useEffect, useState } from 'react';
import '../css/map-search.css';

function MapComponent({ onAddressClick }) {
    // 상태 변수들
    const [keyword, setKeyword] = useState('');
    const [map, setMap] = useState(null);
    const [places, setPlaces] = useState([]);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [infowindows, setInfowindows] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(''); // 선택한 주소 상태 변수 추가

    const mapAppKey = process.env.REACT_APP_API_MAP_KEY;


    // Kakao 지도 초기화
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${mapAppKey}&autoload=false&libraries=services`;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울의 위도, 경도
                    level: 3,
                };
                const mapInstance = new window.kakao.maps.Map(document.getElementById('map'), options);
                setMap(mapInstance);

                // 지도 클릭 이벤트 핸들러 등록
                window.kakao.maps.event.addListener(mapInstance, 'click', function (mouseEvent) {
                    const latlng = mouseEvent.latLng;
                    console.log("Clicked at", latlng.getLat(), latlng.getLng());
                });
            });
        };

        document.head.appendChild(script);

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거
            document.head.removeChild(script);
        };
    }, []);

    // 검색어 변경 핸들러
    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    // 검색 버튼 클릭 핸들러
    const handleSearch = (e) => {
        e.preventDefault(); // 폼 제출 방지

        if (map && keyword) {
            // 검색 API 호출 및 결과 처리
            const ps = new window.kakao.maps.services.Places();
            ps.keywordSearch(keyword, function (data, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                    // 검색 결과 목록과 마커 표시
                    setPlaces(data);
                    displayPlaces(data);
                } else {
                    alert('검색 결과가 없습니다.');
                }
            });
        }
    };

    // 검색 결과 목록과 마커 표시 함수
    const displayPlaces = (places) => {
        if (map) {
            const bounds = new window.kakao.maps.LatLngBounds();

            // 이전 마커와 인포윈도우 제거
            markers.forEach((marker) => {
                marker.setMap(null);
            });
            infowindows.forEach((infowindow) => {
                infowindow.close();
            });

            // 새로운 마커와 인포윈도우 생성 및 배열에 추가
            const newMarkers = [];
            const newInfowindows = [];

            places.forEach((place, index) => {
                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(place.y, place.x),
                    map: map,
                });

                // 인포윈도우 생성
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div>${index + 1}. ${place.place_name}</div>`,
                });

                // 마커 클릭 시 인포윈도우 표시
                window.kakao.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });

                bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));

                newMarkers.push(marker);
                newInfowindows.push(infowindow);
            });

            // 새로운 마커와 인포윈도우 배열로 업데이트
            setMarkers(newMarkers);
            setInfowindows(newInfowindows);

            // 검색된 장소 위치를 기준으로 지도 범위 재설정
            map.setBounds(bounds);
        }
    };

    // 리스트 아이템 클릭 핸들러
    const handleListItemClick = (index) => {
        const selectedPlace = places[index];
        const roadAddress = selectedPlace.road_address_name;
        setSelectedAddress(roadAddress); // 선택한 주소를 상태 변수에 저장

        // 호출한 콜백 함수를 사용하여 선택한 주소를 부모 컴포넌트로 전달
        onAddressClick(roadAddress);


        // 선택한 마커만 표시하고 나머지는 숨김
        markers.forEach((marker, i) => {
            if (i === index) {
                marker.setMap(map);
                infowindows[i].open(map, marker);
            } else {
                marker.setMap(null);
                infowindows[i].close();
            }
        });

        // 선택한 마커 인덱스 업데이트
        setSelectedMarkerIndex(index);
    };

    return (
        <div>
            <div className= "map-search-box">
                <input
                    type="text"
                    placeholder="장소를 검색하세요"
                    value={keyword}
                    onChange={handleKeywordChange}
                    className= "map-search-input"
                />
                <button onClick={handleSearch} className= "map-search-btn">검색</button>
            </div>
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
            <div>
                <h3>검색 결과</h3>
                <ul>
                    {places.map((place, index) => (
                        <li key={index} onClick={() => handleListItemClick(index)} className= "map-search-list">
                            {`${index + 1}. ${place.place_name} `}
                            {/*{`${place.road_address_name}`}*/}
                            {/*{Object.keys(place).map((key) => (*/}
                            {/*    <div key={key}>*/}
                            {/*        <strong>{key}:</strong> {place[key]}*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MapComponent;
