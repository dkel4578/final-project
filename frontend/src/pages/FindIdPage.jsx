import React, { useState, useRef, useContext, useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { useNavigate, Link } from 'react-router-dom';  
import axios from 'axios';    // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/find-id.css";
import "../css/variables.css";
import $ from "jquery"; // eslint-disable-line no-unused-vars
import "../script/find-id.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import "../script/custom.js";

async function getCode(email){
  
  await axios
  .post("/api/find-id?email="+email,{
    email : email
  })
  .then((response)=>{
    console.log(response);
    // response.data.check;
  })
  .catch((error)=>{
    console.log(error);				//오류발생시 실행
  });
}
async function checkCode(email,code){
  console.log("email: ",email);
  console.log("code: ",code);

  return await axios
  .get("/api/checkCode?email="+email+"&code="+code,{
    "email" : email
    , "code" : code
  })
  .then((response)=>{
    console.log(response);
    console.log(response.data);
    return response.data;
  })
  .catch((error)=>{
    console.log(error);				//오류발생시 실행
  });
}
async function checkEmail(email){
  console.log("email: ",email);

  return await axios
  .get("/api/user/email?email="+email,{
    "email" : email
  })
  .then((response)=>{
    console.log(response);
    console.log(response.data);
    return response.data;
  })
  .catch((error)=>{
    console.log(error);				//오류발생시 실행
  });
}



const findId= async (email) =>{
  // console.log("email: ",email);

  // let myId = await findId(email);

  return await axios
  .get("/api/user/findLoginId?email="+email,{
    "email" : email
  })
  .then((response)=>{
    console.log(response);
    console.log("axios: ",response.data);
    return response.data;
  })
  .catch((error)=>{
    console.log(error);				//오류발생시 실행
  });
  
}



function FindIdPage() {


  const navigatge = useNavigate(); // eslint-disable-line no-unused-vars

  const loginId = useRef(null); // eslint-disable-line no-unused-vars

  const [email,setEmail] = useState(); // eslint-disable-line no-unused-vars
  
  const [code,setCode] = useState(); // eslint-disable-line no-unused-vars

  const [check,setCheck] = useState(null); // eslint-disable-line no-unused-vars
  

  const [id,setId] = useState(null);
  // const [userId,setUserId] = useState(null);
  


  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
    console.log("Email: " + email);
  };
  const handleCodeChange = (e) =>{
    setCode(e.target.value);
  };
  
  const handleSendEmail = async (e) =>{
    e.preventDefault();
    const resEmail = await  checkEmail(email);
    console.log("resEmail", resEmail);
    console.log(resEmail.emailCheck);
    if(resEmail.emailCheck){
      getCode(email);
      $(".after-find-id-send-eamil").css("color", "#2acf7dc4").html(email + "으로<br>인증메일을 보내드렸습니다.");
    }else{
      $(".after-send-email").css("color", "red").html(email + "은<br>존재하지 않는 메일입니다.");
    }
  }


  const handleCheckCode = async (e) =>{
    e.preventDefault();
    // checkCode(email,code);
    
    const response = await checkCode(email,code);
    console.log("res: ", response);
    setCheck(response.check);
    console.log(check);
    let userId;

    if(email === '' || email === null){
      $('.find-id-last-confirm').css("color","red");
      setId("Email을 입력해주세요.");
    }
    else if(code === '' || code === null){
      $('.find-id-last-confirm').css("color","red");
      setId("인증 번호를 입력해주세요.");    
    }
    else if(!check){
      $('.find-id-last-confirm').css("color","red");
      setId("유효기간이 만료 되었거나 인증번호가 일치하지 않습니다.");
    }else{
      
      let myId = await findId(email);
      userId = myId.userId;
      console.log(myId.userId);

      console.log("userId: ",userId);
      console.log("findId(email): ",findId(email));
      $('.find-id-last-confirm').css("color","#2acf7dc4");
      setId("회원님의 아이디는 "+ userId + " 입니다.");
    }
  }

  // useEffect(() => {
  //   const newData = findId(email).then((result) => {
  //     console.log(result); // ✅ 이 코드 추가
  //     return result;
  //   });
  //   console.log(newData);
  //   token && setDatas(newData);
  // }, [create, id]);



  return (
    <>
      <section className="find-id">
      <div className="find-id-inner">
        <h1 className="find-id-title">아이디 찾기</h1>
        <form>
          <fieldset>
          <div className="input-find-id-cf-email">
              <input type="email" placeholder="이메일을 입력해주세요." className="email-input-cf-text" onChange={handleEmailChange}/>
              <i className="bi bi-envelope-fill"></i>
            </div>
            <p className="please-find-id-email-input">이메일주소를 작성해주십시오.</p>
            <div className="email-find-id-cf-send">
              <i className="bi bi-send-fill"></i>
              <input type="button" className="email-find-id-cf-send-btn" value="인증메일 보내기" onClick={handleSendEmail}/>
            </div>
            <p className="after-find-id-send-email">메일주소 작성 시 인증번호를 보내드리겠습니다.</p>
            <div className="input-find-id-cf-number">
              <input type="text" placeholder="인증번호를 입력해주세요." className="cf-number-find-id-input-text" onChange={handleCodeChange}/>
              <i className="bi bi-envelope-check-fill"></i>
            </div>
          </fieldset>
          <div className="find-id-btn">
            <a href="#none" onClick={handleCheckCode}>아이디 찾기</a>
          </div>
          <div>
            <span className='find-id-last-confirm'>{id}</span>
          </div>
        </form>
        <div className="find-id-user-find">
          <Link to ="/signup">회원가입</Link>
          <Link to ="/passwordChange">비밀번호 변경</Link>
        </div>
      </div>
    </section>
      
    </>
  )
}

export default FindIdPage;
