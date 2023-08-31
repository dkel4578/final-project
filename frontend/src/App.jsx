import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./layout/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import FindIdPage from "./pages/FindIdPage";
import MyPage from "./pages/MyPage";
import ChangeInfo from "./pages/ChangeInfo";
import { useDispatch, useSelector } from "react-redux";
import BoardListPage from "./pages/BoardListPage";
import BoardViewPage from "./pages/BoardViewPage";
import BoardEditPage from "./pages/BoardEditPage";
import BoardDeletePage from "./pages/BoardDeletePage";
import PasswordChangePage from "./pages/PasswordChangePage";
import Footer from "./layout/Footer";
import BoardNotice from "./pages/board-notice";
import BoardWritePage from "./pages/BoardWritePage";
// import ChatListRoom from "./pages/chat-list-room";
import CoffeeEventPage from "./pages/coffee-event-page";
import CriminalPage from "./pages/criminal-page";
import FAQ from "./pages/faq";
import Launching from "./pages/launching";
import PassWordChangeComplete from "./pages/password-change-complete";
import PostContentModify from "./pages/post-content-modify";
import PostContent from "./pages/post-content";
import WritePost from "./pages/write-post";
import Calendar from "./pages/Calendar";
import ChatRoomListPage from "./pages/ChatRoomListPage"; //선생님거
import ChatingRoomListPage from "./pages/ChatingRoomListPage"; //내가 만든거
// import Admin from "./components/AdminPage";
import ChatName from "./pages/chatting-room-name";
import Header2 from "./layout/Header2";
import TouristAIP from './pages/TouristAIP';
import KakaoMap from './pages/KakaoMap'
import ChatPage from "./pages/ChatPage";
import AdminPage from './components/AdminPage';
import AdminAuth from './components/AdminAuth';
import CalendarShare from "./pages/CalendarShare";
import {useLocation} from "react-router-dom";


function App(props) {
  const userInfo = useSelector((state) => state.user.user);
  const location = useLocation();
  const shouldHideFooter = location.pathname === "/admin" || location.pathname.startsWith("/chat/room/list/");
  // const shouldUseHeader2 = location.pathname === "/admin";
  return (
    <>
      <Header userInfo={userInfo} />
      <Helmet>
        <title>같이갈래?</title>
      </Helmet>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/findId" element={<FindIdPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/myPage" element={<MyPage/>}/>
          <Route path="/changeInfo" element={<ChangeInfo/>}/>
          <Route path="/passwordChange" element={<PasswordChangePage />} />
          <Route path="/passwordChangeComplete" element={<PassWordChangeComplete />} />
          <Route path="/board/:kind" element={<BoardListPage />}/>
          <Route path="/board/view" element={<BoardViewPage/>}/>
          <Route path="/board/edit" element={<BoardEditPage/>}/>
          <Route path="/board/write" element={<BoardWritePage />}/>
          <Route path="/board/delete" element={<BoardDeletePage />}/>
     	    <Route path="/board/notice" element={<BoardNotice/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/chat/room/list" element={<ChatRoomListPage />}/>
          <Route path="/TouristAIP" element={<TouristAIP />}/>
          <Route path="/chat/room/list2" element={<ChatingRoomListPage />}/>
          <Route path="/admin" element={<AdminAuth Component={AdminPage} userInfo={userInfo} />} />
          <Route path="/coffeeEventPage" element={<CoffeeEventPage/>}/>
					<Route path="/criminalPage" element={<CriminalPage/>}/>
					<Route path="/faq" element={<FAQ/>}/>
					<Route path="/launching" element={<Launching/>}/>
					{/* <Route path="/postContentModify" element={<PostContentModify/>}/> */}
					{/* <Route path="/postContent" element={<PostContent/>}/> */}
					{/* <Route path="/writePost" element={<WritePost/>}/> */}
					<Route path="/chatName/:roomId" element={<ChatName/>}/>
          {/* <Route path="/header2" element={<Header2/>}/> */}
          <Route path="/chat/room/list/:roomId" element={<ChatPage/>}/>
          <Route path="/KakaoMap" element={<KakaoMap/>}/>
          <Route path="calendar/:loginId" element={<CalendarShare/>}/>
				</Routes>
			{shouldHideFooter ? null : <Footer />} {/* footer를 숨김 */}
		</>
	);

}

export default App;
