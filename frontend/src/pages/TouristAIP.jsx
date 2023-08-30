import React, { useState, useEffect } from 'react';
import "../css/TouristAIP.css";
import { Link } from 'react-router-dom';

function TouristAIP() {
  const apiKey = 'cd70725d-65dc-455f-b196-057b81c3b35e';
  const apiUrl = 'http://api.kcisa.kr/openapi/service/rest/convergence2019/getConver01';
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState('관광지');


  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}?serviceKey=${apiKey}&numOfRows=1000&pageNo=1&keyword=${keyword}`);
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
        source: item.querySelector('source').textContent,
        description: item.querySelector('description').textContent.replace(/<br>|ㅇ/g, ''),
      }));

      setItems(jsonData);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (index) => {
    setExpandedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    
  };
  

  return (
    <div className='map_api_content'>
      <div className='search_container'>
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          className='enter-search'
        />
        <button className='search-btn' onClick={handleSearch}>검색</button>
      </div>
      <div className='map_api_items'>
        {items.map((item, index) => (
          item.referenceIdentifier && item.spatial.trim() !== '' && item.description.trim() !== '' && (
            <div className='map_api_item' key={index}>
              <div className='map_api_no'>●ㅤ ●ㅤ ● ㅤ● ㅤ● ㅤ● ㅤ● ㅤ● ㅤ● ㅤ● ㅤ● ㅤ●   </div>
              <img className='img_List' src={item.referenceIdentifier} alt="썸네일 이미지" />
              <div className='map_api_title'>――― {item.title} ―――</div>
             
              {item.alternativeTitle && <li>Eng_Name : {item.alternativeTitle}</li>}
            
              <div className='map_api_address'>주소: {item.spatial}</div>
              {item.source && <li>싸이트: <a href={item.source} target="_blank" rel="noopener noreferrer">{item.source}</a></li>}

              <div className='map_api_see_more-btns'>
                <button onClick={() => toggleExpand(index)} className='map_api_see_more'>
                  {expandedItems[index] ? '숨기기' : '내용 보기'}
                </button>
              <button className='map_api_see_more'>
              <Link to="/kakaomap">지도</Link>
              </button>

                
              </div>
              {expandedItems[index] && (
                <div className='map_api_description'>{item.description}</div>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default TouristAIP;