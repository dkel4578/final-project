// import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Select from "react-select";
import "../css/masterPage.css";

const AdminPage = () => {

  const userOption = [
    {value : "", label : "선택해 주세요"},
    {value : "banned", label : "정지된 사용자"},
    {value : "notBanned", label : "일반 사용자"},
    {value : "M", label : "남성"},
    {value : "F", label : "여성"}
  ];
  const userSearchOption = [
    {value : "", label : "선택해 주세요"},
    {value : "id", label : "아이디"},
    {value : "nickname", label : "닉네임"},
    {value : "phone", label : "전화번호"},
    {value : "email", label : "이메일"}
  ];

  const reportOption = [
    {value : "", label : "선택해 주세요"},
    {value : "notBanned", label : "신고처리 전"},
    {value : "banned", label : "신고처리 완료"},
    {value : "deleted", label : "신고 삭제"},
    {value : "board", label : "게시판"},
    {value : "chat", label : "채팅"},
    {value : "comment", label : "댓글"}
  ];
  const reportSearchOption = [
    {value : "", label : "선택해 주세요"},
    {value : "reporter", label : "신고 한 유저"},
    {value : "reported", label : "신고 된 유저"}
  ];

  const bannedOption = [
    {value : "", label : "선택해 주세요"},
    {value : "D", label : "게시글/댓글 도배"},
    {value : "P", label : "음란성 게시글/댓글 작성"},
    {value : "F", label : "욕설/혐오 발언 게시글/댓글 작성"},
    {value : "A", label : "광고성 게시글/댓글 작성"},
    {value : "R", label : "허위 리뷰 작성"}
  ];

  const banSearchOption = [
    {value : "", label : "선택해 주세요"},
    {value : "loginId", label : "아이디"},
    {value : "name", label : "이름"},
    {value : "nickName", label : "닉네임"}
  ];

  const boardOption = [
    {value : "", label : "선택해 주세요"},
    {value : "N", label : "공지사항"},
    {value : "Q", label : "FAQ"},
    {value : "F", label : "같이 한 끼"},
    {value : "C", label : "같이 커피"},
    {value : "A", label : "같이 한 잔"},
    {value : "T", label : "같이 여행"}
  ];
  const boardSearchOption = [
    {value : "", label : "선택해 주세요"},
    {value : "title", label : "제목"},
    {value : "userNickName", label : "작성자"}
  ];

  const [manageName, setManageName] = useState("유저 관리 페이지");
  const [manageType, setManageType] = useState("user");


  const [userList, setUserList] = useState([]);
  const [reportedUserList, setReportedUserList] = useState([]);
  const [bannedUserList, setBannedUserList] = useState([]);
  const [boardList, setBoardList] = useState([]);

  const [search,setSearch] = useState("");
  const [keyword,setKeyword] = useState(userOption[0].value);
  const [searchKeyword,setSearchKeyword] = useState(userOption[0].value);


  
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
    setKeyword(userOption[0].value);
    setSearch("");
  };

  // 활동 정지 버튼만 눌리게 설정
  const goToReportedUsers = () => {
    setManageName("신고 된 유저 관리 페이지");
    setManageType("report");
    setKeyword(userOption[0].value);
    setSearch("");
  };

  // 관리자 버튼만 눌리게 설정
  const goToSuspendedUsers = () => {
    setManageName("활동 정지 된 유저 관리 페이지");
    setManageType("ban");
    setKeyword(userOption[0].value);
    setSearch("");
  }
  // 유저 게시판만 눌리게 설정
  const goToUserBoard = () => {
    setManageName("게시판 관리 페이지");
    setManageType("board");
    setKeyword(userOption[0].value);
    setSearch("");
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
  
  const filterUserList = (item) => {
    if (manageType === "user") {
      return (
        (item.status !== "S") &&
        (search === "" || 
        (
          searchKeyword === "" ?
          true:
            searchKeyword === "id" 
            ? item.loginId.includes(search)
          : searchKeyword === "nickname"
          ? item.nickname.includes(search)
          : searchKeyword === "phone"
          ? item.phone.includes(search)
          : searchKeyword === "email"
          ? item.email.includes(search)
          : false)
        ) &&
        (keyword === "" ?
        true :
          keyword === "banned"
          ? item.bannedYn.includes("Y")
          : keyword === "notBanned"
          ? item.bannedYn.includes("N")
          : keyword === "M"
          ? item.gender.includes("M")
          : keyword === "F"
          ? item.gender.includes("F")
          : false)
      );
    } else {
      return false;
    }
  };
  const filterReportList = (item) => {
    if (manageType === "report") {
      return (
        (search === "" || 
        (item.reportedUserNickName && 
          searchKeyword === "" ?
          true:
            searchKeyword === "reported" 
            ? item.reportedUserNickName.includes(search)
          : searchKeyword === "reporter"
          ? item.reporterNickName.includes(search)
          : false)
        ) &&
        (keyword === "" ?
        true :
          keyword === "banned"
          ? item.reportStatusKeyword.includes("C")
          : keyword === "notBanned"
          ? item.reportStatusKeyword.includes("B")
          : keyword === "deleted"
          ? item.reportStatusKeyword.includes("D")
          : keyword === "board"
          ? item.categoryKeyword.includes("B")
          : keyword === "chat"
          ? item.categoryKeyword.includes("C")
          : keyword === "comment"
          ? item.categoryKeyword.includes("D")
          : false)
      );
    } else {
      return false;
    }
  };

  const filterBanList = (item) => {
    if (manageType === "ban") {
      return (
        (item.bannedYn === "Y") &&
        (search === "" || 
        (
          searchKeyword === "" ?
          true:
            searchKeyword === "loginId" 
            ? item.loginId.includes(search)
            : searchKeyword === "name"
            ? item.name.includes(search)
            : searchKeyword === "nickName"
            ? item.nickName.includes(search)
            : false)
        ) &&
        (keyword === "" ?
        true :
          keyword === "banned"
          ? item.bannedYn.includes("Y")
          : keyword === "notBanned"
          ? item.bannedYn.includes("N")
          : false)
      );
    } else {
      return false;
    }
  };
  const filterBoardList = (item) => {
    if (manageType === "board") {
      return (
        (item.delYn ==="N") &&
        (search === "" || 
        (
          searchKeyword === "" ?
          true:
            searchKeyword === "title" 
            ? item.title.includes(search)
            : searchKeyword === "userNickName"
            ? item.userNickName.includes(search)
            : false)
        ) &&
        (keyword === ""?
        true :
          keyword === "N"
          ? item.boardKind.includes("N")
          : keyword === "Q"
          ? item.boardKind.includes("Q")
          : keyword === "F"
          ? item.boardKind.includes("F")
          : keyword === "C"
          ? item.boardKind.includes("C")
          : keyword === "A"
          ? item.boardKind.includes("A")
          : keyword === "T"
          ? item.boardKind.includes("T")
          : false)
      );
    } else {
      return false;
    }
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
            { manageType ==="user" &&
              <Select className="master-select-options"
              options={userSearchOption}
              onChange={(e)=>{setSearchKeyword(e.value);}}
              placeholder="유형 선택"
              defaultValue={userOption[0]}/>
            }
            { manageType ==="report" &&
              <Select className="master-select-options"
              options={reportSearchOption}
              onChange={(e)=>{setSearchKeyword(e.value);}}
              placeholder="유형 선택"
              defaultValue={userOption[0]}/>
            }
            { manageType ==="ban" &&
              <Select className="master-select-options"
              options={banSearchOption}
              onChange={(e)=>{setSearchKeyword(e.value);}}
              placeholder="유형 선택"
              defaultValue={userOption[0]}/>
            }
            { manageType ==="board" &&
              <Select className="master-select-options"
              options={boardSearchOption}
              onChange={(e)=>{setSearchKeyword(e.value);}}
              placeholder="유형 선택"
              defaultValue={userOption[0]}/>
            }
            <input type="text" placeholder="검색어를 입력하세요" className="master-search-box"
            onChange={(e)=> {setSearch(e.target.value);}}></input>
          </div>
          <div className="master-select-box">
            <span className="master-select-box-span">카테고리:</span>
            { manageType ==="user" &&
              <Select className="master-select-options"
              options={userOption}
              onChange={(e)=>{setKeyword(e.value);}}
              placeholder="유형 선택"
              defaultValue={userOption[0]}/>
            }
            { manageType ==="report" &&
              <Select className="master-select-options"
              options={reportOption}
              onChange={(e)=>{setKeyword(e.value);}}
              placeholder="유형 선택"
              defaultValue={userOption[0]}/>
            }
            { manageType ==="ban" &&
              <Select className="master-select-options"
              options={bannedOption}
              onChange={(e)=>{setKeyword(e.value);}}
              placeholder="유형 선택"
              defaultValue={userOption[0]}/>
            }
            { manageType ==="board" &&
              <Select className="master-select-options"
              options={boardOption}
              onChange={(e)=>{setKeyword(e.value);}}
              placeholder="유형 선택"
              defaultValue={userOption[0]}/>
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
          {manageType === "user" &&
            userList.filter(filterUserList).map((item) => (
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
          reportedUserList.filter(filterReportList).map((item) => (
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
            bannedUserList.filter(filterBanList).map((item) => (
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
          boardList.filter(filterBoardList).map((item) => (
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
          
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
