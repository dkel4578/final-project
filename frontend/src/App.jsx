// eslint-disable-next-line no-unused-vars
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BoardListPage from './pages/BoardListPage';
import BoardViewPage from './pages/BoardViewPage';

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <Header/>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/board" element={<BoardListPage/>}/>
          <Route path="/board/view" element={<BoardViewPage/>}/>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App;
