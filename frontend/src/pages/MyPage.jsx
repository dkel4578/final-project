import React from 'react' // eslint-disable-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import { useCookies } from 'react-cookie'; // eslint-disable-line no-unused-vars
import Swal from 'sweetalert2'; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/variables.css";
import "../script/custom.js";
import "../css/my-page.css";
import "../script/my-page.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

function MyPage() {
  const userInfo = useSelector((state) => state.user.user);
  const [cookies] = useCookies(['token']);
	let isLogin = userInfo.isLogin
	const navigate = useNavigate();  // eslint-disable-line no-unused-vars
  const passwordRef = useRef(null);

  const [imgSrc, setImgSrc] = useState('/profileImg/default-image.svg')


	const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

  //프로필 이미지 정보 가져오기
  // useEffect(() => {
  //   if (isLogin) {
  //     fetch(`/api/profile/me?userId=${encodeURIComponent(userInfo.uid)}`, {
  //       method: 'GET',
  //       headers: {
  //         "Content-Type": jsonContent,
  //       },
  //     })
  //     .then(res => {
  //       console.log(res)
  //       if (!res.ok) {
  //         throw new Error('Response was not OK');
  //       } else {
  //         return res.blob();
  //       }
  //     })
  //     .then(data => {
  //       if (data) {
  //         console.log(data)
  //         const imageUrl = URL.createObjectURL(data);
  //         console.log(imageUrl)
  //         setImgSrc(imageUrl);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  //   }
  // }, [isLogin, userInfo.uid]);

  useEffect(() => {
    const fetchImage = async () =>{
      try{
        const res = await axios.get(`/api/profile/me/${userInfo.uid}`, {
          responseType : "blob", 
        })
        const imageUrl = URL.createObjectURL(res.data);
        console.log(imageUrl)
        setImgSrc(imageUrl);
      } catch (error){
        console.log(error);
      }
    }
    fetchImage();
  }, [userInfo.uid])

  // 비밀번호 확인
  const passwordCheckHandler = async (e) =>{
    e.preventDefault();
    const password = passwordRef.current.value;

    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

    fetch('/api/checkPwd', {
      method: 'POST',
      headers : {
        "Content-Type" : jsonContent,
      },
      body :JSON.stringify({
        password : password,
        id : userInfo.uid
      })
    })
    .then(res => {
      if(res.status !== 200){
        return  Swal.fire({
          icon : 'error',
          title : '오류',         // Alert 제목
          text : "비밀번호가 올바르지 않습니다.",
          width: 300,  // Alert 내용 
        });
      } 
      else{
        return Swal.fire({
          icon : 'success',
          title : '성공',         // Alert 제목
          text : "유저정보 변경 페이지로 이동합니다.",
          width: 300,  // Alert 내용 
        }).then(() => {
          navigate("/changeInfo"); // Move this line inside the .then() block
        });
      }
      // return res.json();
    })
  }
  const [isValid, setIsValid] = useState(false);
  const handleClassName = () => {
    setIsValid(!isValid);
  };

  return (
    <div>
      <section className='my-page-container'>
      <div className="my-page-inner">
      <div className={`my-page-modal ${isValid ? "active" : ""}`}>
        <div className="modal-content">
          <i className="fa fa-times modal-close" onClick={handleClassName}></i>
          <fieldset>   
            <legend>비밀번호 입력</legend>
            <div className="my-page-modal-pw-container">
              <input type="password" placeholder="비밀번호를 입력해주세요." ref={passwordRef}/>
              <i className="bi bi-key-fill key"></i> 
              <i className="bi bi-eye-slash toggle-eye"></i>       
            </div>
          </fieldset>
          <div className="change-info-btn">
            <a onClick={passwordCheckHandler}>정보 수정하러 가기</a>
          </div>
        </div>
      </div>
        <h1 className="my-page-title">나의 정보</h1>
        <div className="picture-place">
          <div className="user-profile-img">
            <img src={imgSrc} alt="유저 프로필사진" />
          </div>
          <div className="user-nick-names">
            <p>{userInfo.nickname}</p>
            <p>{userInfo.loginId}</p>
          </div>
        </div>
        <div className="user-info-place">
          <div className="user-info-place-inner">
            <div className="user-basic-info">
              <div className="user-name-place user-place">
                <p>이름</p>
                <p>{userInfo.name}</p>
              </div>
              <div className="user-gender-place user-place">
                <p>성별</p>
                { userInfo.gender === "M" && <p>남성</p>}
                { userInfo.gender === "F" && <p>여성</p>}
              </div>
              <div className="user-phone-place user-place">
                <p>휴대폰 번호</p>
                <p>{userInfo.phone}</p>
              </div>
              <div className="user-birth-place user-place">
                <p>생년월일</p>
                <p>{userInfo.birth}</p>
              </div>
            </div>
            <div className="user-introduce">
              <div className="user-introduce-title">자기소개</div>
              <div className="user-introduce-content">
                <p>
                 {userInfo.profileMessage}
                </p>
              </div>
            </div>
            <div className="info-change-btn">
              <input type="button" value="정보 수정" className="info-change-button" onClick={handleClassName} />
            </div>
          </div>
        </div>
      </div>

    </section>
      
    </div>
  )
}

export default MyPage
