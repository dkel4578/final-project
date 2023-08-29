import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
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
import "../css/variables.css";
import "../css/total.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/chat-page.js";

function ChatPage(chatRoomProps) {
  const location = useLocation();
  const props = location.state && location.state.chatRoomProps;
  const roomId = location.state?.roomId;
  const roomName = location.state?.roomName;
  // console.log("ChatPage props:", props);
  // console.log("ChatPage chatRoomProps:", chatRoomProps);
  const navigate = useNavigate();
  const messageRef = useRef(null);
  const userInfo = useSelector((state) => state.user.user);
  // console.log('ChatPage userInfo:', userInfo);
  const dispatch = useDispatch();
  const [messageList, setMessageList] = useState([]);
  const stompClient = useRef({});
  // const chatRoomNumber = Number(channelId);
  // const roomId = location.state.roomId;

  console.log("roomId: ", roomId);
  const chatRoomNumber = roomId;
  const chatRoomName = roomName;

  scrollToBottom();

  const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
  useEffect(() =>{
    fetch(`/api/chatRoomCheck?roomId=${encodeURIComponent(roomId)}&userId=${
      userInfo.uid
    }`, {
      method: "GET",
      headers: {
        "Content-Type" : jsonContent
      }
    })
    .then((res) => {
      if(!res.ok) {
        throw new Error("fetch Error")
      }
      return res.text();
    })
    .then((data) => {
      console.log(data);
      if(!data){
        Swal.fire({
          icon: "error",
          title: "채팅방 참가", // Alert 제목
          text: "입장할 수 없는 채팅방입니다.",
          width: 360, // Alert 내용
        });
        navigate(-1);
      }
      
    })
  }, [])


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

  let [chattingMessageList, setChattingMesssageList] = useState([]);
  //채팅메세지 불러오기
  useEffect(() => {
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;
    // console.log(roomId);

    setTimeout(function () {
      fetch(`/api/messageHistory?roomId=${encodeURIComponent(roomId)}`, {
        method: "GET",
        headers: {
          "Content-Type": jsonContent,
        },
      })
        .then((res) => {
          console.log("ChatPage Res >>>>> ", res);
          if (!res.ok) {
            Swal.fire({
              icon: "error",
              title: "채팅",
              text: "채팅 메세지 호출에 실패하였습니다.",
              width: 360,
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log("ChatPage Data >>>>> ", data);
          const updatedMessageList = [];

          data.forEach((item) => {
            if (item && item.message != null) {
              updatedMessageList.push({
                message: item.message,
                userId: item.userId,
                nickname: item.nickname,
              });
            }
          });

          setMessageList(updatedMessageList);
          // window.scrollTo(0, document.body.scrollHeight);
        });
    }, 300);
  }, [roomId, chattingMessageList]);

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
      const newMessageList = [
        ...messageList,
        {
          message: jsonBody.chat,
          userId: userInfo.uid,
          nickname: jsonBody.nickname,
        },
      ];

      setMessageList(newMessageList);

      let myOther = "";
      console.log("jsonBody. >>>>>> ", jsonBody);
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



  let keyId = 0;

  const handleChatSend = (event) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();
    // alert('1111' + input.current.value);
    chatPublish(input.current.value, roomId);
    chattingMessageList = chattingMessageList.map((msg, idx) => {
      ++keyId;
      // return <li key={keyId}>{msg}</li>
      return msg;
    });
    chattingMessageList = chattingMessageList.concat(
      <li key={++keyId}>
        <div className="my-msg">
          <div className="msg">
            <pre>{input.current.value}</pre>
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
    window.scrollTo(0, document.body.scrollHeight + 20);
    console.log("스크롤 길이는 " + document.body.scrollHeight);
    scrollToBottom();
  };
  function scrollToBottom() {
    setTimeout(() => {
    var chatList = document.getElementById("msgList");
    chatList.scrollTop = chatList.scrollHeight;
    console.log(chatList);
    },600);
  }

  // 메시지가 추가될 때마다 스크롤 아래로 이동
  const input = useRef();
  const keyPress = (e) => {
    if ((e.target.value.search(/\S/) !== -1) === true) {
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
    <div className="chatting-play-box">
      <div className="user-report-modal">
        <div className="user-report-modal-contents">
          <h2 className="user-report-title">신고하기</h2>
          <i className="fa fa-times modal-close" aria-hidden="true"></i>
          <fieldset>
            <label htmlFor="doubling-the-post">
              <input type="radio" id="doubling-the-post" name="report" />
              <span>도배성 채팅 작성</span>
            </label>
            <label htmlFor="obscene-posts">
              <input type="radio" id="obscene-posts" name="report"></input>
              <span>음란성 채팅 작성</span>
            </label>
            <label htmlFor="abusive-comments">
              <input type="radio" id="abusive-comments" name="report"></input>
              <span>욕설 / 혐오 발언 채팅 작성</span>
            </label>
            <label htmlFor="advertising-post">
              <input type="radio" id="advertising-post" name="report"></input>
              <span>광고성 / 홍보성 채팅</span>
            </label>
            <label htmlFor="false-review">
              <input type="radio" id="false-review" name="report"></input>
              <span>허위 리뷰</span>
            </label>
          </fieldset>
          <div className="user-report-modal-btns">
            <input type="button" value="신고" />
            <input type="button" value="취소" id="user-report-modal-cancel" />
          </div>
        </div>
      </div>
      <div id="msgList">
        <div className="chatting-room-title">
          <Link to="/chat/room/list/:roomId">
            <i class="bi bi-arrow-left"></i>
          </Link>
          <p>{chatRoomName}</p>
        </div>
        <ul className="chatting-msg">
          {console.log(messageList)}
          {messageList.map((messageObject, index) => (
            <li
              key={index}
              className={
                messageObject.userId === userInfo.uid ? "my-msg" : "other-msg"
              }
            >
              {messageObject.userId === userInfo.uid ? (
                <div className="my-msg-block">
                  <p>{messageObject.message}</p>
                </div>
              ) : (
                <div className="message-content">
                  {messageObject.userId !== userInfo.uid && (
                    <p className="other-nickname">{messageObject.nickname}</p>
                  )}
                  <div className="other-msg-block">
                    <p>{messageObject.message}</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* <ul>{chattingMessageList}</ul> */}
      </div>
      <form className="chatting-form" onSubmit={handleChatSend}>
        <div className="msg-send-part">
          <div id="contents">
            <TextField
              id="standard-multiline-flexible"
              multiline
              maxRows="4"
              autoComplete="off"
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
            >
              <i class="chatting-send-mark bi bi-send-fill"></i>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatPage;
