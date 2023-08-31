// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // prop-types를 임포트
import dayjs from 'dayjs';
import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';

const BoardPreview = ({ boardInfo,kind }) => {

    //console.log("BoardPreview > boardInfo =====> ", boardInfo)
    const userInfo = useSelector((state) => state.user.user); //유저 정보

    return (
        <li className="board-content" key={boardInfo.id}>
            <div className="board-info">
                <div className="board-title">

                    {kind === 'C' &&  <span>카페 가치</span>} {/* 커피*/}
                    {kind === 'T' &&  <span>놀러 가치</span>} {/* 여행*/}
                    {kind === 'F' &&  <span>한끼 가치</span>} {/* 식사*/}
                    {kind === 'A' &&  <span>한잔 가치</span>} {/* 술*/}
                    {kind === 'N' &&  <span>공지사항</span>} {/* 공지*/}
                    {kind === 'Q' &&  <span>FAQ</span>} {/* FAQ*/}                    
                    <Link to ={`/board/view?id=${boardInfo.id}&kind=${kind}`}>{boardInfo.title}</Link>

                </div>
                <div className="board-user-log">
                    <span>글쓴이 {boardInfo.nickname}/{boardInfo.id}</span>
                    <span>/시간: {dayjs(boardInfo.creatAt).format('YYYY/MM/DD HH:mm:ss')}</span>
                    <span> / 조회수: {boardInfo.cnt}</span>
                </div>
            </div>
            <a href="#" className="board-comment">
                <span>{boardInfo.commentCount}</span>
                <span>댓글</span>
            </a>
        </li>
    );
};

BoardPreview.propTypes = {
    boardInfo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        creatAt: PropTypes.string.isRequired,
        cnt: PropTypes.number.isRequired,
    }).isRequired,
    kind: PropTypes.string.isRequired, // kind 프로퍼티 추가
};

export default BoardPreview;
