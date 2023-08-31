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
import { navigate } from 'jsdom/lib/jsdom/living/window/navigation';
import MapComponent from "./MapComponent";
import BoardCategoryMenu from "./BoardCategoryMenu"; //에디터



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
    const latitudeInputRef = useRef(null); // 위도
    const [latitude, setLatitude] = useState(''); // 위도 상태 변수 추가
    const longitudeInputRef = useRef(null); // 경도
    const [longitude, setLongitude] = useState(''); // 경도 상태 변수 추가
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
                setLocalPlace(data.localPlace);
                setLocalAddress(data.localAddress);
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
        const enteredLocalPlace = localPlaceInputRef.current.value;
        const enteredLocalAddress = localAddressInputRef.current.value;
        const enteredLatitude = latitudeInputRef.current.value;
        const enteredLongitude = longitudeInputRef.current.value;

        console.log("장소 변경값들: ======> ",enteredLocalPlace, enteredLocalAddress, enteredLatitude, enteredLongitude);

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
                localPlace: enteredLocalPlace,
                localAddress: enteredLocalAddress,
                latitude: enteredLatitude,
                longitude: enteredLongitude,
            }),
        }).then((data) => {
            if (data && data.status === 200) {
                alert('게시글이 수정되었습니다.');
                // navigate(`/board/view?id=${data.id}&kind=${kind}`);
                window.location.href = `/final-project/board/view?id=${id}&kind=${kind}`;
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



    return (
        <div className="body">
            <form onSubmit={submitHandler}>
                <div className="header-inner">
                    {/* ... */}
                    <section className="post-content-modify">
                        {/* ########################  보드 카테고리 메뉴 시작  ################################*/}
                        <BoardCategoryMenu kind={kind} />
                        {/* ########################  보드 카테고리 메뉴 끝  ################################*/}
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
                            {localPlace &&
                            <div className="write-location-box">
                                <p className= "write-location-name">장소 :</p>
                                <input type="text"
                                       className="write-place-address"
                                       max={70}
                                       value={localPlace}
                                       name="localPlace" id='localPlace'  ref={localPlaceInputRef}
                                        />
                            </div>
                            }
                            {localAddress &&
                            <div className="write-address-box">
                                <p className= "write-address-name">주소 : </p>
                                <input type="text"
                                       className="write-place-address"
                                       max={70}
                                       value={localAddress}
                                       name="localAddress" id='localAddress'  ref={localAddressInputRef}
                                        />
                            </div>
                            }
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
