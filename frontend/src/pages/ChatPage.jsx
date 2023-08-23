import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import styled from "styled-components";
import { actionCreators as chattingActions } from "../store/modules/chatting";
import Swal from "sweetalert2";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

import "../css/chatting.css";

function ChatPage(chatRoomProps) {
  const location = useLocation();
  const props = location.state && location.state.chatRoomProps;
  console.log("ChatPage props:", props);
  console.log("ChatPage chatRoomProps:", chatRoomProps);
  const navigate = useNavigate();
  const messageRef = useRef(null);
  const userInfo = useSelector((state) => state.user.user);
  // console.log('ChatPage userInfo:', userInfo);
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);
  const stompClient = useRef({});
  let { channelId } = useParams();
  console.log("channelId: ", channelId);
  console.log("roomId: ", props.id);
  // const chatRoomNumber = Number(channelId);
  const roomId = props.id;
  const chatRoomNumber = props.id;

  const chatConnect = () => {
    if (chatRoomNumber === 0) {
      const chatRoomName = prompt("채팅방 이름을 넣어주세요");

      // 채팅방 새로 생성
      if (chatRoomName) {
        dispatch(
          chattingActions.createChatRoomAPI({
            chatRoomName: chatRoomName,
            uid: userInfo.uid,
          })
        );
        // navigate('/chat/room/list');
        // return;
      } else return;
    } else if (isNaN(chatRoomNumber)) {
      alert("잘못된 경로로 대화방에 들어왔네요~~ ㅠㅠ");
      return;
    }

    stompClient.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/ws-stomp/chat"), // proxy를 통한 접속
      // connectHeaders: {
      //   "auth-token": "spring-chat-auth-token1",
      //   "Authorization": "spring-chat-auth-token2",
      // },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("stompSockjs connect success");

        // 채팅방에 대한 구독
        chatSubscribe();
      },
      onStompError: (frame) => {
        console.error("onStompError frame:", frame);
      },
      onDisconnect: () => {
        console.log("stompSockjs disconnect success");
        chatDisconnect();
      },
    });

    stompClient.current.activate();
  };

  const chatPublish = (_chatting, _channelId) => {
    if (!stompClient.current.connected) return;

    stompClient.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        roomId: _channelId,
        userId: userInfo.uid,
        chat: _chatting,
      }),
    });
  };

  useEffect(()=>{
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
    fetch(`api/messageHistory?roomId=${encodeURIComponent(roomId)}`,{
      method: "GET",
      headers : {
        "Content-Type" : jsonContent,
      }
    })
    .then((res)=>{
      if(!res.ok){
        Swal.fire({
          icon: "error",
          title: "채팅", // Alert 제목
          text: "채팅 메세지 호출에 실패하였습니다.",
          width: 360, // Alert 내용
        });
      }
    })
    .then((data) =>{
      const updatedMessageList = [...messageList];
      data.forEacth(item =>{
        if(item.message != null){
          updatedMessageList.push(item.message);
        }
      })
      setMessageList(updatedMessageList);
    })
  }, [])

  const chatSubscribe = () => {
    stompClient.current.subscribe("/sub/chat/room/" + roomId, (response) => {
      // console.log('subscribe body', response.body);
      if (!userInfo.uid) {
        alert("비상적으로 접근하여 채팅 사용을 할 수 없습니다.");
        setChattingMesssageList([]);
        return;
      }
      const jsonBody = JSON.parse(response.body);
      chattingMessageList = chattingMessageList.map((msg, idx) => {
        ++keyId;
        return msg;
      });

      let myOther = "";
      // if (Number(jsonBody.writerId) != Number(localStorage.getItem('uid'))) {
      if (jsonBody.userId != userInfo.uid) {
        myOther = "other-msg";
      } else {
        myOther = "my-msg";
      }

      // chattingMessageList = chattingMessageList.concat(<li key={++keyId}>{jsonBody.chat}</li>)
      chattingMessageList = chattingMessageList.concat(
        <li key={++keyId}>
          <div className={myOther}>
            <div className="msg">
              <pre>{jsonBody.chat}</pre>
            </div>
          </div>
        </li>
      );
      setChattingMesssageList(chattingMessageList);

      window.scrollTo(0, document.body.scrollHeight);
    });
  };

  const chatDisconnect = () => {
    if (stompClient && stompClient.current) stompClient.current.unsubscribe();
  };

  useEffect(() => {
    chatConnect(userInfo.uid);
    input.current.focus();

    return () => {
      chatDisconnect();
    };
  }, []);

  let [chattingMessageList, setChattingMesssageList] = useState([]);
  let keyId = 0;

  const handleChatSend = (event) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();

    chatPublish(event.target.value, roomId);

    chattingMessageList = chattingMessageList.map((msg, idx) => {
      ++keyId;

      // return <li key={keyId}>{msg}</li>
      return msg;
    });
    chattingMessageList = chattingMessageList.concat(
      <li key={++keyId}>
        <div className="my-msg">
          <div className="msg">
            <pre>{event.target.value}</pre>
          </div>
        </div>
      </li>
    );
    // chattingMessageList = chattingMessageList.concat(<li key={++keyId}>{event.target.value}</li>)
    // setChattingMesssageList([...chattingMessageList, <li key={++keyId}>{event.target.value}</li>]);

    setChattingMesssageList(chattingMessageList);

    input.current.value = "";
    input.current.focus();
    setIsButtonEnabled(false);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const input = useRef();
  const keyPress = (e) => {
    if ((e.target.value.search(/\S/) != -1) === true) {
      if (e.key === "Enter") {
        handleChatSend(e);
      }
    }
  };

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const changeTextField = (e) => {
    input.current.value = e.target.value;
    if (e.target.value) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  // useEffect(() => {
  //   // const accessToken = new URL(window.location.href).searchParams.get('accessToken');
  //   const accessToken = window.location.pathname.split("/").pop();
  //   console.log('aaaaaa:', accessToken);
  //   // navigate(0);
  // }, [dispatch]);

  return (
    <>
      <div id="msgList">
        <ul>{chattingMessageList}</ul>
      </div>
      <form onSubmit={handleChatSend}>
        <div className="msg-send-part">
          <div id="contents">
            <TextField
              id="standard-multiline-flexible"
              multiline
              maxRows="4"
              autoComplete="off"
              style={{ margin: 8, border: 0 }}
              placeholder="메세지를 입력해주세요"
              onKeyPress={keyPress}
              fullWidth
              onChange={changeTextField}
              inputRef={input}
              margin="normal"
              ref={messageRef}
            />
          </div>
          <div id="send-btn">
            <Button
              variant="contained"
              color="primary"
              onClick={handleChatSend}
              // disabled={!isEnabled}
              disabled={!isButtonEnabled}
              style={{ marginTop: "-38px" }}
            >
              <div className={{ fontSize: "20px" }}>전송</div>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ChatPage;
