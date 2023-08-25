import React, { useEffect } from 'react';


function TouristMap() {
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.error('Kakao API key is missing.');
      return;
    }

    // Kakao 지도 API 스크립트 불러오기
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao 지도 API 초기화 및 사용
      if (window.kakao && window.kakao.maps) {
        const mapContainer = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        new window.kakao.maps.Map(mapContainer, options);
      }
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return (
    <div className="map_wrap">
      <div id="map" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>ASDSAD</div>
    </div>
  );
}

export default TouristMap;
