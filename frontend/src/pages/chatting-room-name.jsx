import React, { useState, useEffect } from "react";
import "../css/total.css";
import "../css/variables.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";
import "../css/chatting-room-name.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ChatProfile from "../components/ChatProfile";

const ChatName = () => {
  const userInfo = useSelector((state) => state.user.user);
  const roomId = window.location.pathname.split("/").pop();
  const navigate = useNavigate();
  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
  const [userData, setUserData] = useState([]);

  const [roomName, setRoomName] = useState("");
  useEffect(() => {
    fetch(`/api/chatUser?roomId=${encodeURIComponent(roomId)}`, {
      method: "GET",
      headers: {
        "Content-Type": jsonContent,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetch Error");
        }
        console.log("chatInvite .res >> ", res);
        return res.json();
      })
      .then((data) => {
        const userDataWithRoomId = data.map((userData) => ({
          ...userData,
          roomId: roomId,
        }));
        setUserData(userDataWithRoomId);
        console.log(userData);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/findRoomName?roomId=${encodeURIComponent(roomId)}`, {
      method: "GET",
      headers: {
        "Content-Type": jsonContent,
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        setRoomName(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [roomId]);

  const chatRoomJoinHandler = () => {
    if (userInfo.uid == null) {
      Swal.fire({
        icon: "error",
        title: "채팅방 참가", // Alert 제목
        text: "로그인을 해주세요",
        width: 360, // Alert 내용
      });
      return;
    }
    fetch(
      `/api/chatRoomJoin?roomId=${encodeURIComponent(roomId)}&userId=${
        userInfo.uid
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": jsonContent,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          Swal.fire({
            icon: "error",
            title: "채팅방 참여",
            text: "이미 참여한 채팅방입니다",
            width: 360,
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.error) {
          Swal.fire({
            icon: "error",
            title: "채팅방 참여",
            text: data.error,
            width: 360,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "채팅방 참가",
            text: "채팅방 참가에 성공하였습니다.",
            width: 360,
          });
          navigate("/chat/room/list2",true)
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <section className="chatting-room-name">
      <div className="chatting-room-name-inner">
        <div className="chatting-room-name-details">
          <h1>채팅방 참가</h1>
          <div className="chatting-room-name-item">
            <div className="chatting-room-name-title">{roomName}</div>
            {userData ? (
              userData.map((data, index) => (
                <ChatProfile
                key={index}
                userId={data.userId}
                nickname={data.nickname}/>
              ))
            ) : (
              <p></p>
            )}
            <div className="chatting-room-name-btns">
              <input
                className="chatting-room-name-btn chatting-room-name-attend-btn"
                type="button"
                value="참가"
                onClick={chatRoomJoinHandler}
              />
              <input
                className="chatting-room-name-btn chatting-room-name-exit-btn"
                type="button"
                value="취소"
                onClick={goBack}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatName;
