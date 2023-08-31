import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "../css/index.css";
import "../css/total.css";
import "../css/board.css";
import "../css/variables.css";
import "../css/post-content.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/post-content.js";
import "../script/custom.js";
import { useCookies } from "react-cookie";
import axios from "axios";
// import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import MapComponentView from "./MapComponentView";
import BoardPreview from "./BoardPreview";
import BoardCategoryMenu from "./BoardCategoryMenu"; //에디터



// console.log("유저정보: ========> ",userInfo.uid);  유저정보 아이디

function BoardViewForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const id = searchParams.get('id'); // Extract id from URL parameter
  const [data, setData] = useState(''); // 게시글
  const [imgData, setImgData] = useState(''); // 게시글 이미지
  let [commentList, setCommentList] = useState([]); //댓글리스트
  //const { kind } = searchParams.get('kind'); // kind 값을 추출
  const kind: string = searchParams.get('kind');
  const [cookies] = useCookies(['token']);
  const [localAddress, setLocalAddress] = useState(''); // 주소 상태 변수 추가
  const localAddressInputRef = useRef(null);
  const latitudeInputRef = useRef(null); // 위도
  const [latitude, setLatitude] = useState(''); // 위도 상태 변수 추가
  const longitudeInputRef = useRef(null); // 경도
  const [longitude, setLongitude] = useState(''); // 경도 상태 변수 추가
  const [gender, setGender] = useState(null); // 유저 성별
  const [modalStatus, setModalStatus] = useState(false); // 모달 여부
  const [mannerScore, setMannerScore] = useState(null); // 유저 매너점수
  const [imgSrc, setImgSrc] = useState(""); //유저 프로필


  const userInfo = useSelector((state) => state.user.user); //유저 정보
  const [reportType,setReportType] = useState("D");  //
  const [reportedId,setReportedId] = useState(null);
  const [reporterId,setReporterId] = useState(null);
  const [contentId,setContentId] = useState(null);
  const [category,setCategory] = useState(null);


  const commentInputRef = useRef(null);
  const commentInputRef2 = useRef(null);
  const parentId = useRef(null); //대댓글 id
  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;


  //******************************
  //유저 정보 가져오기
  //******************************
  useEffect(() => {
    if (userInfo.uid) {
      fetch("/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": jsonContent,
          Authorization: "Bearer " + cookies.token,
        },
      })
          .then((res) => {
            if (res) {
              return res.json();
            }
          })
          .then((userData) => {
            if (userData.loginId) {
              setGender(userData.gender);
            }
          });
    }
  }, [userInfo.uid]);

console.log("");



//******************************
  //유저 매너정보 가져오기
  //******************************
  useEffect(() => {
    if (userInfo.uid) {
      fetch(`/api/manner/me?id=${userInfo.uid}`, {
        method: "GET",
        headers: {
          "Content-Type": jsonContent,
        },
      })
          .then((res) => {
            if (res) {
              return res.json();
            }
          })
          .then((userManner) => {
            if (userManner) {
              setMannerScore(userManner);
              console.log("매너점수: ===========> ",userManner);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });;
    }
  }, [userInfo.uid]);


  //**************************************
  //매너점수가 없으면 기본값으로 0점 처리
  //**************************************
  if(mannerScore == null){
    console.log("매너점수 0점 처리");
    setMannerScore(0);
  }

  //*************************************
  //게시글 정보 가져오기
  //*************************************
  const fetchData = () => {
    fetch(`/api/board/${id}`)

        .then(res => {
              console.log("게시글: ",res)
          return res.json()
        })
        .then(data => {
          console.log("data  ========> ",data)
          setData(data);
        })
  }


  //*************************************
  //게시글 이미지 정보 가져오기
  //*************************************

    const fetchImgData = () => {
      let brdId = `${id}`;
      fetch(`/api/brdImg/${brdId}`)
          .then(res => {
            if (!res.ok) {
              throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            // console.log("이미지: ==============> ",res);
            return res.json()
          })
          .then(imgInfo => {
            // console.log("imgInfo  ===========================================> ",imgInfo)
            setImgData(imgInfo);
          })
          .catch(error => {
            console.error('이미지를 가져오는 중 오류 발생:', error);
            // 여기에서 오류를 처리하십시오. 예: 사용자에게 메시지 표시
          });
    }


  // console.log("========================",imgData.imgSrc);

  useEffect(() => {
    fetchData(); //게시글
    fetchImgData(); //게시글 이미지
  },[id]);

    useEffect(() =>{
      setReportedId(data.userId);
      setReporterId(JSON.stringify(userInfo.uid));
      setContentId(data.id);
      setCategory("B");
  }, [data,userInfo])
  const handleEditClick = () => {
    // 수정 페이지로 이동
    navigate(`/board/edit?id=${data.id}&kind=${kind}`);
  };

  const handleDeleteClick = () => {
    // 수정 페이지로 이동
    navigate(`/board/delete?id=${data.id}`);
  };

  //*****************************
  //댓글 가져오기
  //*****************************
  const fetchCommentData = () => {
    fetch(`/api/comment/list/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": jsonContent,
      },
    })
      .then((resComment) => {
        if (!resComment.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return resComment.json();
      })
      .then((dataComment) => {
        console.log("dataComment ========> ", dataComment);
        setCommentList(dataComment);
      })
      .catch((error) => {
        console.error("댓글 데이터를 가져오는 중 오류 발생:", error);
        // 여기에서 오류를 처리하십시오. 예: 사용자에게 메시지 표시
      });
  };

  // console.log("commentList +++++++++++> : ",commentList);

  useEffect(() => {
    fetchCommentData();
  }, [id]);

  //****************************
  //댓글 입력하기
  //****************************
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredComment = commentInputRef.current.value;
    console.log("boardid: ====> ", `${id}`);
    // 유효성 체크
    if (enteredComment === "") {
      alert("댓글 내용을 입력하세요");
      return; // 유효성 검사 실패 시 제출 중단
    }
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
    console.log("댓글 내용체크 : ", enteredComment, `${id}`);
    try {
      // if (noMoreData) {
      //   return; // 더 이상 데이터가 없을 때 요청하지 않도록 중지
      // }
      const response = await axios.post(`/api/comment/insert`, {
        content: enteredComment,
        userId: userInfo.uid,
        boardId: `${id}`,
      });
      console.log("response.data ============>>>>>>>>>> ", response.status);

      if (response && response.status === 201) {
        alert("댓글이 입력되었습니다..");
        // navigate(`/board/view?id=${id}`);
        window.location.href = `/final-project/board/view?id=${id}`;
      } else {
        alert("댓글 등록이 실패되었습니다.");
      }
    } catch (error) {
      console.error("Error fetching board list:", error);
    }
  };



  //******************************
  //게시글 카운트 하기
  //******************************
  useEffect(() => {
    console.log("카운트하기");
    boardCnt();
  }, [userInfo.uid]);

  const boardCnt = async (event) => {
    console.log("카운트 호출하기: ====> ", `${id}`, userInfo.uid);
    // 유효성 체크
    if (`${id}` == "" || userInfo.uid =="") {
      console.log("카운팅 실패");
      return; // 유효성 검사 실패 시 제출 중단
    }
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
    try {
      const resCnt = await axios.put(`/api/board/updateCnt/${id}`, {
      });
      console.log("조회수 카운트 ============>", resCnt);
      if (resCnt && resCnt.status === 201) {
        alert("게시글 카운트");
      }
    } catch (error) {
      console.error("Error 게시글 카운트:", error);
    }
  };



  // 댓글 수정모드를 관리할 상태
  const [isEditingComment, setIsEditingComment] = useState({});
  // 컴포넌트 함수의 시작 부분에 다음 줄을 추가하세요
  const [editedComments, setEditedComments] = useState({});

  // 각 댓글의 수정 상태를 토글하는 함수
  const handleToggleEditComment = (commentId) => {
    setIsEditingComment((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));

    // 수정 버튼을 클릭하면 해당 댓글의 내용을 editedComments에 저장
    if (!isEditingComment[commentId]) {
      setEditedComments((prevState) => ({
        ...prevState,
        [commentId]:
          commentList.find((comment) => comment.id === commentId)?.content ||
          "",
      }));
    }
  };

  // 댓글 수정 폼 제출 함수
  const handleEditCommentSubmit = async (event, commentId) => {
    event.preventDefault();
    const editedComment = editedComments[commentId]; // 수정된 내용 가져오기

    console.log("editedComment:", editedComment);
    console.log("commentId:", commentId);

    try {
      // 서버로 수정된 내용을 전송하는 API 호출
      const response = await axios.put(`/api/comment/update/${commentId}`, {
        content: editedComment,
      });

      if (response && response.status === 200) {
        alert("댓글이 수정되었습니다.");
        // 수정 완료 후 수정 상태 비활성화
        handleToggleEditComment(commentId);
        // 댓글 데이터 다시 불러오기 (선택 사항)
        fetchCommentData();
      } else {
        alert("댓글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 수정 오류:", error);
    }
  };

  // 댓글 삭제 함수
  const handleDeleteComment = async (commentId) => {
    let comId = 0;
    comId = commentId;
    console.log("comId: ", comId);
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        // 서버로 댓글 삭제 API 호출
        const response = await axios.put(`/api/comment/delete/${comId}`);

        if (response && response.status === 200) {
          alert("댓글이 삭제되었습니다.");
          // 댓글 삭제 후 댓글 데이터 다시 불러오기 (선택 사항)
          fetchCommentData();
        } else {
          alert("댓글 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("댓글 삭제 오류:", error);
      }
    }
  };

console.log("kind  ===>", kind);
  console.log("data  ===>", data); // 게시글 유저



  //****************************
  //신고하기
  //****************************
  // data.userId => reportedId // 게시글, 댓글의 작성한 사람 (신고 대상자)
  // reporterId => JSON.stringify(userInfo.uid)  // 유저id(로그인 id)
  // reportType // 신고 내용
  // category B로 전송  (보드: B, 댓글 : C)
  // contentId data.id  // 보드의 id

  const handleReportButtonClick = async (event) => {
    event.preventDefault();
    setModalStatus(true)
    console.log("data.userId: "+data.userId);
    console.log("JSON.stringify(userInfo.uid): "+JSON.stringify(userInfo.uid));
    console.log("data.id: "+data.id);
    
    console.log("repedid: " +reportedId);
    console.log("reperid: " +reporterId);
    console.log("conId: " +contentId);
    console.log("cat: " +category);
      const response = await axios.post("/api/report/insert?category="+category+"&contentId="+contentId+"&reportedId="+reportedId+"&reporterId="+reporterId+"&reportType="+reportType,{
      contentId : contentId,
      category : category,
      reportedId : reportedId,
      reporterId : reporterId,
      reportType : reportType
    })
    .then((response)=>{
      console.log(response);
      console.log(response.data);
      return response;
    })
    .catch((error)=>{
      console.log(error);				//오류발생시 실행
    });
    if (response && response.status === 201) {
      alert("신고가 완료되었습니다.");
    } else {
      alert("신고 등록이 실패되었습니다.");
    }
    setModalStatus(false);
  }


  //********************************
  //모달 창 관리하기
  //********************************

  const [mainPostReportInfo, setMainPostReportInfo] = useState(null); // 메인 게시글에 대한 신고 정보
  const [commentReportInfo, setCommentReportInfo] = useState({}); // 댓글에 대한 신고 정보 (각 댓글 별로 관리)

  // 모달 열기 함수 (신고 정보를 받아서 설정)
  const openModal = (reportInfo) => {
    console.log("reportInfo: ===========> ",reportInfo);
    if (reportInfo.isMainPost) {
      setMainPostReportInfo(reportInfo);
    } else {
      setCommentReportInfo((prevInfo) => ({
        ...prevInfo,
        [reportInfo.commentId]: reportInfo,
      }));
    }
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setMainPostReportInfo(null);
    setCommentReportInfo({});
  };


  //모달
  // data.userId => reportedId // 게시글, 댓글의 작성한 사람 (신고 대상자)
  // reporterId => JSON.stringify(userInfo.uid)  // 유저id(로그인 id)
  // reportType // 신고 내용
  // category B로 전송  (보드: B, 댓글 : C)
  // contentId data.id  // 보드의 id

  //************************************
  // 메인 게시글의 신고 버튼 클릭 시 모달 열기
  //************************************
  const handleMainPostReportButtonClick = () => {
    setCategory("B"); // 보드
    // setReportedId(commentUserId) //신고 대상자
    setContentId(data.id) // 댓글 id
    const reportInfo = {
      isMainPost: true,
      reportedId: reportedId,
      reporterId: reporterId,
      contentId: contentId,
      category: category,
      // 신고 정보 설정 (reportedId, reporterId, contentId, reportType 등)
    };
    openModal(reportInfo);
    setModalStatus(true);
  };

  //************************************
  // 댓글의 신고 버튼 클릭 시 모달 열기
  //************************************
  const handleCommentReportButtonClick = (commentId, commentUserId) => {
    setCategory("C"); //댓글
    setReportedId(commentUserId) //신고 대상자
    // setReporterId(userInfo.uid) //로그인 유저
    setContentId(commentId) // 댓글 id


    const reportInfo = {
      isMainPost: false,
      // commentId: commentId,
      reportedId: reportedId,
      reporterId: reporterId,
      contentId: contentId,
      category: category,
      // 신고 정보 설정 (reportedId, reporterId, contentId, reportType 등)
    };
    openModal(reportInfo);
    setModalStatus(true);
  };



  //*******************************
  //지도보이기
  //*******************************
  // 추가한 상태 변수 showMap를 통해 MapComponent를 표시 여부를 제어
  const [showMap, setShowMap] = useState(false); //지도 표시
  // "지도 첨부" 버튼을 클릭하면 MapComponent를 보여주도록 설정


  //********************************
  //지도보이기 감추기 토글
  //********************************
  const toggleMap = () => {
    setShowMap((prevShowMap) => !prevShowMap); // 상태를 반전시킵니다.
    // displayMarker(data.latitude, data.longitude);
  };

  //********************************
  // 주소 클릭 이벤트 핸들러
  //********************************
  const handleAddressClick = (address) => {
    // 선택한 주소를 상태 변수에 저장
    setLocalAddress(address);

    // 주소 입력란에 선택한 주소를 설정
    localAddressInputRef.current.value = address;
  };

  const displayMarker = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setShowMap(true);
  };


  //*******************************
  //프로필 사진
  //*******************************
  useEffect(() => {
    const fetchImage = async () =>{
      try{
        const res = await axios.get(`/api/profile/me/${userInfo.uid}`, {
          responseType : "blob",
        })
        const imageUrl = URL.createObjectURL(res.data);
        console.log(imageUrl)
        setImgSrc(imageUrl);
      } catch (error){
        console.log(error);
      }
    }
    fetchImage();
  }, [userInfo.uid])


  console.log("로그인 유저 정보 확인: ",userInfo.uid);

  return (
    <div className="body">
      <section className="post-content">
        {/* ########################  게시판 모달 시작  ################################*/}
        {modalStatus &&
        <div className={`user-report-modal `}>
          <div className="user-report-modal-contents">
            <h2 className="user-report-title">신고하기</h2>
            <i className="fa fa-times modal-close" aria-hidden="true" onClick={()=>{setModalStatus(false);}}></i>
            <fieldset className="user-report-modal-content-field">
              <label
                  htmlFor="doubling-the-post"
                  className="user-report-modal-content"
              >
                <input
                    type="radio"
                    id="doubling-the-post"
                    name="report"
                    value="D"
                    onChange={(e) => {
                      setReportType(e.target.value)
                    }}
                    className="user-report-modal-content-radio"
                />
                <span>게시글 / 댓글 도배</span>
              </label>
              <label
                  htmlFor="obscene-posts"
                  className="user-report-modal-content"
              >
                <input
                    type="radio"
                    id="obscene-posts"
                    name="report"
                    value="P"
                    onChange={(e) => {
                      setReportType(e.target.value)
                    }}
                    className="user-report-modal-content-radio"
                ></input>
                <span>음란성 게시글 / 댓글 작성</span>
              </label>
              <label
                  htmlFor="abusive-comments"
                  className="user-report-modal-content"
              >
                <input
                    type="radio"
                    id="abusive-comments"
                    name="report"
                    value="F"
                    onChange={(e) => {
                      setReportType(e.target.value)
                    }}
                    className="user-report-modal-content-radio"
                ></input>
                <span>욕설 / 혐오 발언 게시글 / 댓글 작성</span>
              </label>
              <label
                  htmlFor="advertising-post"
                  className="user-report-modal-content"
              >
                <input
                    type="radio"
                    id="advertising-post"
                    name="report"
                    value="A"
                    onChange={(e) => {
                      setReportType(e.target.value)
                    }}
                    className="user-report-modal-content-radio"
                ></input>
                <span>광고성 게시글 / 댓글 작성</span>
              </label>
              <label htmlFor="false-review">
                <input
                    type="radio"
                    id="false-review"
                    name="report"
                    value="R"
                    onChange={(e) => {
                      setReportType(e.target.value)
                    }}
                    className="user-report-modal-content-radio"
                ></input>
                <span>허위 리뷰</span>
              </label>
            </fieldset>
            <div className="user-report-modal-btns">
              <input type="button" value="신고" id="user-report-modal-report" onClick={handleReportButtonClick}/>
              <input type="button" value="취소" id="user-report-modal-cancel" onClick={()=>{setModalStatus(false);}}/>
            </div>
          </div>
        </div>}
        {/* ########################  게시판 모달 끝  ################################*/}

        {/* ########################  보드 카테고리 메뉴 시작  ################################*/}
        <BoardCategoryMenu kind={kind} />
        {/* ########################  보드 카테고리 메뉴 끝  ################################*/}

        <div className="post-content-inner">
          {/*############################# 게시글 시작  ###################################*/}
          <div className="post-title">{data.title}</div>
          <div className="post-main-contents">
            <div className="post-main-content">
              {/* quill 에디터로 작성된 HTML 내용을 표시 */}
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
              {data.localAddress &&
              <p>만남장소 : {data.localPlace}<br/>
                만남주소 : {data.localAddress}</p>
              }
              <p>{dayjs(data.creatAt).format("YYYY/MM/DD HH:mm:ss")}</p>
              {imgData && <img src={`/boardImg/${imgData.imgName}`} style={{ width: '100px' }}  />}
            </div>
            {/*############################# 게시글 끝  ###################################*/}

            {/*############################# 지도보기 시작  ###################################*/}
            {data.latitude > 0 &&
            <div className="write-post-content-btns">
              {/* showMap 상태에 따라 MapComponent를 표시 또는 숨김 */}
              <input
                  type="button"
                  className="map-attach-btn"
                  onClick={toggleMap}
                  value={showMap ? "지도 숨기기" : "지도 보기"}
              >
              </input>
            </div>
            }
            <div className="write-title-box">
              <input type="text"
                     className="write-map-location"
                     max={10}
                     name="latitude" id='latitude'  ref={latitudeInputRef}
                     value={data.latitude}
                     placeholder="위도" />
              <input type="text"
                     className="write-map-location"
                     max={10}
                     name="longitude" id='longitude'  ref={longitudeInputRef}
                     value={data.longitude}
                     placeholder="경도" />
            </div>
            <div className="write-post-map-place">
              <div className="write-post-map"></div>
            </div>

            <div>
              {/* showMap 상태에 따라 MapComponent를 표시 또는 숨김 */}
              {showMap && <MapComponentView  latitude={data.latitude} longitude={data.longitude} />}
            </div>
            {/*############################# 지도보기 끝  ###################################*/}
            {(data.userId === userInfo.uid || userInfo.status === "S") &&
            <div className="post-main-content-btns">
              <input
                type="button"
                className="post-modify-btn"
                onClick={handleEditClick}
                value="수정"
              ></input>

              <input
                type="button"
                className="post-delete-btn"
                onClick={handleDeleteClick}
                value="삭제"
              ></input>
            </div>
            }
          </div>
          <div className="post-user-info">
            <div className="post-user-img">
              <img src={imgSrc} alt="" />
            </div>
            <div className="post-user-information">
              <div className="post-users-infos post-user-nick-name">
                <p>닉네임</p>
                <p>{userInfo.nickname}</p>
              </div>
              <div className="post-users-infos post-user-gender">
                <p>성별</p>
                {userInfo.uid !=="" ?(
                <p>{gender === "F" ? "여성" : "남성"}</p>
                ):(
                    <p></p>
                )
                }
              </div>
              <div className="post-users-infos post-user-manner">
                <p>매너지수</p>
                <p>{mannerScore && mannerScore}</p>
              </div>
              <div className="post-users-infos post-user-introduce"></div>
            </div>
            {/*###################### 게시글 신고 시작 #########################*/}
            {(userInfo.uid!=="" ) &&
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="siren icon icon-tabler icon-tabler-urgent"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#dc143c"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={handleMainPostReportButtonClick}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
              <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
              <path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
            </svg>
            }
            {/*###################### 게시글 신고 끝 #########################*/}
          </div>
          <div className="post-user-comment">
            <ul className="comment-place">
              {commentList.map((commentInfo, index) => (
                <li className="write-comment" key={commentInfo.id}>
                  {isEditingComment[commentInfo.id] ? (
                    // 수정 폼 표시
                    <div>
                      <textarea
                        name="content"
                        id="content"
                        required
                        className="write-comment-text"
                        value={editedComments[commentInfo.id] || ""} // 기존 내용 또는 빈 문자열로 설정
                        onChange={(e) =>
                          setEditedComments({
                            ...editedComments,
                            [commentInfo.id]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="board-view-recomment-about board-view-recomment-save"
                        onClick={(e) =>
                          handleEditCommentSubmit(e, commentInfo.id)
                        }
                      >
                        저장
                      </button>
                      <button
                        className="board-view-recomment-about board-view-recomment-cancel"
                        onClick={() => handleToggleEditComment(commentInfo.id)}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    // 수정 폼이 아닌 경우
                    (commentInfo.userId !== userInfo.uid && userInfo.uid!=="" ) &&
                      <div className="comment-modify-box">
                        <p>{commentInfo.content}</p>
                        <p>{commentInfo.id}</p>
                        <div className="comment-about-btns">
                          <button
                            className="comment-modify-btn comment-about-btn"
                            onClick={() =>
                              handleToggleEditComment(commentInfo.id)
                            }
                          >
                            수정
                          </button>
                          <button
                            className="comment-delete-btn comment-about-btn"
                            onClick={() => handleDeleteComment(commentInfo.id)}
                          >
                            삭제
                          </button>

                        {/* ########################## 댓글 신고 버튼  ######################*/}

                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="siren2 icon icon-tabler icon-tabler-urgent"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#dc143c"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              onClick={() => handleCommentReportButtonClick(commentInfo.id, commentInfo.userId)}
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
                            <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                            <path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
                          </svg>

                        </div>
                      </div>

                  )}
                </li>
              ))}
              <form onSubmit={submitHandler}>
                <li className="write-comment">
                  <textarea
                    name="content"
                    id="content"
                    required
                    className="write-comment-text"
                    ref={commentInputRef}
                  ></textarea>
                  <input
                    type="submit"
                    value="댓글작성"
                    className="board-view-comment-write"
                  />
                </li>
              </form>
            </ul>
          </div>

        </div>
        <div className="board-paging"></div>
      </section>
    </div>
  );
}

export default BoardViewForm;