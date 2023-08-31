// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "../css/masterPage.css";
import "../script/custom.js";
import "../css/chatting-room-name.css";
import "../css/total.css";
import "../css/variables.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";

const addBan = async (banDays, userId, reportId, banReason) => {
  return await axios
  .post("/api/admin/ban/add?banDays="+banDays+"&userId="+userId+"&reportId="+reportId+"&banReason="+banReason,{
    banDays : banDays,
    userId : userId, 
    reportId : reportId,
    banReason : banReason
  })
  .then((response)=>{
    console.log(response);
  })
  .catch((error)=>{
    console.log(error);				//오류발생시 실행
  });
}
const searchBan = async(userId)=>{
  
  return axios.get("/api/admin/getBanUser/"+userId,{
    userId : userId
  })
  .then((response)=>{
    console.log(response);
    console.log(response.data);
    return response.data;
  })
  .catch((error)=>{
    console.log(error);				//오류발생시 실행
  });
}
const clearBan = async(userId)=>{
  
  return axios.post("/api/admin/ban/clearBan?id="+userId+"&userId="+userId,{
    userId : userId,
  })
  .then((response)=>{
    console.log(response);
    console.log(response.data);
    return response.data;
  })
  .catch((error)=>{
    console.log(error);				//오류발생시 실행
  });
}
const changeReportStatus = async(reportedId)=>{
  
  return axios.post("/api/admin/ban/update?reportedId="+reportedId,{
    reportedId : reportedId,
  })
  .then((response)=>{
    console.log(response);
    // console.log(response.data);
    // return response.data;
  })
  .catch((error)=>{
    console.log(error);				//오류발생시 실행
  });
}

const returnBoard = async (id) => {
  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

  fetch(`/api/board/recovery/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": jsonContent,
      id: id,
      delYn: "N",
    },
    body: JSON.stringify({}),
  }).then((data) => {
    if (data && data.status === 200) {
      alert("게시글이 복구되었습니다.");
    } else {
      alert("게시글 복구를 실패했습니다.");
    }
  });
};
const delBoard = async (id) => {
  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

  fetch(`/api/board/delete/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": jsonContent,
      id: id,
      delYn: "Y",
    },
    body: JSON.stringify({}),
  }).then((data) => {
    if (data && data.status === 200) {
      alert("게시글이 삭제되었습니다.");
    } else {
      alert("게시글 삭제 실패했습니다.");
    }
  });
};

const AdminPage = () => {
  const userOption = [
    { value: "", label: "선택해 주세요" },
    { value: "banned", label: "정지된 사용자" },
    { value: "notBanned", label: "일반 사용자" },
    { value: "M", label: "남성" },
    { value: "F", label: "여성" },
  ];
  const userSearchOption = [
    { value: "", label: "선택해 주세요" },
    { value: "id", label: "아이디" },
    { value: "nickname", label: "닉네임" },
    { value: "phone", label: "전화번호" },
    { value: "email", label: "이메일" },
  ];

  const reportOption = [
    { value: "", label: "선택해 주세요" },
    { value: "notBanned", label: "신고처리 전" },
    { value: "banned", label: "신고처리 완료" },
    { value: "deleted", label: "신고 삭제" },
    { value: "board", label: "게시판" },
    { value: "chat", label: "채팅" },
    { value: "comment", label: "댓글" },
  ];
  const reportSearchOption = [
    { value: "", label: "선택해 주세요" },
    { value: "reporter", label: "신고 한 유저" },
    { value: "reported", label: "신고 된 유저" },
  ];

  const bannedOption = [
    { value: "", label: "선택해 주세요" },
    { value: "D", label: "게시글/댓글 도배" },
    { value: "P", label: "음란성 게시글/댓글 작성" },
    { value: "F", label: "욕설/혐오 발언 게시글/댓글 작성" },
    { value: "A", label: "광고성 게시글/댓글 작성" },
    { value: "R", label: "허위 리뷰 작성" },
  ];

  const banSearchOption = [
    { value: "", label: "선택해 주세요" },
    { value: "loginId", label: "아이디" },
    { value: "name", label: "이름" },
    { value: "nickName", label: "닉네임" },
  ];

  const boardOption = [
    { value: "", label: "선택해 주세요" },
    { value: "N", label: "공지사항" },
    { value: "Q", label: "FAQ" },
    { value: "F", label: "한끼가치" },
    { value: "C", label: "카페가치" },
    { value: "A", label: "한잔가치" },
    { value: "T", label: "놀러가치" },
  ];
  const boardSearchOption = [
    { value: "", label: "선택해 주세요" },
    { value: "title", label: "제목" },
    { value: "userNickName", label: "작성자" },
  ];

  const [manageName, setManageName] = useState("유저 관리 페이지");
  const [manageType, setManageType] = useState("user");

  const [userList, setUserList] = useState([]);
  const [reportedUserList, setReportedUserList] = useState([]);
  const [bannedUserList, setBannedUserList] = useState([]);
  const [boardList, setBoardList] = useState([]);

  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState(userOption[0].value);
  const [searchKeyword, setSearchKeyword] = useState(userOption[0].value);

  const [banChanged, setBanChanged] = useState(false);
  const [clearId, setClearId] = useState();
  const [banId, setBanId] = useState();
  const [reportType, setReportType] = useState("");
  const [reportedId, setReportedId] = useState("");
  const [banDay, setBanDay] = useState();

  //모달창
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  //모달창
  const [showClearModal, setShowClearModal] = useState(false);
  //모달창
  const [showBoardDelModal, setShowBoardDelModal] = useState(false);
  const [showBoardReturnModal, setShowBoardReturnModal] = useState(false);
  const [boardId, setBoardId] = useState();

  useEffect(() => {
    axios.get("/api/admin/userList").then((response) => {
      console.log(response.data);
      setUserList(response.data);
    });
    axios.get("/api/admin/reportedUserList").then((response) => {
      console.log(response.data);
      setReportedUserList(response.data);
    });
    axios.get("/api/admin/bannedUserList").then((response) => {
      console.log(response.data);
      setBannedUserList(response.data);
    });
    axios.get("/api/admin/boardList").then((response) => {
      console.log(response.data);
      setBoardList(response.data);
    });
  }, [
    showSuspendModal,
    showClearModal,
    showBoardDelModal,
    showBoardReturnModal,
  ]);

  const goToManageUsers = () => {
    setManageName("유저 관리 페이지");
    setManageType("user");
    setKeyword(userOption[0].value);
    setSearch("");
    setShowSuspendModal(false);
    setShowClearModal(false);
    setShowBoardDelModal(false);
    setShowBoardReturnModal(false);
  };

  // 활동 정지 버튼만 눌리게 설정
  const goToReportedUsers = () => {
    setManageName("신고 된 유저 관리 페이지");
    setManageType("report");
    setKeyword(userOption[0].value);
    setSearch("");
    setShowSuspendModal(false);
    setShowClearModal(false);
    setShowBoardDelModal(false);
    setShowBoardReturnModal(false);
  };

  // 관리자 버튼만 눌리게 설정
  const goToSuspendedUsers = () => {
    setManageName("활동 정지 된 유저 관리 페이지");
    setManageType("ban");
    setKeyword(userOption[0].value);
    setSearch("");
    setShowSuspendModal(false);
    setShowClearModal(false);
    setShowBoardDelModal(false);
    setShowBoardReturnModal(false);
  };
  // 유저 게시판만 눌리게 설정
  const goToUserBoard = () => {
    setManageName("게시판 관리 페이지");
    setManageType("board");
    setKeyword(userOption[0].value);
    setSearch("");
    setShowSuspendModal(false);
    setShowClearModal(false);
    setShowBoardDelModal(false);
    setShowBoardReturnModal(false);
  };

  const handleSuspendButtonClick = (userId, banReason, reportedId) => {
    // "정지" 버튼을 클릭했을 때 팝업을 열도록 설정
    setBanId(userId);
    setReportType(banReason);
    setReportedId(reportedId);
    setShowSuspendModal(true);
  };
  const handleBanDayChange = (e) => {
    setBanDay(e.currentTarget.value);
    console.log(banDay);
  };
  const handleModalBanButtonClick = (id, banReason, reportedId) => {
    console.log(banDay);
    changeReportStatus(id);
    addBan(banDay, id, reportedId, banReason);
    alert(banDay + "일 정지 완료");

    setShowSuspendModal(false);
  };
  const handleClearButtonClick = (userId) => {
    // "정지" 버튼을 클릭했을 때 팝업을 열도록 설정
    let clearUserId = userId;
    let clearTemp = searchBan(userId);

    console.log("clear: ", clearTemp);
    console.log(handleClearDataResponse(clearUserId));
    setShowClearModal(true);

    // setCurrentContent(id);
  };
  const handleClearDataResponse = async (userId) => {
    // e.preventDefault();
    let clearTemp = await searchBan(userId);
    setClearId(clearTemp);
    console.log(clearTemp);
  };
  const handleClearButtonYes = () => {
    clearBan(clearId[0].userId);
    // searchBan(userId);
    alert("정지 해제 완료!");
    setShowClearModal(false);

    // setCurrentContent(id);
  };
  const handleClearStopButtonClick = () => {
    setShowClearModal(false);
  };
  const handleBoardButtonClick = (id) => {
    // "정지" 버튼을 클릭했을 때 팝업을 열도록 설정
    setBoardId(id);
    setShowBoardDelModal(true);
  };
  const handleBoardRetButtonClick = (id) => {
    // "정지" 버튼을 클릭했을 때 팝업을 열도록 설정
    setBoardId(id);
    setShowBoardReturnModal(true);
    // setCurrentContent(id);
  };
  const handleBoardCloseButtonClick = () => {
    setShowBoardReturnModal(false);
    setShowBoardDelModal(false);
  };
  const handleBoarddelModalButtonClick = () => {
    delBoard(boardId);
    // alert("삭제 완료!");
    setShowBoardDelModal(false);
  };
  const handleBoardRetModalButtonClick = () => {
    returnBoard(boardId);
    // alert("복구 완료!");
    setShowBoardReturnModal(false);
  };

  const handleSuspendModalClose = () => {
    // 팝업을 닫을 때 호출되는 함수
    setShowSuspendModal(false);
  };

  const filterUserList = (item) => {
    if (manageType === "user") {
      return (
        item.status !== "S" &&
        (search === "" ||
          (searchKeyword === ""
            ? true
            : searchKeyword === "id"
            ? item.loginId.includes(search)
            : searchKeyword === "nickname"
            ? item.nickname.includes(search)
            : searchKeyword === "phone"
            ? item.phone.includes(search)
            : searchKeyword === "email"
            ? item.email.includes(search)
            : false)) &&
        (keyword === ""
          ? true
          : keyword === "banned"
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
          (item.reportedUserNickName && searchKeyword === ""
            ? true
            : searchKeyword === "reported"
            ? item.reportedUserNickName.includes(search)
            : searchKeyword === "reporter"
            ? item.reporterNickName.includes(search)
            : false)) &&
        (keyword === ""
          ? true
          : keyword === "banned"
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
        item.bannedYn === "Y" &&
        item.banStatus === "J" &&
        (search === "" ||
          (searchKeyword === ""
            ? true
            : searchKeyword === "loginId"
            ? item.loginId.includes(search)
            : searchKeyword === "name"
            ? item.name.includes(search)
            : searchKeyword === "nickName"
            ? item.nickName.includes(search)
            : false)) &&
        (keyword === ""
          ? true
          : keyword === "banned"
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
        // (item.delYn ==="N") &&
        (search === "" ||
          (searchKeyword === ""
            ? true
            : searchKeyword === "title"
            ? item.title.includes(search)
            : searchKeyword === "userNickName"
            ? item.userNickName.includes(search)
            : false)) &&
        (keyword === ""
          ? true
          : keyword === "N"
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
    <div className="admin-page-box">
      <div className="board_wrap">
        <div className="board_title">
          <strong>관리자</strong>
          <p>{manageName}</p>
          <button
            className="ReportedUser category-btn"
            onClick={goToManageUsers}
          >
            전체 유저
          </button>
          <button
            className="SuspendedUser category-btn"
            onClick={goToReportedUsers}
          >
            신고된 유저
          </button>
          <button
            className="ManageUsers category-btn"
            onClick={goToSuspendedUsers}
          >
            활동 정지 유저
          </button>
          <button className="UserBoard category-btn" onClick={goToUserBoard}>
            게시판 관리
          </button>
          <div className="master-select-search">
            <div className="master-search">
              {manageType === "user" && (
                <Select
                  className="master-select-options"
                  options={userSearchOption}
                  onChange={(e) => {
                    setSearchKeyword(e.value);
                  }}
                  placeholder="유형 선택"
                  defaultValue={userOption[0]}
                />
              )}
              {manageType === "report" && (
                <Select
                  className="master-select-options"
                  options={reportSearchOption}
                  onChange={(e) => {
                    setSearchKeyword(e.value);
                  }}
                  placeholder="유형 선택"
                  defaultValue={userOption[0]}
                />
              )}
              {manageType === "ban" && (
                <Select
                  className="master-select-options"
                  options={banSearchOption}
                  onChange={(e) => {
                    setSearchKeyword(e.value);
                  }}
                  placeholder="유형 선택"
                  defaultValue={userOption[0]}
                />
              )}
              {manageType === "board" && (
                <Select
                  className="master-select-options"
                  options={boardSearchOption}
                  onChange={(e) => {
                    setSearchKeyword(e.value);
                  }}
                  placeholder="유형 선택"
                  defaultValue={userOption[0]}
                />
              )}
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="master-search-box"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              ></input>
            </div>
            <div className="master-select-box">
              <span className="master-select-box-span">카테고리:</span>
              {manageType === "user" && (
                <Select
                  className="master-select-options"
                  options={userOption}
                  onChange={(e) => {
                    setKeyword(e.value);
                  }}
                  placeholder="유형 선택"
                  defaultValue={userOption[0]}
                />
              )}
              {manageType === "report" && (
                <Select
                  className="master-select-options"
                  options={reportOption}
                  onChange={(e) => {
                    setKeyword(e.value);
                  }}
                  placeholder="유형 선택"
                  defaultValue={userOption[0]}
                />
              )}
              {manageType === "ban" && (
                <Select
                  className="master-select-options"
                  options={bannedOption}
                  onChange={(e) => {
                    setKeyword(e.value);
                  }}
                  placeholder="유형 선택"
                  defaultValue={userOption[0]}
                />
              )}
              {manageType === "board" && (
                <Select
                  className="master-select-options"
                  options={boardOption}
                  onChange={(e) => {
                    setKeyword(e.value);
                  }}
                  placeholder="유형 선택"
                  defaultValue={userOption[0]}
                />
              )}
            </div>
          </div>
        </div>
        <div className="board_list_wrap">
          <div className="board_list">
            {manageType === "user" && (
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
            )}
            {manageType === "user" &&
              userList.filter(filterUserList).map((item) => (
                <ul key={item.id} className="master-list">
                  <li className="master-list-item">{item.loginId}</li>
                  <li className="master-list-item">{item.name}</li>
                  <li className="master-list-item">
                    {/* <a href={`view.html?id=${item.Username}`}>{item.Username}</a> */}
                    {item.nickname}
                  </li>
                  {item.gender === "M" && (
                    <li className="master-list-item">남성</li>
                  )}
                  {item.gender === "F" && (
                    <li className="master-list-item">여성</li>
                  )}

                  <li className="master-list-item">{item.phone}</li>
                  <li className="master-list-item">{item.email}</li>
                  <li className="master-list-item">{item.birth}</li>
                  {item.bannedYn === "Y" && (
                    <li className="master-list-item">정지됨</li>
                  )}
                  {item.bannedYn === "N" && (
                    <li className="master-list-item">정상</li>
                  )}
                  <li className="master-list-item master-btns">
                    {item.bannedYn === "Y" && (
                      <button
                        className="UnsuspendButton ban-btn"
                        onClick={() => {
                          handleClearButtonClick(item.id);
                        }}
                      >
                        해제
                      </button>
                    )}
                    {item.bannedYn === "N" && (
                      <button
                        className="SuspendButton ban-btn"
                        onClick={() => {
                          handleSuspendButtonClick(item.id, "E", 1);
                        }}
                      >
                        정지
                      </button>
                    )}
                  </li>
                </ul>
              ))}

            {manageType === "report" && (
              <ul className="top">
                <li className="tab-menu">신고된 유저</li>
                <li className="tab-menu">신고 한 유저</li>
                <li className="tab-menu">신고 유형</li>
                <li className="tab-menu">신고 처리 여부</li>
                <li className="tab-menu">유형</li>
                <li className="tab-menu">정지 버튼</li>
              </ul>
            )}
            {/* 위에boardData 데이터 삽입 and filter이용해서 버튼검색 나눔 */}
            {/* filter(item => item.status ==="U"). */}
            {manageType === "report" &&
              reportedUserList.filter(filterReportList).map((item) => (
                <ul key={item.id} className="master-list">
                  <li className="master-list-item">
                    {item.reportedUserNickName}
                  </li>
                  <li className="master-list-item">{item.reporterNickName}</li>
                  <li className="master-list-item">{item.reportType}</li>
                  <li className="master-list-item">{item.reportStatus}</li>
                  <li className="master-list-item">{item.category}</li>
                  {/* <li className="master-list-item">
                {item.contentId}
              </li> */}
                  {(item.reportStatusKeyword === "C" ||
                    item.bannedYn === "Y") && (
                    <li className="master-list-item">처리 완료.</li>
                  )}
                  {item.reportStatusKeyword != "C" && item.bannedYn === "N" && (
                    <li className="master-list-item master-btns">
                      <button
                        className="SuspendButton ban-btn"
                        onClick={() => {
                          handleSuspendButtonClick(
                            item.reportedUsersId,
                            item.reportTypeKeyword,
                            item.reportersId
                          );
                        }}
                      >
                        정지
                      </button>
                    </li>
                  )}
                </ul>
              ))}

            {manageType === "ban" && (
              <ul className="top">
                <li className="tab-menu">ID</li>
                <li className="tab-menu">이름</li>
                <li className="tab-menu">닉네임</li>
                <li className="tab-menu">정지 사유</li>
                <li className="tab-menu">시작일</li>
                <li className="tab-menu">종료일</li>
                <li className="tab-menu">신고버튼</li>
              </ul>
            )}
            {/* 위에boardData 데이터 삽입 and filter이용해서 버튼검색 나눔 */}
            {manageType === "ban" &&
              bannedUserList.filter(filterBanList).map((item) => (
                <ul key={item.id} className="master-list">
                  <li className="master-list-item">{item.loginId}</li>
                  <li className="master-list-item">{item.name}</li>
                  <li className="master-list-item">{item.nickName}</li>
                  <li className="master-list-item">{item.banReason}</li>
                  <li className="master-list-item">{item.banStartAt}</li>
                  <li className="master-list-item">{item.banEndAt}</li>
                  <li className="master-list-item master-btns">
                    <button
                      className="UnsuspendButton ban-btn"
                      onClick={() => {
                        handleClearButtonClick(item.bannedId);
                      }}
                    >
                      해제
                    </button>
                  </li>
                </ul>
              ))}

            {manageType === "board" && (
              <ul className="top">
                <li className="tab-menu">게시판 종류</li>
                <li className="tab-menu">제목</li>
                <li className="tab-menu">작성자</li>
                <li className="tab-menu">작성일</li>
                <li className="tab-menu">조회수</li>
                <li className="tab-menu">삭제 여부</li>
                <li className="tab-menu">삭제버튼</li>
              </ul>
            )}
            {/* 위에boardData 데이터 삽입 and filter이용해서 버튼검색 나눔 */}
            {manageType === "board" &&
              boardList.filter(filterBoardList).map((item) => (
                <ul key={item.id} className="master-list">
                  <li className="master-list-item">{item.kind}</li>
                  <li className="master-list-item">{item.title}</li>
                  <li className="master-list-item">{item.userNickName}</li>
                  <li className="master-list-item">{item.createAt}</li>
                  <li className="master-list-item">{item.cnt}</li>
                  {item.delYn === "N" && (
                    <li className="master-list-item">정상</li>
                  )}
                  {item.delYn === "Y" && (
                    <li className="master-list-item">삭제됨</li>
                  )}
                  {item.delYn === "Y" && (
                    <li className="master-list-item master-btns">
                      <button
                        className="delteButton ban-btn"
                        onClick={() => {
                          handleBoardRetButtonClick(item.id);
                        }}
                      >
                        복구
                      </button>
                    </li>
                  )}
                  {item.delYn === "N" && (
                    <li className="master-list-item master-btns">
                      <button
                        className="delteButton ban-btn"
                        onClick={() => {
                          handleBoardButtonClick(item.id);
                        }}
                      >
                        삭제
                      </button>
                    </li>
                  )}
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
                      <input
                        className="inputNumber"
                        type="number"
                        min="1"
                        onChange={handleBanDayChange}
                      />
                      <span className="day-stop">일 정지</span>
                    </div>
                    <div className="bottomSection">
                      <button
                        className="modalButton1 modalButton"
                        onClick={() => {
                          handleModalBanButtonClick(
                            banId,
                            reportType,
                            reportedId
                          );
                        }}
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
          {showClearModal && (
            <div className="popup_overlay active">
              <div className="popup_content">
                <div className="popup_conten">
                  <h2 className="stop">정지 해제</h2>
                  <div className="daySuspension">
                    <div className="input-stop-box">
                      <span>
                        정지 해제 <br></br> 하시겠습니까?
                      </span>
                    </div>
                    <div className="bottomSection">
                      <button
                        className="modalButton1 modalButton"
                        onClick={handleClearButtonYes}
                      >
                        해제
                      </button>
                      <button
                        className="modalButton2 modalButton"
                        onClick={handleClearStopButtonClick}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showBoardDelModal && (
            <div className="popup_overlay active">
              <div className="popup_content">
                <div className="popup_conten">
                  <h2 className="stop">삭제</h2>
                  <div className="daySuspension">
                    <div className="input-stop-box">
                      <span>
                        삭제 <br></br> 하시겠습니까?
                      </span>
                    </div>
                    <div className="bottomSection">
                      <button
                        className="modalButton1 modalButton"
                        onClick={handleBoarddelModalButtonClick}
                      >
                        삭제
                      </button>
                      <button
                        className="modalButton2 modalButton"
                        onClick={handleBoardCloseButtonClick}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showBoardReturnModal && (
            <div className="popup_overlay active">
              <div className="popup_content">
                <div className="popup_conten">
                  <h2 className="stop">복구</h2>
                  <div className="daySuspension">
                    <div className="input-stop-box">
                      <span>
                        복구 <br></br> 하시겠습니까?
                      </span>
                    </div>
                    <div className="bottomSection">
                      <button
                        className="modalButton1 modalButton"
                        onClick={handleBoardRetModalButtonClick}
                      >
                        복구
                      </button>
                      <button
                        className="modalButton2 modalButton"
                        onClick={handleBoardCloseButtonClick}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
