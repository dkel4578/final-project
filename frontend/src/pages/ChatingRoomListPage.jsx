import React from "react"; // eslint-disable-line no-unused-vars
import "../css/total.css";
import "../css/chat-list-room.css";
import "../css/variables.css";
import { Link, useHistory, useNavigate, useParams } from "react-router-dom";
import { actionCreators as chattingActions } from "../store/modules/chatting";
import ChatRoom from "../components/ChatRoom";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { customHistory } from "../store/configureStore.js";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";

import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { actionCreators as userActions } from "../store/modules/user";

function ChatingRoomListPage() {
  const navigate = useNavigate();
  
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const cookieToken = cookies.token;
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [masterId, setMasterId] = useState("");
  const [userDataList, setUserDataList] = useState([]);
  const chatRoomList = useSelector((state) => state.chatting.chatRoomList);
  const roomIds = chatRoomList.map((p) => p.id);
  const [roomId, setRoomId] = useState("");
  const [imgSrcList, setImgSrcList] = useState([]);
  const [profileImgList, setProfileImgList] = useState([]);

  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

  console.log("chatRoomList >>>>", chatRoomList)
  useEffect(() => {
    // fetch 요청을 저장할 배열
    console.log("도달하는가?")
    const fetchPromises = [];
    // roomIds 배열을 기반으로 fetch 요청을 생성하여 배열에 추가
    roomIds.forEach((roomId) => {
      fetchPromises.push(
        fetch(`/api/chatUser?roomId=${encodeURIComponent(roomId)}`, {
          method: "GET",
          headers: {
            "Content-Type": jsonContent,
          },
        })
          .then((res) => {
            console.log("res >>>>>>>>>>>>>>>>", res);
            if (!res.ok) {
              return;
            }
            return res.json();
          })
          .then((data) =>{
            console.log("DATA >>>> ", data)
          })
          .catch((error) => {
            console.log ("ERROR >>>>>> ", error)
            return null; // 에러 시에도 빈 데이터 반환
          })
      );
    });

    // 모든 fetch 요청이 완료되면 실행
    Promise.all(fetchPromises).then((results) => {
      const validData = results.filter((data) => data !== null);
      
      // userDataList와 profileImgList에 데이터 추가
      setUserDataList((prevUserDataList) => {
        const newDataList = validData.filter((data) =>
          prevUserDataList.every((prevData) => prevData.id !== data.id)
        );
  
        return [...prevUserDataList, ...newDataList];
      });
      console.log("UserData >>>>>>>>>>>>>> ", userDataList)
    });
  }, [chatRoomList, userInfo]);

  //프로필 이미지 정보 가져오기
  useEffect(() => {
   
      fetch(`/api/chatProfile?userId=${encodeURIComponent(userInfo.uid)}`, {
        method: "GET",
        headers: {
          "Content-Type": jsonContent,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Response was not OK");
          }
          return res.json();
        })
        .then((data) => {
          if (data.length > 0) {
            const updatedImgSrcList = [...imgSrcList]; // Create a copy of the existing imgSrcList
            data.forEach((item) => {
              if (item.imgSrc != null) {
                const publicIndex = item.imgSrc.indexOf("\\public\\");
                if (publicIndex !== -1) {
                  const webPath = item.imgSrc
                    .substring(publicIndex + "\\public\\".length)
                    .replace(/\\/g, "/");
                  updatedImgSrcList.push("/" + webPath); // Push the new imgSrc to the list
                }
              }
            });
            setImgSrcList(updatedImgSrcList); // Update the state with the new imgSrcList
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    
  }, [userInfo.uid]);

  const goChatRoomCreate = async (e) => {
    const result = await Swal.fire({
      icon: "info",
      title: "채팅방",
      text: "생성할 채팅방의 이름을 입력해주세요",
      input: "text",
      inputValue: e.event,
      inputPlaceholder: "채팅방 이름",
      showCancelButton: true,
      confirmButtonText: "완료",
      cancelButtonText: "취소",
      width: 360,
    });

    if (result.isConfirmed && result.value) {
      const chatRoomName = result.value;
      dispatch(
        chattingActions.createChatRoomAPI({
          chatRoomName: chatRoomName,
          uid: userInfo.uid,
        })
      );
    }
  };

  React.useEffect(() => {
    dispatch(chattingActions.getChatRoomAPI(userInfo.uid));
  }, [userInfo.uid]);

  return (
    <div>
      <section className="chat-list-room">
        <div className="chat-list-room-inner">
          <div className="chat-list-room-title">
            <i className="bi bi-chat-fill chat"></i>
            <h1>채팅방</h1>
            <i
              className="bi bi-plus-circle-fill plus"
              onClick={goChatRoomCreate}
            ></i>
          </div>
          <div className="chat-list-room-place">
            <ul className="chat-listes">
              {chatRoomList.map((p, idx) => {
                console.log("chatRoomList element:", p);
                return (
                  <ChatRoom
                    key={p.id}
                    {...p}
                    userData={userDataList[idx]}
                    imgSrc={imgSrcList[idx]}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatingRoomListPage;
{
  /* <li className="chat-list-single">
                <div className="chat-user-profile">
                  <img src="../images/user-profile-test.jpg" alt="프로필" />
                </div>
                <div className="chat-user-opponent">
                  <p>user.nickname</p> 
                  <p>user2.nickname</p> 
                </div>
                <div className="chat-sub">
                 name
                </div>
                <div className="chat-head-count">10/10</div>
                <div className="chat-list-icons">
                  <i className="bi bi-share-fill share">
                    <div className="share-box">공유하기</div>
                  </i>
                  <i className="bi bi-box-arrow-right chat-leave"></i>
                </div>
              </li> */
}
{
  /* 다른 채팅방 정보도 마찬가지로 구성 */
}
