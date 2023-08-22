import {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'; // useParams 추가
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types'; // prop-types 라이브러리 import
import '../css/index.css';
import '../css/total.css';
import '../css/board.css';
import '../css/variables.css';
import '../css/write-post.css';
import Editor from "./EditorComponent.jsx"; //에디터
// import MapComponent from './MapComponent';

function BoardWriteForm() { // Receive the 'kind' prop
    let navigate = useNavigate();
    const { kind } = useParams(); // kind 값을 추출
    const titleInputRef = useRef(null);
    // const contentInputRef = useRef(null);
    const kindInputRef = useRef(null);
    const descInputRef = useRef(null);

    const [cookies] = useCookies(['token']);
    const [userData, setUserData] = useState(null); // 쿠키에서 유저정보 가져오기


    //**********************
    //에디터 (quill)
    //**********************
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
    setDesc(value)
    }


    //************************
    // enum 유형으로 설정
    //************************
    BoardWriteForm.propTypes = {
        kind: PropTypes.oneOf(['N', 'Q', 'F', 'C', 'A', 'T']).isRequired,
    };


    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        // const enteredContent = contentInputRef.current.value;
        const enteredKind = kindInputRef.current.value;
        const enteredDesc = desc;

        console.log("enteredKind: ====> ", enteredKind);

        // 유효성 체크
        if (enteredKind === "" || enteredKind ==="게시판을 선택해주세요") {
            alert("게시판 종류를 선택해주세요.");
            return; // 유효성 검사 실패 시 제출 중단
        }

        if (enteredDesc.trim() === "") {
            alert("게시글 내용을 입력해주세요.");
            descInputRef.current.focusEditor();
            return; // 유효성 검사 실패 시 제출 중단
        }


        const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

        fetch('/api/board/insert', {
            method: 'POST',
            headers: {
                "Content-Type": jsonContent,
            },
            body: JSON.stringify({
                kind: enteredKind,
                title: enteredTitle,
                content: enteredDesc,
                userId: userData,

            })
        }).then(data => {
            console.log(data);
            console.log('status: ', data.status);
            if (data && data.status === 201) {
                alert('게시글이 입력되었습니다..');
                navigate('/');
            } else {
                alert('게시글 등록이 실패되었습니다.');
            }
        });
    }





    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
    useEffect(() => {
        if (cookies.token) {
            fetch('/api/user/me', {
                method: 'GET',
                headers: {
                    "Content-Type" : jsonContent,
                    "Authorization" : "Bearer "+ cookies.token,
                }
            })
                .then(res => {
                    if (res) {
                        console.log(res);
                        return res.json();
                    }
                })
                .then(userData => {
                    console.log(userData);
                    setUserData(userData.id)
                })
        }
    }, [cookies.token]);

    console.log("BoardWriteFrom userData: ==========>>",userData)

    return (
        <div className="body">
            <header>
                <div className="header-inner">
                    {/*카테고리*/}
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
                </div>
            </header>
            
            {/*헤더*/}

            
            {/*게시글 작성*/}
            <section className="write-post">
                {/*서브밋*/}
                <form onSubmit={submitHandler}>
                    <div className="write-post-inner">
                        <div className="write-post-title">게시글 작성</div>
                        <div className="write-post-contents">
                            <div className="select-board-box">
                                <select id="kind" defaultValue={kind} ref={kindInputRef} required >
                                    <option>게시판을 선택해주세요</option>
                                    <option value="C">커피한잔할래요</option>
                                    <option value="T">같이여행할래요</option>
                                    <option value="F">식사같이할래요</option>
                                    <option value="A">술한잔할래요</option>
                                </select>
                            </div>
                            <div className="write-title-box">
                                <input type="text"
                                       className="write-title"
                                       name="title" id='title' required ref={titleInputRef}
                                       placeholder="게시글 제목을 입력해주세요" />
                            </div>
                            <div className="write-post-text-place">
                                <Editor value={desc} onChange={onEditorChange}  ref={descInputRef} required />
                            </div>
                            <div className="write-post-map-place">
                                <div className="write-post-map"></div>
                            </div>
                        </div>
                        <div className="write-post-content-btns">
                            <input type="button" className="map-attach-btn" value="지도 첨부"></input>
                            <input type="button" className="image-attach-btn" value="이미지 첨부"></input>
                        </div>
                        <div>
                            {/*<MapComponent />*/}
                        </div>
                        <div className="write-post-btn-place">
                            <input type="submit" className="write-post-btn" value="등록하기" ></input>
                        </div>
                    </div>
                </form>
            </section>
        </div>
);
}


BoardWriteForm.propTypes = {
    kind: PropTypes.oneOf(['N', 'Q', 'F', 'C', 'A', 'T']).isRequired,
};


export default BoardWriteForm;
