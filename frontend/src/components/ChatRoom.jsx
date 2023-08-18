import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useNavigate, useParams } from 'react-router-dom';
import { customHistory } from "../store/configureStore.js";
// import { actionCreators as chattingActions } from "../store/modules/chatting";
import { actionCreators as userActions } from "../store/modules/user";

function ChatRoom(props) {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const userInfo = useSelector((state) => state.user.user);
  // console.log('ChatRoom userInfo:', userInfo);

  return (
    <>
      <div>chat-room</div>
    </>
  )
}

export default ChatRoom;