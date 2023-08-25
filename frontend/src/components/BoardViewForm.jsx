import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "../css/index.css";
import "../css/total.css";
import "../css/board.css";
import "../css/variables.css";
import "../css/post-content.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/post-content.js";
import "../script/custom.js";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";


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
  const [userData, setUserData] = useState(null); // 쿠키에서 유저정보 가져오기
  const [userNickname, setUserNickname] = useState(null); // 쿠키에서 유저정보 가져오기 / 닉네임
  const [userGender, setUserGender] = useState(null); // 쿠키에서 유저정보 가져오기 / 성별
  const userInfo = useSelector((state) => state.user.user); //유저 정보




  const commentInputRef = useRef(null);
  const commentInputRef2 = useRef(null);
  const parentId = useRef(null); //대댓글 id
  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;


  console.log(window.location.href);
  console.log("kind  ===>", kind);
  console.log("토큰: ", cookies.token);

  //************************
  // enum 유형으로 설정
  //************************
  BoardViewForm.propTypes = {
    kind: PropTypes.oneOf(['N', 'Q', 'F', 'C', 'A', 'T']).isRequired,
  };




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
          console.log("이미지: ==============> ",res);
          return res.json()
        })
        .then(imgInfo => {
          console.log("imgInfo  ===========================================> ",imgInfo)
          setImgData(imgInfo);
        })
        .catch(error => {
          console.error('이미지를 가져오는 중 오류 발생:', error);
          // 여기에서 오류를 처리하십시오. 예: 사용자에게 메시지 표시
        });
  }



  console.log("========================",imgData.imgSrc);


  useEffect(() => {
    fetchData();
    fetchImgData();
  },[id]);

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
        userId: userData,
        boardId: `${id}`,
      });
      console.log("response.data ============>>>>>>>>>> ", response.status);

      if (response && response.status === 201) {
        alert("댓글이 입력되었습니다..");
        // navigate(`/board/view?id=${id}`);
        window.location.href = `/board/view?id=${id}`;
      } else {
        alert("댓글 등록이 실패되었습니다.");
      }
    } catch (error) {
      console.error("Error fetching board list:", error);
    }
  };

  //****************************
  //대댓글 입력하기
  //****************************
  const submitHandler2 = async (event) => {
    event.preventDefault();
    const enteredComment2 = commentInputRef2.current.value;
    console.log("boardid: ====> ", `${id}`);
    // 유효성 체크
    if (enteredComment2 === "") {
      alert("대댓글 내용을 입력하세요");
      return; // 유효성 검사 실패 시 제출 중단
    }
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
    console.log("대댓글 내용체크 : ", enteredComment2, `${id}`);
    try {
      // if (noMoreData) {
      //   return; // 더 이상 데이터가 없을 때 요청하지 않도록 중지
      // }
      const response2 = await axios.post(`/api/comment2/insert`, {
        content: enteredComment2,
        userId: userData,
        boardId: `${id}`,
        parentId: parentId,
      });
      console.log("response.data ============>>>>>>>>>> ", response2.status);

      if (response2 && response2.status === 201) {
        alert("대댓글이 입력되었습니다..");
        // navigate(`/board/view?id=${id}`);
        window.location.href = `/board/view?id=${id}`;
      } else {
        alert("대댓글 등록이 실패되었습니다.");
      }
    } catch (error) {
      console.error("Error fetching board list:", error);
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
  
  return (
    <div className="body">
      <section className="post-content">
        <div className="user-report-modal">
          <div className="user-report-modal-contents">
            <h2 className="user-report-title">신고하기</h2>
            <i className="fa fa-times modal-close" aria-hidden="true"></i>
            <fieldset className="user-report-modal-content-field">
              <label
                htmlFor="doubling-the-post"
                className="user-report-modal-content"
              >
                <input
                  type="radio"
                  id="doubling-the-post"
                  name="report"
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
                  className="user-report-modal-content-radio"
                ></input>
                <span>광고성 게시글 / 댓글 작성</span>
              </label>
              <label htmlFor="false-review">
                <input
                  type="radio"
                  id="false-review"
                  name="report"
                  className="user-report-modal-content-radio"
                ></input>
                <span>허위 리뷰</span>
              </label>
            </fieldset>
            <div className="user-report-modal-btns">
              <input type="button" value="신고" />
              <input type="button" value="취소" id="user-report-modal-cancel" />
            </div>
          </div>
        </div>
        <div className="board-kind">
          <Link to="/board/C" className={kind === "C" ? "active" : ""}>
            커피한잔할래요
          </Link>
          <Link to="/board/T" className={kind === "T" ? "active" : ""}>
            같이여행갈래요
          </Link>
          <Link to="/board/F" className={kind === "F" ? "active" : ""}>
            같이식사할래요
          </Link>
          <Link to="/board/A" className={kind === "A" ? "active" : ""}>
            술한잔할래요
          </Link>
        </div>
        <div className="post-content-inner">
          <div className="post-title">{data.title}</div>
          <div className="post-main-contents">
            <div className="post-main-content">
              {/* quill 에디터로 작성된 HTML 내용을 표시 */}
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
              <p>{dayjs(data.creatAt).format("YYYY/MM/DD HH:mm:ss")}</p>



            </div>
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
          </div>
          <div className="post-user-info">
            <div className="post-user-img">
              <img src="" alt="" />
            </div>
            <div className="post-user-information">
              <div className="post-users-infos post-user-nick-name">
                <p>닉네임</p>
                <p>홍찰찰</p>
              </div>
              <div className="post-users-infos post-user-gender">
                <p>성별</p>
                <p>남성</p>
              </div>
              <div className="post-users-infos post-user-manner">
                <p>매너지수</p>
                <p>4.3</p>
              </div>
              <div className="post-users-infos post-user-introduce"></div>
            </div>
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
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
              <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
              <path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
            </svg>
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
                    <div>
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
                          삭제ㅁ
                        </button>
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
