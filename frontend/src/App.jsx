// eslint-disable-next-line no-unused-vars
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
import BoardWritePage from './pages/BoardWritePage';


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
          <Route path="/board/write" element={<BoardWritePage />}/>

        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App;
