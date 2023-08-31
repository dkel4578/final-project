import React, { useState, useEffect } from "react";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import BoardPreview from './BoardPreview';
import { Link, useParams } from 'react-router-dom'; // useParams 추가
import '../css/index.css';
import '../css/total.css';
import '../css/board.css';
import '../css/variables.css';
import {useSelector} from "react-redux";
import BoardCategoryMenu from "./BoardCategoryMenu"; //에디터


function BoardListForm3() { // Receive the 'kind' prop
  const { kind } = useParams(); // kind 값을 추출
  const userInfo = useSelector((state) => state.user.user); //유저 정보
  console.log("userInfo:  =============> ",userInfo);


  let [boardList, setBoardList] = useState([]);
  const { ref, inView } = useInView();
  const [pageSize, setPageSize] = useState(2); // 페이지 크기
  const [noMoreData, setNoMoreData] = useState(false); // 새로운 상태 추가
  const [searchWord, setSearchWord] = useState(""); // 초기값을 설정

  // console.log("searchWord : ", searchWord);

  /*
  * 서버에 접속하여 게시글 정보 가져오기
  * 2023.8.16
  * */
  const fetchBoardList = async (lastBoardId, pageNumber, searchWord) => {
    console.log("lastBoardId: --->",lastBoardId);
    console.log("pageNumber: --->",pageNumber);
    try {
      if (noMoreData) {
        return; // 더 이상 데이터가 없을 때 요청하지 않도록 중지
      }

      if(searchWord){
        setPageSize(100);
      }else{
        setPageSize(2);
      }
      const response = await axios.post(`/api/boardss`, {
        lastBoardId: lastBoardId,
          size: pageSize,
          page: pageNumber,
          kind: kind, // Pass the 'kind' prop as a parameter
          searchWord: searchWord
      });
      const newBoardList = response.data;
      console.log("viewBoardList ============> ",response);

      if (newBoardList.length === 0) {
        setNoMoreData(true);
      } else {
         setBoardList((prevList) => [...prevList, ...newBoardList]);
      }
    } catch (error) {
      console.error('Error fetching board list:', error);
    }
  };

  //****************************************************
  //처음 카테고리로 접근할때 데이터 호출  kind: C-커피, F-한끼 등
  //****************************************************
  useEffect(() => {
    setBoardList([]); // 카테고리가 바뀌며 리스트를 초기화 한다.
    setNoMoreData(false);
    console.log("useEffect - kind:  =============> ",kind);
    fetchBoardList(99999, 0);
  }, [kind]);



  //****************************************************
  //무한 스크롤, 카테고리가 선택되고 나서 스크롤이 끝에 부딪치면 데이터가 존재하는한 계속 가져온다
  //****************************************************
  useEffect(() => {
    if (inView && boardList.length > 0) {
      // const lastBoardId = boardList[boardList.length - 1].id;
      const lastBoardId = 99999;
      const nextPage = Math.floor(boardList.length / pageSize);
      fetchBoardList(lastBoardId, nextPage);
    }
  }, [inView, boardList, noMoreData]);

  //****************************************************
  //검색 이벤트 호출 검색버튼 클릭(검색하기)
  //****************************************************
  const handleSearchButtonClick = () => {
    setBoardList([]); // 검색 결과 초기화
    setNoMoreData(false); // 더 이상 데이터가 없음을 초기화
    fetchBoardList(99999, 0, searchWord);
  };

  //****************************************************
  //검색 이벤트 호출 엔터(검색하기)
  //****************************************************
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };





  // console.log("inView: ",inView);
  // console.log("boardList.length: ",boardList.length);
  // console.log("noMoreData: ",noMoreData);


  return (
      <div className="body">
        <div className="board-inner">
          <section className="coffee-board">
            {/* ########################  보드 카테고리 메뉴 시작  ################################*/}
            <BoardCategoryMenu kind={kind} />
            {/* ########################  보드 카테고리 메뉴 끝  ################################*/}
            <div className="search-area">
              <div className="search">
                <input
                    name="searchWord"
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    onKeyPress={handleKeyPress} // Enter 키 입력 처리
                />
                {/*<button onClick={handleSearchButtonClick}>검색</button>*/}
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
              <div className="write-button">
                <a href="#none">
                  <Link to="/board/write">
                  <i className="fa fa-pencil-square-o"></i>
                  </Link>

                </a>
              </div>
            </div>
            <ul className="borad-main">
              <div>
                {boardList.map((boardInfo, index) => (
                    <div key={index}>
                      {/* kind 값에 따라 다른 게시판 뷰를 렌더링 */}
                      {kind === "Q" ? (
                        <BoardPreview boardInfo={boardInfo} kind={kind} />
                      ):(
                        <BoardPreview boardInfo={boardInfo} kind={kind} />
                      )
                      }
                    </div>
                ))}
              </div>
              {boardList.length > 0 && !noMoreData && searchWord==="" && <div ref={ref}></div>}
            </ul>
          </section>
        </div>
      </div>
  );
}


export default BoardListForm3;