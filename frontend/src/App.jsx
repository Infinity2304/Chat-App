import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'
import Home from './pages/home/Home'
import { useAuthContext } from './context/AuthContext'

import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  const {AuthUser} = useAuthContext();
  //Auth user checks if there is any save user data in local storage

  return <div className='p-4 h-screen flex items-center justify-center'>
    <Routes>
      <Route path='/' element={AuthUser ? <Home /> : <Navigate to="/login" />}/>
      <Route path='/login' element={AuthUser ? <Navigate to="/" /> : <Login />}/>
      <Route path='/signup' element={AuthUser ? <Navigate to= "/" /> : <SignUp/>}/>
    </Routes>
    <Toaster/>
  </div>
}

export default App
