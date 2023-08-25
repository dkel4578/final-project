import React, { useEffect, useState } from 'react';

function MapComponent() {
    const [keyword, setKeyword] = useState(''); // 검색어 상태
    const [map, setMap] = useState(null); // Kakao Map 객체 상태
    const [places, setPlaces] = useState([]); // 장소 검색 결과 상태

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a56f0d80bc172162dfbd97d2c1042bea&autoload=false&libraries=services';

        script.onload = () => {
            window.kakao.maps.load(() => {
                const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울의 위도, 경도
                    level: 3,
                };
                const mapInstance = new window.kakao.maps.Map(document.getElementById('map'), options);
                setMap(mapInstance);

                // 이벤트 핸들러 등록
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

    // 검색어 변경 시 처리
    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    // 검색 버튼 클릭 시 처리
    const handleSearch = () => {
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
            });

            // 검색된 장소 위치를 기준으로 지도 범위 재설정
            map.setBounds(bounds);
        }
    };

    return (
        <div>
            <div style={{ width: '50px', height: '20px' }}>
                <input
                    type="text"
                    placeholder="장소를 검색하세요"
                    value={keyword}
                    onChange={handleKeywordChange}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
            <div>
                <h3>검색 결과</h3>
                <ul>
                    {places.map((place, index) => (
                        <li key={index}>{`${index + 1}. ${place.place_name}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MapComponent;
