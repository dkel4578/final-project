import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useNavigate, useParams } from 'react-router-dom';
import { customHistory } from "../store/configureStore.js";
import { actionCreators as chattingActions } from "../store/modules/chatting";
import ChatRoom from "../components/ChatRoom";

const WrapChatRooms = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content: center;
`;

const HHtalk = styled.button`
  width: 120px;
  height: 30px;
  align-items: center;
  text-align: center;
  /* padding-top: 10px; */
  border: none;
  border-radius: 2px;
  outline: none;
  // background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
`;

function ChatRoomListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userInfo = useSelector((state) => state.user.user);
  // console.log('ChatRoomListPage userInfo:', userInfo);
  const chatRoomList = useSelector((state) => state.chatting.chatRoomList);

  const goChatRoomCreate = (e) => {
    // customHistory.replace("/chat/room/list/0");
    navigate('/chat/room/list/0');
  }

  const goChatRoomClick = (e, id) => {
    console.log('id:', id);
    // customHistory.replace(`/chat/room/list/${id}`);
  }

  console.log('@@@:', chatRoomList);
  React.useEffect(() => {
    dispatch(chattingActions.getChatRoomAPI())
      // .then(() => {
      //   console.log('@@@123:', chatRoomList);
      // })
    ;
    // console.log('###');
    // const test1Handler = async () => {
    //   dispatch(await chattingActions.getChatRoomAPI());
    //   console.log('@@@123:', chatRoomList);
    // };
    // test1Handler();

    // navigate('/chat/room/list');
  }, []);

  return (
    <>
      <WrapChatRooms>
        <HHtalk onClick={goChatRoomCreate}>채팅방 생성</HHtalk>
        {chatRoomList.map((p, idx) => {
          return <ChatRoom key={p.id} onClick={goChatRoomClick(p.id)} {...p}/>
        })}
      </WrapChatRooms>
    </>
  );
}

export default ChatRoomListPage;