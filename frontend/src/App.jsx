import Header from './layout/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import { Routes, Route,  } from 'react-router-dom'

function App() {

  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
    </>
  )
}

export default App;
