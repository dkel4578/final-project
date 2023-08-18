import { useEffect } from 'react';

function MapComponent() {
    useEffect(() => {
        // 카카오 맵 SDK 스크립트 생성 및 로드
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=a56f0d80bc172162dfbd97d2c1042bea&autoload=false&libraries=services`;

        script.onload = () => {
            // 카카오 맵 SDK 로드 후 초기화
            window.kakao.maps.load(() => {
                const options = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울의 위도, 경도
                    level: 3,
                };
                const map = new window.kakao.maps.Map(document.getElementById('map'), options);

                // 이벤트 핸들러 등록
                window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                    const latlng = mouseEvent.latLng;
                    console.log("Clicked at", latlng.getLat(), latlng.getLng());
                });
            });
        };

        document.head.appendChild(script); // Load script in the head

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div id="map" style={{ width: '100%', height: '500px' }}></div>
    );
}

export default MapComponent;
