import './App.css';
import { LoginPage } from './pages/LoginPage';
import { Routes, Route  } from "react-router-dom";
import { Home } from './pages/HomePage';
import { useEffect } from 'react';
import axios from 'axios';
import { OperationsPage } from './pages/OperationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfile } from './pages/EditProfile';

export const defaultHeaders= () =>{
  if((sessionStorage.getItem('auth-token') && sessionStorage.getItem('userId')) !== null){
    axios.defaults.headers.common['userId'] = sessionStorage.getItem('userId') 
    axios.defaults.headers.common['auth-token'] = sessionStorage.getItem('auth-token')
  }
} 
function App() {
  useEffect(()=>{
    defaultHeaders()
  },[])
  return (
    <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/login" element={<LoginPage/>} />
        <Route  path="/operations" element={<OperationsPage/>} />
        <Route  path="/profile" element={<ProfilePage/>} />
        <Route  path="/editprofile" element={<EditProfile/>} />
    </Routes>
    );
}

export default App;
