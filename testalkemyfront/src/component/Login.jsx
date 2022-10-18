import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormLabel, styled, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import validateEmail from '../utils/validatorEmail';
import { defaultHeaders } from '../App';

export const Login = ({changeLogin}) => {
  //state
  const [user, setUser] = useState({
    username:'',
    email:'',
    password:''
  })
  const [error, setError] = useState('')
  //efect
  useEffect(()=>{
    setError('')
  },[user])
  //const
  const navigate = useNavigate()
  //functions
  const saveUsernameEmail = (e) =>{
    const { value } = e.target
    validateEmail(value)?
    setUser({ ...user, email:value,username:'' }):
    setUser({ ...user, username:value,email:'' })
  }
  const createUser = async(e) =>{
    e.preventDefault()
    await axios.post('http://localhost:4000/login',user)
    .then((res)=>{
      const { data,userId } = res.data
      sessionStorage.setItem('auth-token', data.token);
      sessionStorage.setItem('userId', userId);
      defaultHeaders()
      navigate('/');
    })
    .catch((error)=>{
      console.error(error)
      setError(error.response.data.error)
    })
  }
  //style
  const TypographyTitle = styled(Typography)(()=>({
    margin:25
  }))
  const TypographyQuestion = styled(Typography)(()=>({
    margin:25,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign:'center'
  }))
  const SubmitButton = styled(Button)(()=>({
    margin:25,
    
  }))
  return (
    <div>
      <Box 
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            display:'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <TypographyTitle variant="h3" component="h2">
              Login
            </TypographyTitle>
           <TextField
              style={{ margin:10}}
              label="Username or Email"
              value={user.username.length > 0 ?user.username:user.email}
              type="text"
              onChange={(e)=>saveUsernameEmail(e)}
              InputLabelProps={{
                shrink: true,
              }}
        />
              <TextField
                style={{ margin:10}}
                label="Password"
                type="password"
                value={user.password}
                name="password"
                onChange={(e)=>{setUser({...user,password:e.target.value})}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
               {
                ( error.length > 0) &&
                <FormLabel
                style={{ margin: 0, textAlign: 'center' }}
                error={true}
                id="demo-error-radios"
              >
                {error}
              </FormLabel>
              }
            <Box>
           
            <SubmitButton type='submit' onClick={(e)=>createUser(e)} sx={{alignSelf:'flex-end'}} variant="contained" color="success">
              Submit
            </SubmitButton>
            </Box>

    <TypographyQuestion variant="h4" component="span">
        Don't have an account?
    <Button onClick={()=>changeLogin()}>Sign up</Button>
    </TypographyQuestion>
    </Box>
    </div>
  )
}
