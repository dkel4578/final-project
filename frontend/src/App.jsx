import React from "react"; 
import { Route, Routes } from "react-router-dom"; 
import { Helmet } from 'react-helmet';
import Header from "./layout/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import FindIdPage from "./pages/FindIdPage";
import MyPage from "./pages/MyPage";
import ChangeInfo from "./pages/ChangeInfo";
import BoardListPage from "./pages/BoardListPage";
import BoardViewPage from "./pages/BoardViewPage";
import PasswordChangePage from "./pages/PasswordChangePage";
import Footer from "./layout/Footer";
import BoardCoffee from "./pages/board-coffee";
import BoardDrink from "./pages/board-drink";
import BoardMeal from "./pages/board-meal";
import BoardTrip from "./pages/board-trip";
import BoardNotice from "./pages/board-notice";
import BoardWritePage from "./pages/BoardWritePage";
import ChatListRoom from "./pages/chat-list-room";
import CoffeeEventPage from "./pages/coffee-event-page";
import CriminalPage from "./pages/criminal-page";
import FAQ from "./pages/faq";
import Launching from "./pages/launching";
import MannerScore from "./pages/manner-score";
import PassWordChangeComplete from "./pages/password-change-complete";
import PostContentModify from "./pages/post-content-modify";
import PostContent from "./pages/post-content";
import WritePost from "./pages/write-post";
import Calendar from './pages/Calendar';
import ChatRoomListPage from './pages/ChatRoomListPage'; //선생님거
import ChatingRoomListPage from './pages/ChatingRoomListPage'; //내가 만든거
import MasterPage from "./pages/MasterPage";
import TouristAIP from './pages/TouristAIP';
import  KakaoMap from  './pages/KakaoMap';






function App() {
  return (
    <>
      <Header />
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
          <Route path="/board/view" element={<BoardViewPage/>}/>
          <Route path="/passwordChange" element={<PasswordChangePage />} />
					<Route path="/passwordChangeComplete" element={<PassWordChangeComplete />} />
          <Route path="/board/write" element={<BoardWritePage />}/>
          <Route path="/board/coffee" element={<BoardCoffee/>}/>
					<Route path="/board/drink" element={<BoardDrink/>}/>
					<Route path="/board/meal" element={<BoardMeal/>}/>
					<Route path="/board/trip" element={<BoardTrip/>}/>
					<Route path="/board/notice" element={<BoardNotice/>}/>
          <Route path="/passwordChange" element={<PasswordChangePage/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/chat/room/list" element={<ChatRoomListPage />}/>
          <Route path="/TouristAIP" element={<TouristAIP />}/>
<<<<<<< HEAD
          <Route path="/KakaoMap" element={<KakaoMap />}/>
        
         
          
        </Routes>
      </QueryClientProvider>
    </>
  )
=======
          <Route path="/chat/room/list2" element={<ChatingRoomListPage />}/>
          <Route path="/admin" element={<MasterPage />}/>
          <Route path="/coffeeEventPage" element={<CoffeeEventPage/>}/>
					<Route path="/criminalPage" element={<CriminalPage/>}/>
					<Route path="/faq" element={<FAQ/>}/>
					<Route path="/launching" element={<Launching/>}/>
					<Route path="/mannerScore" element={<MannerScore/>}/>
					<Route path="/postContentModify" element={<PostContentModify/>}/>
					<Route path="/postContent" element={<PostContent/>}/>
					<Route path="/writePost" element={<WritePost/>}/>
					<Route path="/calendar" element={<Calendar/>}/>
				</Routes>
			<Footer />
		</>
	);
>>>>>>> 2f069d3e5dded263893a201dab1e6546e3fac48e
}

export default App;
