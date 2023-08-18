// import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// Action 선언
const SET_USER = "SET_USER";
// const LOG_OUT = "LOG_OUT";

// Action Creators
const setUser = createAction(SET_USER, (user) => ({ user }));
// const logOut = createAction(LOG_OUT, (user) => ({ user }));

// 초기 스테이트 : initial State
const initialState = {  
  user: {
    // username: "",
    nickname: "",
    // password: "", 
    // email: "", 
    // city: "",
    // street: "",
    uid: "",
    // profile: "",
  },
  isLogin: false,
}

// 로그인 요청(request, 클라이언트 -> 서버) 미들웨어
const loginSaveAPI = (uid, nickname) => {
  return async function (dispatch, getState, { history }) {
    const user = {
      uid: uid,   
      nickname: nickname,
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
    // [LOG_OUT]: (state, action) => produce(state, (draft) => {
    //   draft.user = {
    //                   username: "",
    //                   // password: "", 
    //                   // email: "", 
    //                   // city: "",
    //                   // street: "",
    //                   uid: "",
    //                } 
    //   draft.isLogin = false;
    // }),
  },
  initialState
)

const actionCreators = {
  // signupAPI,
  loginSaveAPI,
  // logout,
  // isLogin,
  // loginCheckStore
};

export { actionCreators };