import { createAction, handleActions } from "redux-actions";
import axios from 'axios';
// import { customHistory } from "../configureStore.js";
// import { browserHistory } from 'react-router';
import { produce } from "immer";
//Actions
const GET_CHAT_ROOM_LIST = "GET_CHAT_ROOM_LIST";  // ChatRoom List들 가져와서 화면에 뿌리기
const CREATE_CHAT_ROOM = "CREATE_CHAT_ROOM";

//ActionCreaters
const getChatRoomList = createAction(GET_CHAT_ROOM_LIST, (chatRoomList) => ({ chatRoomList }));
const createChatRoom = createAction(CREATE_CHAT_ROOM, (chatRoom) => ({ chatRoom }));


const initialState = {
  chatRoomList : [],
  chatRoom : {},
};

// 채팅방 리스트 조회
const getChatRoomAPI = (userId) => {
  return async function (dispatch, getState, { history }) {
    console.log("userId>>>>>>" , userId)
    const API = `/api/chatroom?userId=${encodeURIComponent(userId)}`;
    let chatRoomList = [];

    axios.get(API)
      .then((response) => {
        console.log("response >>> ", response);
        console.log("response.data >>> ", response.data)
        
      if (response.data && response.data.length > 0) { 
        response.data.forEach((_chatRoom) => {
          console.log("_chatRoom >>> ", _chatRoom);
          let chatRoom = {
            id: _chatRoom.id,
            roomName: _chatRoom.name,
            roomMasterNickName: _chatRoom.user.nickname,
            
          };
          chatRoomList = chatRoomList.concat(chatRoom);
        })
      }
      console.log('chatRoomList: ', chatRoomList);
      dispatch(getChatRoomList(chatRoomList));
      // dispatch(getChatRoomList(chatRoomList)).then(() => {
      //   console.log('!!!:123');
      // });
      // console.log('$$$');
      // history.replace("/");
      // history.replace("/chat/room/list");
      // history.push("/chat/room/list");
      // window.location.href = '/chat/room/list';
      // browserHistory.push('/chat/room/list')
    }).catch((error) => {
      console.log(error)
      window.alert("채팅방들을 가져오지 못했습니다.")
    });
  } 
}

// 채팅방 생성
const createChatRoomAPI = (props) => {
  return async function (dispatch, getState, { history }) {
    // console.log('props:', props.chatRoomName);
    
    const API = '/api/chatroom';
    const createRoomData = {
      uid: props.uid,
      chatRoomName: props.chatRoomName,
    };
    // const apiHeader = {
    //   headers : {
    //     "Content-Type": "application/json;charset=UTF-8",
    //     'Accept' : 'application/json', //현재 서버한테 보내는 데이터 타입
    //     'Access-Control-Allow-Origin' : '*',
    //   },
    // };

    axios.post(API, createRoomData)
      .then((response) => {
      console.log('create ChatRoom: ', response.data)
      
      dispatch(createChatRoom(response.data));

      // navigate(`/chat/room/list/${response.data}`);
      // history.replace(`/chat/room/list/${response.data}`);
      // history.push(`/chat/room/list/${response.data}`);
      // window.location.href = '/chat/room/list/' + response.data + '/first';
      // window.location.href = '/chat/room/list/' + response.data;
      window.location.href = '/chat/room/list2';
    }).catch((error) => {
      console.log(error)
      window.alert("새로운 채팅방을 만들지 못했습니다.")
    });
  } 
}

// Reducer
export default handleActions({
  [CREATE_CHAT_ROOM]: (state, action) => produce(state, (draft) => {

    draft.chatRoomList.unshift(action.payload.chatRoom)
  }),
  [GET_CHAT_ROOM_LIST]: (state, action) => produce(state, (draft) => {

    draft.chatRoomList = action.payload.chatRoomList;
  }),  
}, initialState);

//action creator export
const actionCreators = {
  getChatRoomAPI,
  createChatRoomAPI,
};

export { actionCreators };
