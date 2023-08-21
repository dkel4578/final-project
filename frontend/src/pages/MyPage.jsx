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

function MyPage() {

  const [cookies] = useCookies(['token']);
	let isLogin = false;
	const navigate = useNavigate();  // eslint-disable-line no-unused-vars
  const passwordRef = useRef(null);

  const [id, setId] = useState('')
	const [loginId, setLoginId] = useState(''); // eslint-disable-line no-unused-vars
	const [nickname, setNickname] = useState(''); // eslint-disable-line no-unused-vars
	const [name, setName] = useState(''); // eslint-disable-line no-unused-vars
	const [gender, setGender] = useState(''); // eslint-disable-line no-unused-vars
	const [phone, setPhone] = useState(''); // eslint-disable-line no-unused-vars
	const [profileMessage, setProfileMessage] = useState(''); // eslint-disable-line no-unused-vars
	const [birth, setBirth] = useState(''); // eslint-disable-line no-unused-vars
  const [imgSrc, setImgSrc] = useState('default-image.svg')

  
	if(cookies.token != 'undefined'){
		isLogin = true;
	} else {
		isLogin = false;
	}

	const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
  //유저 정보 가져오기
	useEffect(() => {
		if(isLogin){
			fetch('/api/user/me', {
				method: 'GET',
				headers: {
					"Content-Type" : jsonContent,
					"Authorization" : "Bearer "+ cookies.token,
				}
			})
			.then(res => {
				if(res){
					console.log(res);
					return res.json();
				}
			})
			.then(data => {
        console.log(data);
        if(data){
          setNickname(data.nickname);
          setName(data.name);
          setGender(data.gender);
          setPhone(data.phone);
          setProfileMessage(data.profileMessage);
          setLoginId(data.loginId);
          setBirth(data.birth);
          setId(data.id);
        }
      })
		}
	}, [isLogin]);

  //프로필 이미지 정보 가져오기
  useEffect(() => {
    if (isLogin) {
      fetch(`/api/profile/me?userId=${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: {
          "Content-Type": jsonContent,
        },
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Response was not OK');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        console.log(data.imgSrc);
        if (data.imgSrc != null) {
          // 로컬 파일 시스템 경로에서 \public\ 이전의 경로 제거
          const publicIndex = data.imgSrc.indexOf('\\public\\');
          if (publicIndex !== -1) {
            const webPath = data.imgSrc.substring(publicIndex + '\\public\\'.length).replace(/\\/g, '/');
            setImgSrc('/' + webPath);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  }, [isLogin, id]);

  // 비밀번호 확인
  const passwordCheckHandler = async (e) =>{
    e.preventDefault();
    const password = passwordRef.current.value;

    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

    fetch('api/checkPwd', {
      method: 'POST',
      headers : {
        "Content-Type" : jsonContent,
      },
      body :JSON.stringify({
        password : password,
        id : id
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
  return (
    <div>
      <section className='my-page-container'>
      <div className="my-page-inner">
        <h1 className="my-page-title">나의 정보</h1>
        <div className="picture-place">
          <div className="user-profile-img">
            <img src={imgSrc} alt="유저 프로필사진" />
          </div>
          <div className="user-nick-names">
            <p>{nickname}</p>
            <p>{loginId}</p>
          </div>
        </div>
        <div className="user-info-place">
          <div className="user-info-place-inner">
            <div className="user-basic-info">
              <div className="user-name-place user-place">
                <p>이름</p>
                <p>{name}</p>
              </div>
              <div className="user-gender-place user-place">
                <p>성별</p>
                { gender === "M" && <p>남성</p>}
                { gender === "F" && <p>여성</p>}
              </div>
              <div className="user-phone-place user-place">
                <p>휴대폰 번호</p>
                <p>{phone}</p>
              </div>
              <div className="user-birth-place user-place">
                <p>생년월일</p>
                <p>{birth}</p>
              </div>
            </div>
            <div className="user-introduce">
              <div className="user-introduce-title">자기소개</div>
              <div className="user-introduce-content">
                <p>
                 {profileMessage}
                </p>
              </div>
            </div>
            <div className="info-change-btn">
              <input type="button" value="비밀번호 입력하기" className="info-change-button" />
            </div>
          </div>
        </div>
      </div>
      <div className="my-page-modal">
        <div className="modal-content">
          <i className="fa fa-times modal-close" aria-hidden="true"></i>
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
    </section>
      
    </div>
  )
}

export default MyPage
