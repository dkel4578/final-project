import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import "../css/index.css";
import "../css/total.css";
import "../css/board.css";
import "../css/variables.css";
import "../css/post-content.css";



function BoardViewForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id'); // Extract id from URL parameter
  const [data, setData] = useState('');
  const { kind } = useParams(); // kind 값을 추출



  const fetchData = () => {
    fetch(`/api/board/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log("data  ========> ",data)
          setData(data);
        })
  }

  useEffect(() => {
    fetchData();
  },[id]);

  const handleEditClick = () => {
    // 수정 페이지로 이동
    navigate(`/board/edit?id=${data.id}`);
  };

  const handleDeleteClick = () => {
    // 수정 페이지로 이동
    navigate(`/board/delete?id=${data.id}`);
  };


  return (

      <div className="body">
        <div className="header-inner">

          <section className="coffee-board">
            <div className="board-kind">
              <Link to="/board/C" className={kind === 'C' ? 'active' : ''}>
                커피한잔할래요
              </Link>
              <Link to="/board/T" className={kind === 'T' ? 'active' : ''}>
                같이여행갈래요
              </Link>
              <Link to="/board/F" className={kind === 'F' ? 'active' : ''}>
                같이식사할래요
              </Link>
              <Link to="/board/A" className={kind === 'A' ? 'active' : ''}>
                술한잔할래요
              </Link>
            </div>
            <div className="search-area">
            </div>
            <div className="post-content-inner">
              <div className="post-title">{data.title}</div>
              <div className="post-main-contents">
                <div className="post-main-content">
                  {/* quill 에디터로 작성된 HTML 내용을 표시 */}
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  <p>
                    {dayjs(data.creatAt).format('YYYY/MM/DD HH:mm:ss')}
                  </p>
                </div>
                <div className="post-main-content-btns">
                  <input type="button"
                         className="post-modify-btn"
                         onClick={handleEditClick}
                         value="수정"></input>
                  <input type="button"
                         className="post-delete-btn"
                         onClick={handleDeleteClick}
                         value="삭제"></input>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="siren icon icon-tabler icon-tabler-urgent" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#dc143c" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
                  <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                  <path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
                </svg>
              </div>
              <div className="post-user-comment">
                <ul className="comment-place">
                  <li className="comment-place-content">
                    <div className="comment-place-content-user-info">
                      <div className="user-nick-name">
                        <p>홍찰찰옥수수</p>
                      </div>
                      <div className="user-gender">
                        {/*<p>{{성별 데이터로}}</p>*/}
                      </div>
                      <div className="user-manner">
                        <p>매너점수 : 데이터로</p>
                      </div>
                    </div>
                    <div className="btnsAndtext">
                      <div className="comment-place-content-main-text">
                        <p>
                          {/*{{댓글}}*/}
                        </p>
                      </div>
                      <div className="comment-place-content-timeAndbtns">
                        <div className="comment-time">
                          {/*<p>{{데이터로 시간 끌어오기}}</p>*/}
                        </div>
                        <div className="modify-delete-btns">
                          <input
                              type="button"
                              className="modify-btn"
                              value="수정" />
                            <input type="button" className="delete-btn" value="삭제" />
                        </div>
                        <div className="reply-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-urgent siren2" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#dc143c" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
                            <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                            <path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
                          </svg>
                          <input type="button" value="답글" />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="recomment-place-content">
                    <div className="recomment-place-content-user-info">
                      <div className="user-nick-name">
                        <p>홍독배</p>
                      </div>
                      <div className="user-gender">
                        <p>남성</p>
                      </div>
                      <div className="user-manner">
                        <p>매너점수 : 3.8</p>
                      </div>
                    </div>
                    <div className="btnsAndtext">
                      <div className="recomment-place-content-main-text">
                        <p>
                          {/*{{댓글}}*/}
                        </p>
                      </div>
                      <div className="recomment-place-content-timeAndbtns">
                        <div className="recomment-time">
                          <p>
                            {/*{{데이터로 시간 끌어오기}}*/}
                          </p>
                        </div>
                        <div className="modify-delete-btns">
                          <input type="button" className="modify-btn" value="수정" />
                            <input type="button" className="delete-btn" value="삭제" />
                        </div>
                        <div className="reply-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" className="siren2 icon icon-tabler icon-tabler-urgent" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#dc143c" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
                            <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                            <path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
                          </svg>
                          <input type="button" value="답글" />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="write-comment">
                    <textarea className="write-comment-text"></textarea>
                    <input type="button" value="답변하기" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="board-paging">

            </div>
          </section>
        </div>

      </div>
  )
}

export default BoardViewForm
