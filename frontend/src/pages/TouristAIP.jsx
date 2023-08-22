import React, { useState, useEffect } from 'react';
import "../css/TouristAIP.css";
function Map_Api() {
  const apiKey = 'cd70725d-65dc-455f-b196-057b81c3b35e';
  const apiUrl = 'http://api.kcisa.kr/openapi/service/rest/convergence2019/getConver01';
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState('관광지'); // 초기 검색어를 빈 문자열로 설정

  const handleSearch = () => {
    fetchData(); // 검색 버튼 클릭 시 데이터 가져오도록 변경
  };

  useEffect(() => {
    fetchData(); // 초기 로딩 시 데이터 불러오기
  }, []); // 빈 배열을 전달하여 한 번만 호출되도록 설정


  
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}?serviceKey=${apiKey}&numOfRows=300&pageNo=1&keyword=${keyword}`);
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const itemsArray = Array.from(xmlDoc.querySelectorAll('item'));

      const jsonData = itemsArray.map(item => ({
        
        rn: item.querySelector('rnum').textContent,
        creator: item.querySelector('creator').textContent,
        collectionDb: item.querySelector('collectionDb').textContent,
        title: item.querySelector('title').textContent,
        alternativeTitle: item.querySelector('alternativeTitle').textContent,
        subjectCategory: item.querySelector('subjectCategory').textContent,
        reference: item.querySelector('reference').textContent,
        referenceIdentifier: item.querySelector('referenceIdentifier').textContent,
        spatial: item.querySelector('spatial').textContent,
        period: item.querySelector('period').textContent,
        // description: item.querySelector('description').textContent, //내용 더러워서뺌
    
      

    
      }));

      setItems(jsonData);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <div className='map_api_content'>
      <h1>관광지 API 불러오기</h1>
      <div className='search_container'>
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          className='enter-search'
        />
        <button className='search-btn' onClick={handleSearch}>검색</button>
      </div>
      <div className='map_api_items'> {/* 여기서 <ul> 태그 대신 <div> 태그로 변경 */}
        {items.map
        ((item, index) => (
          item.referenceIdentifier && item.spatial.trim() !== '' && (
            <div className='map_api_item' key={index}> {/* 여기서 <ul> 태그 대신 <div> 태그로 변경 */}
              <div className='map_api_no'>―――――― List {item.rn} ――――――</div>
              <img className='img_List' src={item.referenceIdentifier} alt="썸네일 이미지" />
              <div className='map_api_title'>{item.title}</div>
              {/* {item.creator && <li>주된 책임을 진 개체: {item.creator}</li>} */}
              {/* {item.collectionDb && <li>소속(통제) DB: {item.collectionDb}</li>} */}
              {/* {item.alternativeTitle && <li>대체 제목: {item.alternativeTitle}</li>} */}
              {/* {item.subjectCategory && <li>기관별 주제 분류 체계: {item.subjectCategory}</li>} */}
              <div className='map_api_address'>주소: {item.spatial}</div>
              {/* <div>내용:{item.description}</div>
               */}
            </div>
          )
        ))}
      </div>
    </div>
  );
  
}

export default Map_Api;
