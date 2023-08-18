import { createAction, handleActions } from "redux-actions";
import axios from 'axios';
// import { customHistory } from "../configureStore.js";
// import { browserHistory } from 'react-router';
import { produce } from "immer";

//Actions
const GET_CHAT_ROOM_LIST = "GET_CHAT_ROOM_LIST";  // ChatRoom List들 가져와서 화면에 뿌리기
const CREATE_CHAT_ROOM = "CREATE_CHAT_ROOM";

//ActionCreaters
const getChatRoomList = createAction(GET_CHAT_ROOM_LIST, (chatRoomList) => ({chatRoomList}));
const createChatRoom = createAction(CREATE_CHAT_ROOM, (chatRoom) => ({chatRoom}));

const initialState = {
  chatRoomList : [],
  chatRoom : {},
};

// 채팅방 리스트 조회
const getChatRoomAPI = () => {
  return async function (dispatch, getState, { history }) {
    const API = '/api/chatroom';
    let chatRoomList = [];

    axios.get(API)
      .then((response) => {
      // console.log('get ChatRoomList: ', response.data);
      
      if (response.data && response.data.length > 0) { 
        response.data.forEach((_chatRoom) => {
          let chatRoom = {
            id: _chatRoom.id,
            roomName: _chatRoom.name,
          };
          chatRoomList.concat(chatRoom);
          // chatRoomList = chatRoomList.concat('ab');
          // console.log('after ChatRoomList:', chatRoomList);
        })
      } else {
        alert('생성된 채팅방이 없습니다.');
      }
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
      // dispatch(getChatRoomList([])).then(() => {
      //   console.log('!!!:123');
      // });
      window.alert("채팅방들을 가져오지 못했습니다.")
    });
    // console.log('aaaaaaaaaa');
    // chatRoomList = ['123','456'];
    // await dispatch(getChatRoomList(chatRoomList));
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

    // axios.post(API, createRoomData, apiHeader)
    axios.post(API, createRoomData)
    // axios.post(API)
      .then((response) => {
      console.log('create ChatRoom: ', response.data)
      
      let chatRoom = {'test1': '789'};
      dispatch(createChatRoom(chatRoom));

      // navigate('/chat/room/1');
      // history.replace("/chat/room/list/1");
      // history.push("/chat/room/1");
      window.location.href = '/chat/room/list/1';
    }).catch((error) => {
      console.log(error)
      window.alert("새로운 채팅방을 만들지 못했습니다.")
    });
  } 
}

// Reducer
export default handleActions({
  // draft: 원본값 복사한 값
  [CREATE_CHAT_ROOM]: (state, action) => produce(state, (draft) => {
    // console.log('@@@@@@@@@1', action.payload.chatRoom);

    draft.chatRoomList.unshift(action.payload.chatRoom)
    // draft.chatRoomList.push(action.payload.chatRoom)
  }),
  [GET_CHAT_ROOM_LIST]: (state, action) => produce(state, (draft) => {
    // console.log('@@@@@@@@@2', action.payload.chatRoomList);

    draft.chatRoomList = action.payload.chatRoomList;
  }),  
}, initialState);

//action creator export
const actionCreators = {
  getChatRoomAPI,
  createChatRoomAPI,
};

export { actionCreators };
