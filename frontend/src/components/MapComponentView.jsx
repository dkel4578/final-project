import React, { useEffect, useState } from 'react';

function MapComponent({ onAddressClick, latitude, longitude }) {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const mapAppKey = process.env.REACT_APP_API_MAP_KEY;

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${mapAppKey}&autoload=false&libraries=services`;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const options = {
                    center: new window.kakao.maps.LatLng(latitude, longitude), // 서울의 위도, 경도
                    level: 3,
                };
                const mapInstance = new window.kakao.maps.Map(document.getElementById('map'), options);
                setMap(mapInstance);


                // 마커가 표시될 위치입니다
                var markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

                // 마커를 생성합니다
                var marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(mapInstance);

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
    }, [latitude]);

    useEffect(() => {
        // 위도와 경도 값에 따라 마커를 표시하는 로직 추가
        displayMarker(latitude, longitude);
    }, [latitude, longitude]);

    // 마커 표시 함수
    const displayMarker = (latitude, longitude) => {
        console.log("latitude: ", latitude, longitude);
        console.log("map: ", map);
        if (map) {
            // 기존 마커가 있으면 제거
            if (marker) {
                marker.setMap(null);
            }

            // 새로운 마커 생성 및 추가
            const newMarker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(latitude, longitude),
                map: map,
            });

            // 새로운 마커를 중심으로 지도 이동
            map.panTo(new window.kakao.maps.LatLng(latitude, longitude));

            // 새로운 마커를 설정
            setMarker(newMarker);
        }
    };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
        </div>
    );
}

export default MapComponent;
