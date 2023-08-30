import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// Action 선언
const SET_USER = "SET_USER";

// Action Creators
const setUser = createAction(SET_USER, (user) => ({ user }));

// 초기 스테이트 : initial State
const initialState = {  
  user: {
    nickname: "",
    uid: "",
    status: "",
    name : "",
      phone : "",
      gender : "",
      birth : "",
      profileMessage : "",
      loginId:"",
      isLogin:""
    
  },
  isLogin: false,
}

// 로그인 요청(request, 클라이언트 -> 서버) 미들웨어a
const loginSaveAPI = (uid, nickname, loginId, status, name, email, gender, phone, birth, profileMessage, isLogin) => {
  return async function (dispatch, getState, { history }) {
    const user = {
      uid: uid,   
      nickname: nickname,
      loginId : loginId,
      status: status,
      name : name,
      email : email,
      phone : phone,
      gender : gender,
      birth : birth,
      profileMessage : profileMessage,
      isLogin : isLogin
    }
    dispatch(setUser(user))
  };
}

export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.user;
      draft.isLogin = true;
    }),
  },
  initialState
)

const actionCreators = {
  loginSaveAPI,
};

export { actionCreators };