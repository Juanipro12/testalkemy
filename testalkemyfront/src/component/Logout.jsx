import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
  const navigate = useNavigate()
  const logout = () =>{
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('userId');
    navigate('/login');
  }
  return (
    <Button color="error" variant="contained" onClick={()=>{logout()}}>Logout</Button>
  )
}
