import { createAction, handleActions } from "redux-actions";
import axios from "axios";
// import { customHistory } from "../configureStore.js";
// import { browserHistory } from 'react-router';
import { produce } from "immer";
//Actions
const GET_CHAT_ROOM_LIST = "GET_CHAT_ROOM_LIST"; // ChatRoom List들 가져와서 화면에 뿌리기
const CREATE_CHAT_ROOM = "CREATE_CHAT_ROOM";

//ActionCreaters
const getChatRoomList = createAction(GET_CHAT_ROOM_LIST, (chatRoomList) => ({
  chatRoomList,
}));
const createChatRoom = createAction(CREATE_CHAT_ROOM, (chatRoom) => ({
  chatRoom,
}));

const initialState = {
  chatRoomList: [],
  chatRoom: {},
};

// 채팅방 리스트 조회
const getChatRoomAPI = (userId) => {
  return async function (dispatch, getState, { history }) {
    const API = `/api/chatroom?userId=${encodeURIComponent(userId)}`;
    let chatRoomList = [];

    try {
      const response = await axios.get(API);
      console.log("chatting.js res >>>>>>> ", response);
      console.log("chatting.js res.data >>>>>>> ", response.data);
      console.log("chatting.js res >>>>>>> ", response.data.length);
      if (response.data && response.data.length > 0) {
        response.data.forEach((_chatRoom) => {
          console.log('_chatRoom:', _chatRoom);
          let chatRoom = {
            id: _chatRoom.id,
            roomName: _chatRoom.name,
          };
          console.log("chatRoom >>> ", chatRoom);
          chatRoomList = chatRoomList.concat(chatRoom);
        });
      }

      console.log("chatting.js >> chatRoomList",chatRoomList);
      dispatch(getChatRoomList(chatRoomList));
    } catch (error) {
      // 에러 처리
    }
  };
};
// 채팅방 생성
const createChatRoomAPI = (props) => {
  return async function (dispatch, getState, { history }) {
    // console.log('props:', props.chatRoomName);

    const API = "/api/chatroom";
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

    axios
      .post(API, createRoomData)
      .then((response) => {
        dispatch(createChatRoom(response.data));

        // navigate(`/chat/room/list/${response.data}`);
        // history.replace(`/chat/room/list/${response.data}`);
        // history.push(`/chat/room/list/${response.data}`);
        // window.location.href = '/chat/room/list/' + response.data + '/first';
        // window.location.href = '/chat/room/list/' + response.data;
        window.location.href = "/chat/room/list2";
      })
      .catch((error) => {
        window.alert("새로운 채팅방을 만들지 못했습니다.");
      });
  };
};

// Reducer
export default handleActions(
  {
    [CREATE_CHAT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.chatRoomList.unshift(action.payload.chatRoom);
      }),
    [GET_CHAT_ROOM_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chatRoomList = action.payload.chatRoomList;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  getChatRoomAPI,
  createChatRoomAPI,
};

export { actionCreators };
