import { useState, useEffect } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import "../css/index.css";
import "../css/total.css";
import "../css/board.css";
import "../css/variables.css";

function BoardEditForm() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id'); // Extract id from URL parameter
    const [data, setData] = useState('');
    const { kind } = useParams(); // kind 값을 추출



    const fetchData = () => {
        fetch(`/api/board/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setData(data);
            })
    }

    useEffect(() => {
        fetchData();
    },[id]);



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

                        <div className="write-button">
                            <a href="#none">
                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <!-- 게시글 내용 수정 -->
                    <section class="post-content-modify">
                        <div class="post-content-modify-modal">
                            <div class="user-report-modal-contents">
                                <h2>지역검색</h2>
                                <i class="fa fa-times modal-close" aria-hidden="true"></i>
                                <div class="search-map-place">
                                    <input type="text" class="search-map" placeholder="찾으시는 지역을 입력해주세요.">
                                        <i class="bi bi-search-heart"></i>
                                </div>
                                <div class="search-map-btn-place">
                                    <input type="button" value="검색" class="search-map-btn">
                                </div>
                            </div>
                        </div>
                        <div class="post-content-modify-inner">
                            <div class="post-modify-title">글제목 데이터로 불러오기</div>
                            <div class="post-main-modify-contents">
                                <div class="post-main-modify-content">
                                    <p>
                                        내용 데이터로 받아오기
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Officia sequi quam, animi distinctio, dicta doloremque esse iusto eaque sed non reprehenderit accusantium dolor soluta placeat possimus maxime vero minima aut fugiat.
                                        Voluptates provident minima amet nulla repudiandae ex, recusandae laudantium?
                                    </p>
                                </div>
                            </div>
                            <div class="post-main-content-modify-btns">
                                <input type="button" class="map-attach-btn" value="지도 첨부"></input>
                                <input type="button" class="image-attach-btn" value="이미지 첨부"></input>
                            </div>
                            <div class="modify-complete-btn-place">
                                <input type="button" class="modify-complete-btn" value="작성 완료"></input>
                            </div>
                        </div>
                    </section>
                    <!-- 게시글 내용 수정 -->

                    <!-- 푸터 -->
                    <div class="footer-include"></div>
                    <!-- 푸터 -->

                </section>
            </div>

        </div>
    )
}

export default BoardEditForm
