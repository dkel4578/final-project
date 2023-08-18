// import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "../css/masterPage.css";

const AdminPage = () => {

  const [manageName, setManageName] = useState("유저 관리 페이지");
  const [manageType, setManageType] = useState("user");


  const [userList, setUserList] = useState([]);
  const [reportedUserList, setReportedUserList] = useState([]);
  const [bannedUserList, setBannedUserList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  
  useEffect(() => {    
    axios.get("/api/admin/userList")
    .then(response => {
      console.log(response.data);
      setUserList(response.data);
    });    
    axios.get("api/admin/reportedUserList")
    .then(response => {
      console.log(response.data);
      setReportedUserList(response.data);
    });    
    axios.get("api/admin/bannedUserList")
    .then(response => {
      console.log(response.data);
      setBannedUserList(response.data);
    });    
    axios.get("/api/admin/boardList")
    .then(response => {
      console.log(response.data);
      setBoardList(response.data);
    });    
  }, []);

  const goToManageUsers = () => {
    setManageName("유저 관리 페이지");
    setManageType("user");
  };

  // 활동 정지 버튼만 눌리게 설정
  const goToReportedUsers = () => {
    setManageName("신고 된 유저 관리 페이지");
    setManageType("report");
  };

  // 관리자 버튼만 눌리게 설정
  const goToSuspendedUsers = () => {
    setManageName("활동 정지 된 유저 관리 페이지");
    setManageType("ban");
  }
  // 유저 게시판만 눌리게 설정
  const goToUserBoard = () => {
    setManageName("게시판 관리 페이지");
    setManageType("board");
  };

  //모달창
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const handleSuspendButtonClick = () => {
    // "정지" 버튼을 클릭했을 때 팝업을 열도록 설정
    setShowSuspendModal(true);
  };

  const handleSuspendModalClose = () => {
    // 팝업을 닫을 때 호출되는 함수
    setShowSuspendModal(false);
  };
  
  

  return (
    <div className="board_wrap">
      <div className="board_title">
        <strong>관리자</strong>
        <p>{manageName}</p>
        <button className="ReportedUser" onClick={goToManageUsers}>
          전체 유저
        </button>
        <button className="SuspendedUser" onClick={goToReportedUsers}>
          신고된 유저
        </button>
        <button className="ManageUsers" onClick={goToSuspendedUsers}>
          활동 정지 유저
        </button>
        <button className="UserBoard" onClick={goToUserBoard}>
          게시판 관리
        </button>
        <div className="master-select-search">
          <div className="master-search">
            <input type="text" placeholder="검색어를 입력하세요" className="master-search-box"></input>
            <button className="master-search-btn">검색</button>
          </div>
          <div className="master-select-box">
            <span className="master-select-box-span">카테고리:</span>
            { manageType ==="user" &&
              <select className="master-select-options">
                <option value="">전체</option>
                <option value="">신고된 유저</option>
                <option value="">활동정지 유저</option>
                <option value="">관리대상자 유저</option>
                <option value="">유저 게시판</option>
              </select>
            }
            { manageType ==="report" &&
              <select className="master-select-options">
                <option value="">전체</option>
                <option value="">신고된 유저</option>
                <option value="">활동정지 유저</option>
                <option value="">관리대상자 유저</option>
                <option value="">유저 게시판</option>
              </select>
            }
            { manageType ==="ban" &&
              <select className="master-select-options">
                <option value="">전체</option>
                <option value="">신고된 유저</option>
                <option value="">활동정지 유저</option>
                <option value="">관리대상자 유저</option>
                <option value="">유저 게시판</option>
              </select>
            }
            { manageType ==="board" &&
              <select className="master-select-options">
                <option value="">전체</option>
                <option value="">1 게시판</option>
                <option value="">2 게시판</option>
                <option value="">3 게시판</option>
                <option value="">유저 게시판</option>
              </select>
            }
          </div>
        </div>
      </div>

      <div>
      </div>
      <div className="board_list_wrap">
        <div className="board_list">
          {manageType === "user" &&
            <ul className="top">
              <li className="tab-menu">ID</li>
              <li className="tab-menu">이름</li>
              <li className="tab-menu">닉네임</li>
              <li className="tab-menu">성별</li>
              <li className="tab-menu">전화번호</li>
              <li className="tab-menu">이메일</li>
              <li className="tab-menu">생년월일</li>
              <li className="tab-menu">정지 여부</li>
              <li className="tab-menu">신고버튼</li>
            </ul>
          }
          {/* 위에boardData 데이터 삽입 and filter이용해서 버튼검색 나눔 */}
          {manageType === "user" &&
            userList.filter(item => item.status ==="U").map((item) => (
              <ul key={item.id} className="master-list">
                <li className="master-list-item">
                  {item.loginId}
                </li>
                <li className="master-list-item">
                  {item.name}
                </li>
                <li className="master-list-item">
                  {/* <a href={`view.html?id=${item.Username}`}>{item.Username}</a> */}
                  {item.nickname}
                </li>
                {item.gender === "M" &&
                  <li className="master-list-item">남성</li>
                }
                {item.gender === "F" &&
                  <li className="master-list-item">여성</li>
                }
                
                <li className="master-list-item">
                  {item.phone}
                </li>
                <li className="master-list-item">
                  {item.email}
                </li>
                <li className="master-list-item">
                  {item.birth}
                </li>
                {item.bannedYn === "Y" &&
                  <li className="master-list-item">정지됨</li>
                }
                {item.bannedYn === "N" &&
                  <li className="master-list-item">정상</li>
                }
                <li className="master-list-item master-btns">
                  <button className="SuspendButton" onClick={handleSuspendButtonClick}>정지</button>
                  <button className="UnsuspendButton">정지 해제</button>
                </li>
              </ul>
            ))}


          {manageType === "report" &&
            <ul className="top">
            <li className="tab-menu">신고된 유저</li>
            <li className="tab-menu">신고 한 유저</li>
            <li className="tab-menu">신고 유형</li>
            <li className="tab-menu">신고 처리 여부</li>
            <li className="tab-menu">유형</li>
            <li className="tab-menu">신고 위치</li>
            <li className="tab-menu">신고버튼</li>
          </ul>
        }
        {/* 위에boardData 데이터 삽입 and filter이용해서 버튼검색 나눔 */}
        {/* filter(item => item.status ==="U"). */}
        {manageType === "report" &&
          reportedUserList.map((item) => (
            <ul key={item.id} className="master-list">
              <li className="master-list-item">
                {item.reportedUserNickName}
              </li>
              <li className="master-list-item">
                {item.reporterNickName}
              </li>
              <li className="master-list-item">
                {item.reportType}
              </li>  
              <li className="master-list-item">
                {item.reportStatus}
              </li>
              <li className="master-list-item">
                {item.category}
              </li>
              <li className="master-list-item">
                {item.contentId}
              </li>
              {item.bannedYn === "Y" &&
                <li className="master-list-item">정지됨</li>
              }
              {item.bannedYn === "N" &&
                <li className="master-list-item">정상</li>
              }
              <li className="master-list-item master-btns">
                <button className="SuspendButton" onClick={handleSuspendButtonClick}>정지</button>
                <button className="UnsuspendButton">정지 해제</button>
              </li>
            </ul>
          ))}

          {manageType === "ban" &&
            <ul className="top">
              <li className="tab-menu">ID</li>
              <li className="tab-menu">이름</li>
              <li className="tab-menu">닉네임</li>
              <li className="tab-menu">정지 사유</li>
              <li className="tab-menu">시작일</li>
              <li className="tab-menu">종료일</li>
            <li className="tab-menu">신고버튼</li>
            </ul>
          }
          {/* 위에boardData 데이터 삽입 and filter이용해서 버튼검색 나눔 */}
          {manageType === "ban" &&
            bannedUserList.filter(item => item.bannedYn ==="Y").map((item) => (
              <ul key={item.id} className="master-list">
                <li className="master-list-item">
                  {item.loginId}
                </li>
                <li className="master-list-item">
                  {item.name}
                </li>
                <li className="master-list-item">
                  {item.nickName}
                </li>
                <li className="master-list-item">
                  {item.banReason}
                </li>
                <li className="master-list-item">
                  {item.banStartAt}
                </li>
                <li className="master-list-item">
                  {item.banEndAt}
                </li>
                <li className="master-list-item master-btns">
                  <button className="SuspendButton" onClick={handleSuspendButtonClick}>정지</button>
                  <button className="UnsuspendButton">정지 해제</button>
                </li>
              </ul>
            ))}

          {manageType === "board" &&
            <ul className="top">
            <li className="tab-menu">게시판 종류</li>
            <li className="tab-menu">제목</li>
            <li className="tab-menu">작성자</li>
            <li className="tab-menu">작성일</li>
            <li className="tab-menu">조회수</li>
            <li className="tab-menu">삭제버튼</li>
          </ul>
        }
        {/* 위에boardData 데이터 삽입 and filter이용해서 버튼검색 나눔 */}
        {manageType === "board" &&
          boardList.filter(item => item.delYn ==="N").map((item) => (
            <ul key={item.id} className="master-list">
              <li className="master-list-item">
                {item.kind}
              </li>
              <li className="master-list-item">
                {item.title}
              </li>
              <li className="master-list-item">
                {item.userNickName}
              </li>
              <li className="master-list-item">
                {item.createAt}
              </li>
              <li className="master-list-item">
                {item.cnt}
              </li>
              <li className="master-list-item master-btns">
                <button className="SuspendButton" onClick={handleSuspendButtonClick}>정지</button>
                <button className="UnsuspendButton">정지 해제</button>
              </li>
            </ul>
          ))}

        </div>
        {showSuspendModal && (
          <div className="popup_overlay active">
            <div className="popup_content">
              <div className="popup_conten">
                <h2 className="stop">정지</h2>
                <div className="daySuspension">
                  <div className="input-stop-box">
                    <input className="inputNumber" type="number" />
                    <span>일 정지</span>
                  </div>
                  <div className="bottomSection">
                    <button
                      className="modalButton1 modalButton"
                      onClick={handleSuspendButtonClick}
                    >
                      정지
                    </button>
                    <button
                      className="modalButton2 modalButton"
                      onClick={handleSuspendModalClose}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="board_page">{/* 페이징 버튼 등 추가 */}</div>
        <div className="bt_wrap">
          <a href="/BoardList2.jsx" className="on">
            등록
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
