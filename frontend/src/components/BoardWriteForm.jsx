import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'; // useParams 추가
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types'; // prop-types 라이브러리 import
import '../css/index.css';
import '../css/total.css';
import '../css/board.css';
import '../css/variables.css';
import '../css/write-post.css';
import Editor from "./EditorComponent.jsx";
import {useSelector} from "react-redux"; //에디터
 import MapComponent from './MapComponent';

function BoardWriteForm() { // Receive the 'kind' prop
    let navigate = useNavigate();
    const { kind } = useParams(); // kind 값을 추출
    const titleInputRef = useRef(null);
    const localPlaceInputRef = useRef(null); //만남장소
    const [localPlace, setLocalPlace] = useState(''); // 만남장소 상태 변수 추가
    const localAddressInputRef = useRef(null); // 만남주소
    const [localAddress, setLocalAddress] = useState(''); // 만남주소 상태 변수 추가
    const latitudeInputRef = useRef(null); // 위도
    const [latitude, setLatitude] = useState(''); // 위도 상태 변수 추가
    const longitudeInputRef = useRef(null); // 경도
    const [longitude, setLongitude] = useState(''); // 경도 상태 변수 추가



    // const contentInputRef = useRef(null);
    const kindInputRef = useRef(null);
    const descInputRef = useRef(null);
    const [cookies] = useCookies(['token']);
    //const [userData, setUserData] = useState(null); // 쿠키에서 유저정보 가져오기
    const [imageSrc, setImageSrc] = useState(""); //이미지 정보
    const fileInputRef = useRef(null);
    const userInfo = useSelector((state) => state.user.user); //유저 정보


    console.log("userInfo: ======>",userInfo);

    //*******************************
    //지도보이기
    //*******************************
    // 추가한 상태 변수 showMap를 통해 MapComponent를 표시 여부를 제어
    const [showMap, setShowMap] = useState(false); //지도 표시
    // "지도 첨부" 버튼을 클릭하면 MapComponent를 보여주도록 설정


    //********************************
    //지도보이기 감추기 토글
    //********************************
    const toggleMap = () => {
        setShowMap((prevShowMap) => !prevShowMap); // 상태를 반전시킵니다.
    };

    //********************************
    // 주소 클릭 이벤트 핸들러
    //********************************
    const handleAddressClick = (address, place, latitude, longitude) => {
        // 선택한 주소를 상태 변수에 저장
        setLocalAddress(address);
        setLocalPlace(place);
        setLatitude(latitude);
        setLongitude(longitude);

        // 주소 입력란에 선택한 주소를 설정
        localAddressInputRef.current.value = address;
        localPlaceInputRef.current.value = place;
        latitudeInputRef.current.value = latitude;
        longitudeInputRef.current.value = longitude;
    };

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
    // BoardWriteForm.propTypes = {
    //     kind: PropTypes.oneOf(['N', 'Q', 'F', 'C', 'A', 'T']).isRequired,
    // };


    //게시글 입력 및 파일 업로드
    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredLocalAddress = localAddressInputRef.current.value;
        const enteredLocalPlace = localPlaceInputRef.current.value;
        const enteredLatitude = latitudeInputRef.current.value;
        const enteredLongitude = longitudeInputRef.current.value;

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
        let brdId = null;

        try {
            const response = await fetch('/api/board/insert', {
                method: 'POST',
                headers: {
                    "Content-Type": jsonContent,
                },
                body: JSON.stringify({
                    kind: enteredKind,
                    title: enteredTitle,
                    localAddress: enteredLocalAddress,
                    localPlace: enteredLocalPlace,
                    latitude: enteredLatitude,
                    longitude: enteredLongitude,
                    content: enteredDesc,
                    userId: userInfo.uid,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                brdId = data; // 서버에서 게시글 ID를 반환
                console.log("게시글입력후 id: ",data);

                // 파일 업로드 처리 함수 호출
                if(imageSrc){
                    const uploadResponse = await submitHandler2();
                    if (uploadResponse.status === 200) {
                        alert('게시글이 입력되었습니다.');
                        navigate('/');
                    } else {
                        alert('게시글 등록이 실패되었습니다. 2');
                    }
                }else{
                    if(data){
                        alert('게시글이 입력되었습니다.');
                        navigate('/');
                    }else{
                        alert('게시글 등록이 실패되었습니다. 3');
                    }
                }




            } else {
                alert('게시글 등록이 실패되었습니다.');
                return;
            }
        }catch (error){
            console.error("Error creating board:", error);
            return;
        }


        // 파일 업로드 처리
        async function submitHandler2() {
        // const submitHandler2 = async (event) => {
            const file = fileInputRef.current.files[0];
            if (file) {
                const formData = new FormData();
                // const userId = userData;

                console.log("userId / brdId : ",userInfo.uid, brdId);

                formData.append("file", file);
                formData.append("userId", userInfo.uid);
                formData.append("brdId", brdId);

                try {
                    const uploadResponse = await fetch("/api/board/boardImg", {
                        method: "POST",
                        body: formData,
                    });

                    if (!uploadResponse.ok) {
                        throw new Error("File upload failed");
                    }

                    return uploadResponse; // uploadResponse를 리턴

                } catch (error) {
                    console.error("Error updating board info:", error);
                }
            }
        }
    }


    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;


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
            // const userId = userData;

            formData.append("file", file);
            formData.append("userId", userInfo.uid);
        }
    };







    return (
        <div className="body">
            <header>
                <div className="header-inner">
                    {/*카테고리*/}
                    <div className="board-kind">
                        <Link to="/board/coffee" className={kind === 'C' ? 'active' : ''}>
                            커피한잔할래요
                        </Link>
                        <Link to="/board/trip" className={kind === 'T' ? 'active' : ''}>
                            같이여행갈래요
                        </Link>
                        <Link to="/board/meal" className={kind === 'F' ? 'active' : ''}>
                            같이식사할래요
                        </Link>
                        <Link to="/board/drink" className={kind === 'A' ? 'active' : ''}>
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
                                    {userInfo.status === "S" &&
                                    <option value="N">공지사항</option>
                                    }
                                    {userInfo.status === "S" &&
                                    <option value="Q">FAQ</option>
                                    }

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
                            <div>
                                <br/><br/>
                            </div>
                            <div className="write-title-box">
                                <input type="text"
                                       className="write-title"
                                       max={70}
                                       name="localPlace" id='localPlace'  ref={localPlaceInputRef}
                                       placeholder="만남 장소를 지도에서 검색해주세요" />
                            </div>
                            <div className="write-title-box">
                                <input type="text"
                                       className="write-title"
                                       max={70}
                                       name="localAddress" id='localAddress'  ref={localAddressInputRef}
                                       placeholder="만남 주소를 지도에서 검색해주세요" />
                            </div>
                            <div className="write-title-box" >
                                <input type="text"
                                       className="write-map-location"
                                       max={10}
                                       name="latitude" id='latitude'  ref={latitudeInputRef}
                                       placeholder="위도" />
                                <input type="text"
                                       className="write-map-location"
                                       max={10}
                                       name="longitude" id='longitude'  ref={longitudeInputRef}
                                       placeholder="경도" />
                            </div>
                            <div className="write-post-map-place">
                                <div className="write-post-map"></div>
                            </div>
                        </div>
                        {/*파일 업로드*/}
                        <div className="user-profile">
                            {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ width: '100px' }} />}
                        </div>
                        <div className="user-profile">
                            <label htmlFor="image-attach-name" id="image-attach-label">
                                이미지 첨부
                            <input
                                type="file"
                                className="image-attach-btn"
                                id="image-attach-name"
                                name="image-attach-name"
                                accept="image/*"
                                onChange={onUpload}
                                ref={fileInputRef}
                            ></input>
                            </label>
                        </div>
                        <div className="write-post-content-btns">
                            {/* showMap 상태에 따라 MapComponent를 표시 또는 숨김 */}
                            <input
                                type="button"
                                className="map-attach-btn"
                                onClick={toggleMap}
                                value={showMap ? "지도 숨기기" : "지도 검색"}
                            >
                            </input>

                        </div>

                        <div>
                            {/* showMap 상태에 따라 MapComponent를 표시 또는 숨김 */}
                            {showMap && <MapComponent onAddressClick={handleAddressClick} />}
                        </div>
                        <div className="write-post-btn-place">
                            {userInfo.uid &&
                            <input type="submit" className="write-post-btn" value="등록하기" ></input>
                            }
                        </div>
                    </div>
                </form>
            </section>
        </div>
);
}


// BoardWriteForm.propTypes = {
//     kind: PropTypes.oneOf(['N', 'Q', 'F', 'C', 'A', 'T']).isRequired,
// };


export default BoardWriteForm;
