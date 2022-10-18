import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Login } from '../component/Login'
import { Signup } from '../component/Signup'

export const LoginPage = () => {
  const [login, setLogin] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    if((sessionStorage.getItem('auth-token') && sessionStorage.getItem('userId')) !== null)
    navigate('/');
  },[])
  return (
      login?
      <Login changeLogin={()=>setLogin(false)}/>
      :
      <Signup changeLogin={()=>setLogin(true)}/>
      
   
  )
}
