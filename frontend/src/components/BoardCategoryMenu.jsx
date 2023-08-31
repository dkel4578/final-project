import {Link} from "react-router-dom";
import React from "react";

const BoardCategoryMenu = ({ kind }) => {
    return (
        <div className="board-kind">
            <Link to="/board/C" className={kind === "C" ? "active" : ""}>
                카페 가치
            </Link>
            <Link to="/board/T" className={kind === "T" ? "active" : ""}>
                놀러 가치
            </Link>
            <Link to="/board/F" className={kind === "F" ? "active" : ""}>
                한끼 가치
            </Link>
            <Link to="/board/A" className={kind === "A" ? "active" : ""}>
                한잔 가치
            </Link>
        </div>
    )
}
export default BoardCategoryMenu;