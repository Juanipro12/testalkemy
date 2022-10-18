import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormLabel, styled, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { defaultHeaders } from '../App';
import { useEffect } from 'react';

export const Signup = ({changeLogin}) => {
  //state
  const [dataConfirm, setDataConfirm] = useState({
    email:'',
    password:''
  })
  const [newUser, setNewUser] = useState({
    username:'',
    email:'',
    password:'',
    color:'#000000'
  })
  const [errorAlert, setErrorAlert] = useState('')
  //const
  const navigate = useNavigate()
  //effect
  useEffect(()=>{
    setErrorAlert('')
  },[newUser,dataConfirm])
  //functions
  const saveInput = (e) =>{
    const { name,value } = e.target
    setNewUser({ ...newUser, [name]:value })
  }
  const createUser = async(e) =>{
    e.preventDefault()
    if(newUser.email === dataConfirm.email && newUser.password === dataConfirm.password){
      await axios.post('http://localhost:4000/signup ',newUser)
      .then((res)=>{
        const { data,userId } = res.data
        sessionStorage.setItem('auth-token', data.token);
        sessionStorage.setItem('userId', userId);
        defaultHeaders()
        navigate('/');
      })
      .catch((error)=>{
        console.error(error)
        setErrorAlert(error.response.data.message)
      })
    }else{
      setErrorAlert('Email or password do not match!')
    }
  }
  //style
  const TypographyTitle = styled(Typography)(()=>({
    margin:25
  }))
  const SubmitButton = styled(Button)(()=>({
    margin:25

  }))
  const TypographyQuestion = styled(Typography)(()=>({
    margin:25,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign:'center'
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
              Sing up
            </TypographyTitle>
           <TextField
              label="Username"
              name="username"
              value={newUser.username}
              type="text"
              onChange={saveInput}
              InputLabelProps={{
                shrink: true,
              }}
        />
              <TextField
                label="Email"
                type="email"
                value={newUser.email}
                name="email"
                onChange={saveInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Confirm email"
                type="email"
                name="email"
                value={dataConfirm.email}
                onChange={(e)=>setDataConfirm({...dataConfirm,email:e.target.value})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Password"
                type="password"
                value={newUser.password}
                name="password"
                onChange={saveInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Confirm password"
                type="password"
                value={dataConfirm.password}
                onChange={(e)=>setDataConfirm({...dataConfirm,password:e.target.value})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Favorite color"
                type="color"
                value={newUser.color}
                onChange={(e)=>setNewUser({...newUser,color:e.target.value})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
               {
                errorAlert.length > 0 &&
                <FormLabel
                style={{ margin: 0, textAlign: 'center' }}
                error={true}
                id="demo-error-radios"
              >
                {errorAlert}
              </FormLabel>
              }

        <Box>
        <SubmitButton type='submit' onClick={(e)=>createUser(e)} sx={{alignSelf:'flex-end'}} variant="contained" color="success">
          Submit
        </SubmitButton>
        </Box>
    <TypographyQuestion variant="h4" component="span">
      Already have an account?
    <Button onClick={()=>changeLogin()}>Login</Button>
    </TypographyQuestion>
    </Box>
    </div>
  )
}
