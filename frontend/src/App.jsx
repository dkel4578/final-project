// eslint-disable-next-line no-unused-vars
import React from 'react'; // eslint-disable-next-line no-unused-vars
import { Route, Routes } from 'react-router-dom'; // eslint-disable-next-line no-unused-vars
import { QueryClient, QueryClientProvider } from 'react-query'; // eslint-disable-next-line no-unused-vars
import Header from './layout/Header'; 
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import FindIdPage from './pages/FindIdPage';
import MyPage from './pages/MyPage';
import ChangeInfo from './pages/ChangeInfo';
import BoardListPage from './pages/BoardListPage';
import BoardViewPage from './pages/BoardViewPage';
import PasswordChangePage from './pages/PasswordChangePage';

const queryClient = new QueryClient();



function App() {

  return (
    <>
      <Header/>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/findId" element={<FindIdPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/myPage" element={<MyPage/>}/>
          <Route path="/changeInfo" element={<ChangeInfo/>}/>
            <Route path="/board" element={<BoardListPage/>}/>
          <Route path="/board/view" element={<BoardViewPage/>}/>
          <Route path="/passwordChange" element={<PasswordChangePage/>}/>

        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App;
