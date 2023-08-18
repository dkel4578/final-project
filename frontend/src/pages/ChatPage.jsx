import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as StompJs from '@stomp/stompjs';
import * as SockJS from "sockjs-client";
import styled from "styled-components"
import { actionCreators as chattingActions } from "../store/modules/chatting";
// import { actionCreators as userActions } from "../store/modules/user";

let date = new Date();
let todayDate = date.getFullYear() + "년 " + (date.getMonth()+1) + "월 " + date.getDate() + "일";

function ChatPage(props) {
  console.log('ChatPage props:', props);

  const userInfo = useSelector((state) => state.user.user);
  console.log('ChatPage userInfo:', userInfo);
  const dispatch = useDispatch();

  const [chatting, setChatting] = useState('');
  const stompClient = useRef({});
  let { channelId } = useParams();
  console.log('channelId:', channelId);
  const chatRoomNumber = Number(channelId);

  const chatConnect = () => {
    if (chatRoomNumber === 0) {
      const chatRoomName = prompt('채팅방 이름을 넣어주세요');
      console.log('chatRoomName:', chatRoomName);

      // 채팅방 새로 생성
      if (chatRoomName)
        dispatch(chattingActions.createChatRoomAPI({ chatRoomName: chatRoomName, uid: userInfo.uid }));
      else
        return;
    } else if (isNaN(chatRoomNumber)) {
      alert('잘못된 경로로 대화방에 들어왔네요~~ ㅠㅠ');
      return;
    }

    stompClient.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/ws-stomp/chat"), // proxy를 통한 접속
      // webSocketFactory: () => new SockJS("ws://localhost:9093/ws-stomp/chat"), // proxy를 통한 접속
      connectHeaders: {
        "auth-token": "spring-chat-auth-token1",
        "Authorization": "spring-chat-auth-token2",
      },
      // debug: function (str) {
      //   console.log('connect str:', str);
      // },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('stompSockjs connect success');

        // 채팅방에 대한 구독
        chatSubscribe();
      },
      onStompError: (frame) => {
        console.error('onStompError frame:', frame);
      },
    });

    stompClient.current.activate();
  };

  const chatPublish = (_chatting) => {
    if (!stompClient.current.connected) return;

    stompClient.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        channelId: channelId,
        // writerId: 1,
        chat: _chatting,
      }),
    });

    setChatting('');
  };

  const chatSubscribe = () => {
    stompClient.current.subscribe('/sub/chat/' + channelId, (response) => {
      console.log('subscribe body', response.body);
      const jsonBody = JSON.parse(response.body);
      console.log('subscribe jsonBody', jsonBody);

      // setChattingList((_chat_list) => [
      //   ..._chat_list, jsonBody.chat
      // ]);
    });
  };

  const chatDisconnect = () => {
    // if (stompClient.current)
    // if (stompClient)
    //   stompClient.current.deactivate();
  };

  useEffect(() => {
    chatConnect();
    // input.current.focus();

    return () => chatDisconnect();
  }, []);

  return (
    <>
      <div>chat-page</div>
    </>
  )
}

export default ChatPage;