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
    //const { kind } = useParams(); // kind 값을 추출
    const kind: string = searchParams.get('kind');
    const [cookies] = useCookies(['token']);
    const [userData, setUserData] = useState(null); // 쿠키에서 유저정보 가져오기
    const descInputRef = useRef(null);
    const titleInputRef = useRef(null);
    const [desc, setDesc] = useState('');
    const [imageSrc, setImageSrc] = useState(""); //이미지 정보
    const [imgData, setImgData] = useState(''); // 게시글 이미지
    const fileInputRef = useRef(null);
    const [localAddress, setLocalAddress] = useState(''); // 주소 상태 변수 추가
    const localAddressInputRef = useRef(null);
    const [localPlace, setLocalPlace] = useState(''); // 장소 상태 변수 추가
    const localPlaceInputRef = useRef(null);
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
            fetchImgData();
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
                // navigate(`/board/view?id=${data.id}&kind=${kind}`);
                window.location.href = `/board/view?id=${id}&kind=${kind}`;
            } else {
                alert('게시글 수정이 실패되었습니다.');
            }
        });
    };

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

    // setImageSrc("/boardImg/"+`${imgData.imgName}`);
    // console.log("imageSrc +++++++++++",imageSrc);

    //게시글 사진 업로드
    const onUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageSrc(reader.result);
            };

            const formData = new FormData();
            const userId = userData;

            formData.append("file", file);
            formData.append("userId", userId);
        }
    };

    return (
        <div className="body">
            <form onSubmit={submitHandler}>
                <div className="header-inner">
                    {/* ... */}
                    <section className="post-content-modify">
                        <div className="board-kind">
                            <Link to={`/board/${kind}`} className={kind === 'C' ? 'active' : ''}>
                                커피한잔할래요
                            </Link>
                            <Link to={`/board/${kind}`} className={kind === 'T' ? 'active' : ''}>
                                같이여행갈래요
                            </Link>
                            <Link to={`/board/${kind}`} className={kind === 'F' ? 'active' : ''}>
                                같이식사할래요
                            </Link>
                            <Link to={`/board/${kind}`} className={kind === 'A' ? 'active' : ''}>
                                술한잔할래요
                            </Link>
                        </div>
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
                            <div className="post-main-modify-content">
                                    <Editor
                                        value={desc}
                                        onChange={onEditorChange}
                                        ref={descInputRef}
                                    />
                            </div>
                            <div><br/><br/><br/></div>
                            {data.localPlace &&
                            <div className="write-title-box">
                                <input type="text"
                                       className="write-title"
                                       max={70}
                                       value={data.localPlace}
                                       name="localPlace" id='localPlace'  ref={localPlaceInputRef}
                                        />
                            </div>
                            }
                            {data.localAddress &&
                            <div className="write-title-box">
                                <input type="text"
                                       className="write-title"
                                       max={70}
                                       value={data.localAddress}
                                       name="localAddress" id='localAddress'  ref={localAddressInputRef}
                                        />
                            </div>
                            }
                            {/*<div className="post-main-content-modify-btns">*/}
                            {/*    <input*/}
                            {/*        type="button"*/}
                            {/*        className="map-attach-btn"*/}
                            {/*        value="지도 첨부"*/}
                            {/*    />*/}
                            {/*    <input*/}
                            {/*        type="button"*/}
                            {/*        className="image-attach-btn"*/}
                            {/*        value="이미지 첨부"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="post-main-content-modify-btns">
                                {imgData && <img src={`/boardImg/${imgData.imgName}`} style={{ width: '100px' }}  />}
                                {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ width: '100px' }} />}
                            </div>
                            <div className="post-main-content-modify-btns">
                                <input
                                    type="file"
                                    className="image-attach-btn"
                                    accept="image/*"
                                    onChange={onUpload}
                                    ref={fileInputRef}
                                ></input>

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
