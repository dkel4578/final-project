// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // prop-types를 임포트
import dayjs from 'dayjs';

const BoardPreview = ({ boardInfo }) => {

    //console.log("BoardPreview > boardInfo =====> ", boardInfo)

    return (
        <li className="board-content" key={boardInfo.id}>
            <div className="board-info">
                <div className="board-title">
                    <span>커피한잔할래요</span>
                    <a href={`/board/view?id=${boardInfo.id}`}>{boardInfo.title}</a>
                </div>
                <div className="board-user-log">
                    <span>글쓴이 홍찰찰</span>
                    <span> / 시간: {dayjs(boardInfo.creatAt).format('YYYY/MM/DD HH:mm:ss')}</span>
                    <span> / 조회수: {boardInfo.cnt}</span>
                </div>
            </div>
            <a href="#" className="board-comment">
                <span>10</span>
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
};

export default BoardPreview;