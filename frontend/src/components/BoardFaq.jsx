import React, { useState, useEffect, useRef } from "react";
import "../css/total.css";
import "../css/faq.css";
import "../css/variables.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";
import "../script/faq";
import {useSelector} from "react-redux";

const BoardFaq = ({ boardInfo,kind  }) => {
    const userInfo = useSelector((state) => state.user.user); //유저 정보

    const [showFaq, setShowFaq] = useState(false);

    const toggleFaq = () => {
        setShowFaq((prevShowFaq) => !prevShowFaq);
    };

    console.log("showFaq: ======> ",showFaq);

    return (
                        <div className="faq-items">
                            <div className="faq-title"
                                 onClick={toggleFaq}>{boardInfo.title}</div>
                            {showFaq &&
                            <div className={`faq-content ${showFaq ? "active" : ""}`}>
                                <p>
                                    <div dangerouslySetInnerHTML={{ __html: boardInfo.content }} />
                                </p>
                                {userInfo.status === "S" && 
                                <div className="faq-modify-btns ">
                                    <a href="/postContentModify">
                                        <input
                                            type="button"
                                            value="수정"
                                            className="faq-modify-btn faq-btn"
                                        />
                                    </a>
                                    <input
                                        type="button"
                                        value="삭제"
                                        className="faq-delte-btn faq-btn"
                                    />
                                </div>
                                }
                            </div>
                            }
                        </div>
    );
}

export default BoardFaq;
