// import React from "react";
import { useState } from "react";
// import MasterModal from "../components/MasterModal";


const MasterPage2 = () => {
  // 게시판 데이터
  const boardData = [
    {
      ReportNumber: 1,
      ReportedDate: "2021.1.15",
      Username: "김여자",
      Report: "말 뒤지게 안들음",
      SuspensionStatus: "N",
      Start_Suspension: "2021.08.11",
      Date_Suspension: "2021.08.18",
    },
  ];
  //게시판 데이터
  const boardData2 = [
    {
      ReportNumber2: 2,
      ReportedDate2: "2021.1.15",
      Username2: "김남자",
      Report2: "만지고 쨈",
      SuspensionStatus2: "Y",
      Start_Suspension2: "2021.08.11",
      Date_Suspension2: "2021.08.18",
    },
  ]

  const [showReportedUsers, setShowReportedUsers] = useState(false);
  // const [showSuspendedUsers, setShowSuspendedUsers] = useState(false);
  // const [showManageUsers, setShowManageUsers] = useState(false); // 추가: 관리자 상태 정의

  // 신고 된 유저 버튼 만 눌리게 설정
  const goToReportedUsers = () => {
    setShowReportedUsers(true);
    // setShowSuspendedUsers(false);
    // setShowManageUsers(false);
  };

  // 활동 정지 버튼만 눌리게 설정
  const goToSuspendedUsers = () => {
    setShowReportedUsers(false);
    // setShowSuspendedUsers(true);
    // setShowManageUsers(false);
  };

  // 관리자 버튼만 눌리게 설정
  const goToManageUsers = () => {
    setShowReportedUsers(false);
    // setShowSuspendedUsers(false);
    // setShowManageUsers(true);
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
        <p>공지사항을 빠르고 정확하게 안내해드립니다.</p>
        <button className="ReportedUser" onClick={goToReportedUsers}>
          신고된 유저
        </button>
        <button className="SuspendedUser" onClick={goToSuspendedUsers}>
          활동 정지 유저
        </button>
        <button className="ManageUsers" onClick={goToManageUsers}>
          관리 대상자 유저
        </button>
      </div>
      <div className="board_list_wrap">
        <div className="board_list">
          <div className="top">
            <div className="tab-menu ReportNumber">신고번호</div>
            <div className="tab-menu ReportedDate">신고일자</div>
            <div className="tab-menu Username">Id</div>
            <div className="tab-menu Report">신고 사유</div>
            <div className="tab-menu SuspensionStatus">정지 유무</div>
            <div className="tab-menu Start_Suspension">정지 시작날짜</div>
            <div className="tab-menu Date_Suspension">정지 종료 일자</div>
            <div className="tab-menu Suspend">ㅤㅤ</div>
          </div>
          {/* 위에boardData 데이터 삽입 and filter이용해서 버튼검색 나눔 */}
          {showReportedUsers &&
            boardData.filter(item => item.SuspensionStatus === "N" || item.SuspensionStatus2 === "Y").map((item) => (
              <div key={item.ReportNumber} className="master-list">
                <div className="master-list-item ReportNumber-list">
                  {item.ReportNumber}
                </div>
                <div className="master-list-item ReportedDate-list">
                  {item.ReportedDate}
                </div>
                <div className="master-list-item Username-list">
                  <a href={`view.html?id=${item.Username}`}>{item.Username}</a>
                </div>
                <div className="master-list-item Report-list">{item.Report}</div>
                <div className="master-list-item SuspensionStatus-list">
                  {item.SuspensionStatus}
                </div>
                <div className="master-list-item Start_Suspension-list">
                  {item.Start_Suspension}
                </div>

                <div className="master-list-item 정지끝남">
                  {item.Date_Suspension}
                </div>
                <button
                  className="SuspendButton"
                  onClick={handleSuspendButtonClick}
                >
                  정지
                </button>
                <button className="UnsuspendButton">정지 해제</button>

              </div>

            ))}

          {boardData2.map((item) => (
            <div key={item.ReportNumber2} className="master-list">
              <div className="master-list-item ReportNumber-list">
                {item.ReportNumber2}
              </div>
              <div className="master-list-item ReportedDate-list">
                {item.ReportedDate2}
              </div>
              <div className="master-list-item Username-list">
                <a href={`view.html?id=${item.Username}`}>{item.Username2}</a>
              </div>
              <div className="master-list-item Report-list">{item.Report2}</div>
              <div style={{ color: "red" }} className="master-list-item SuspensionStatus-list">
                {item.SuspensionStatus2}
              </div>
              <div className="master-list-item Start_Suspension-list">
                {item.Start_Suspension2}
              </div>

              <div className="master-list-item 정지끝남">
                {item.Date_Suspension2}
              </div>
              <button
                className="SuspendButton"
                onClick={handleSuspendButtonClick}
              >
                정지
              </button>
              <button className="UnsuspendButton">정지 해제</button>
            </div>

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

export default MasterPage2;
