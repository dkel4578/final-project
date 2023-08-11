import { useState, useEffect } from "react";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import BoardPreview from './BoardPreview';
import PropTypes from 'prop-types'; // prop-types 라이브러리 import
import '../css/index.css';
import '../css/total.css';
import '../css/board.css';
import '../css/variables.css';

function BoardListForm3({ kind }) { // Receive the 'kind' prop

console.log("kind:  =============> ",kind);

  BoardListForm3.propTypes = {
    kind: PropTypes.oneOf(['N', 'Q', 'F', 'C', 'A', 'T']).isRequired, // enum 유형으로 설정
  };


  const [boardList, setBoardList] = useState([]);
  const { ref, inView } = useInView();
  const pageSize = 2;
  const [noMoreData, setNoMoreData] = useState(false); // 새로운 상태 추가

  const fetchBoardList = async (lastBoardId, pageNumber) => {
    try {
      if (noMoreData) {
        return; // 더 이상 데이터가 없을 때 요청하지 않도록 중지
      }
      const response = await axios.get(`/api/boardss`, {
        params: {
          lastBoardId,
          size: pageSize,
          page: pageNumber,
          kind: kind, // Pass the 'kind' prop as a parameter
        },
      });
      const newBoardList = response.data;
      console.log("newBoardList ============>>>>>>>>>> ",response);
      if (newBoardList.length === 0) {
        setNoMoreData(true);
      } else {
        setBoardList((prevList) => [...prevList, ...newBoardList]);
      }
    } catch (error) {
      console.error('Error fetching board list:', error);
    }
  };

  useEffect(() => {
    fetchBoardList(99999, 0);
  }, []);

  useEffect(() => {
    if (inView && boardList.length > 0) {
      const lastBoardId = boardList[boardList.length - 1].id;
      const nextPage = Math.floor(boardList.length / pageSize);
      fetchBoardList(lastBoardId, nextPage);
    }
  }, [inView, boardList, noMoreData]);

  return (
      <div className="body">
        <div className="header-inner">
          <section className="coffee-board">
            <div className="board-kind">
              <a href="board-coffee.html" className="active">
                커피한잔할래요
              </a>
              <a href="#none">같이여행갈래요</a>
              <a href="#none">같이식사할래요</a>
              <a href="#none">술한잔할래요</a>
            </div>
            <div className="search-area">
              <div className="search">
                <input type="text" placeholder="검색어를 입력해주세요" />
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
              <div className="write-button">
                <a href="#none">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <ul className="borad-main">
              <div>
                {boardList.map((boardInfo, index) => (
                    <div key={index}>
                      <BoardPreview boardInfo={boardInfo} />
                    </div>
                ))}
              </div>
              {boardList.length > 0 && !noMoreData && <div ref={ref}></div>}
            </ul>
          </section>
        </div>
      </div>
  );
}

export default BoardListForm3;
