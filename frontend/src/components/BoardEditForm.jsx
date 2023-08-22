import React, { useState, useEffect, useRef } from 'react';
import { useLocation  } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';
import '../css/index.css';
import '../css/total.css';
import '../css/board.css';
import '../css/variables.css';
import '../css/post-content-modify.css';
import Editor from './EditorComponent.jsx';
import { navigate } from 'jsdom/lib/jsdom/living/window/navigation'; //에디터

function BoardEditForm() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id'); // Extract id from URL parameter
    const { kind } = useParams(); // kind 값을 추출

    const [cookies] = useCookies(['token']);
    const [userData, setUserData] = useState(null); // 쿠키에서 유저정보 가져오기

    const descInputRef = useRef(null);
    const titleInputRef = useRef(null);

    const [desc, setDesc] = useState('');
    const [data, setData] = useState({
        title: '',
        content: '',
    });

    function onEditorChange(value) {
        setDesc(value);
    }


    const fetchData = () => {
        fetch(`/api/board/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setDesc(data.content);
            });
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDesc = desc;

        if (enteredDesc.trim() === '') {
            alert('게시글 내용을 입력해주세요.');
            return;
        }

        const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

        fetch(`/api/board/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': jsonContent,
            },
            body: JSON.stringify({
                title: enteredTitle,
                content: enteredDesc,
            }),
        }).then((data) => {
            if (data && data.status === 200) {
                alert('게시글이 수정되었습니다.');
                // navigate(`/board/view?id=${data.id}`);
                window.location.href = `/board/view?id=${id}`;
            } else {
                alert('게시글 수정이 실패되었습니다.');
            }
        });
    };

    return (
        <div className="body">
            <form onSubmit={submitHandler}>
                <div className="header-inner">
                    {/* ... */}
                    <section className="post-content-modify">
                        <div className="post-content-modify-inner">
                            <div className="post-modify-title">
                                <div className="write-title-box">
                                    <input
                                        type="text"
                                        className="write-title"
                                        name="title"
                                        id="title"
                                        required
                                        ref={titleInputRef}
                                        value={data.title}
                                        onChange={(e) =>
                                            setData({ ...data, title: e.target.value })
                                        }
                                        placeholder="게시글 제목을 입력해주세요"
                                    />
                                </div>
                            </div>
                            <div className="post-main-modify-contents">
                                <div className="post-main-modify-content">
                                    <Editor
                                        value={desc}
                                        onChange={onEditorChange}
                                        ref={descInputRef}
                                    />
                                </div>
                            </div>
                            <div className="post-main-content-modify-btns">
                                <input
                                    type="button"
                                    className="map-attach-btn"
                                    value="지도 첨부"
                                />
                                <input
                                    type="button"
                                    className="image-attach-btn"
                                    value="이미지 첨부"
                                />
                            </div>
                            <div className="modify-complete-btn-place">
                                <input
                                    type="submit"
                                    className="modify-complete-btn"
                                    value="작성 완료"
                                />
                            </div>
                        </div>
                    </section>
                    {/* ... */}
                </div>
            </form>
        </div>
    );
}

export default BoardEditForm;
