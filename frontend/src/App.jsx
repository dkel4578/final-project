import Header from './layout/Header';
import LoginPage from './pages/LoginPage';
import { Routes, Route,  } from 'react-router-dom'

function App() {

  return (
    <>
      <Header/>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    </>
  )
}

export default App;
