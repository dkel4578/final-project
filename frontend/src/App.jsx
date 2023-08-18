import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './layout/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import FindIdPage from './pages/FindIdPage';
import MyPage from './pages/MyPage';
import ChangeInfo from './pages/ChangeInfo';
import BoardListPage from './pages/BoardListPage';
import BoardViewPage from './pages/BoardViewPage';
import BoardEditPage from './pages/BoardEditPage';
import BoardWritePage from './pages/BoardWritePage';
import BoardDeletePage from './pages/BoardDeletePage';
import PasswordChangePage from './pages/PasswordChangePage';
import Calnedar from './pages/Calendar';
import ChatRoomListPage from './pages/ChatRoomListPage';
import ChatPage from './pages/ChatPage';

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/findId" element={<FindIdPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/myPage" element={<MyPage/>}/>
          <Route path="/changeInfo" element={<ChangeInfo/>}/>
          <Route path="/board/:kind" element={<BoardListPage />}/>
          <Route path="/board/view" element={<BoardViewPage/>}/>
          <Route path="/board/edit" element={<BoardEditPage/>}/>
          <Route path="/board/write" element={<BoardWritePage />}/>
          <Route path="/board/delete" element={<BoardDeletePage />}/>
          <Route path="/passwordChange" element={<PasswordChangePage/>}/>
          <Route path="/calendar" element={<Calnedar/>}/>
          <Route path="/chat/room/list" element={<ChatRoomListPage />}/>
          <Route path="/chat/room/list/:channelId" element={<ChatPage />}/>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App;
