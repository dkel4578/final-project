import Header from './layout/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { Routes, Route,  } from 'react-router-dom'
import SignupPage from './pages/SignupPage';  // eslint-disable-line no-unused-vars
import FindIdPage from './pages/FindIdPage';

function App() {

  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/join" element={<LoginPage/>}/>
          <Route path="/findId" element={<FindIdPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
    </>
  )
}

export default App;
