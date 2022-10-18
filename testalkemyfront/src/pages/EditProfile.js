import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Layout } from '../component/Layout'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const EditProfile = () => {
    const [expanded, setExpanded] = useState('profile')
    const [newUser, setNewUser] = useState({
        email:'',
        username:'',
        color:'',
        confirmEmail:''
    })
    const [password, setPassword] = useState({
        oldPassword:'',
        newPassword:'',
        confirmNewPassword:''
    })
    const [error, setError] = useState('')
    useEffect(()=>{
        setError('')
    },[newUser,password,expanded])
    const navigate = useNavigate()
    const openPanel = (panel) => {
        setExpanded(panel );
      };
    const updateUser = async(e)=>{
        e.preventDefault()
        const req = async() =>
            expanded === 'profile'?
            await axios.put('http://localhost:4000/edit',{
                email: newUser.email, 
                username: newUser.username, 
                color: newUser.color
            })
            :
            await axios.put('http://localhost:4000/newpassword',{
                newPassword:password.newPassword,
                oldPassword:password.oldPassword
            })
        req().then((res)=>{
            if(res.data.newUser[0]) navigate('/')
        })
        .catch((err)=>{
            console.error(err,'soy error')
            console.log(err.response.data.error)
            setError(err.response.data.error)
        })

    }
  return (
    <Layout>
      <div style={{textAlign:'center',width:'100%'}} >
        <Link
          to='/'
          component="button"
          variant="body2"
          style={{width:'100%', color:'#0F3460', fontSize:'200%' , textDecoration:'none'}}
        >
            Go home!
        </Link>
      </div>
        <div>
      <Accordion expanded={expanded === 'profile'} onChange={()=>openPanel('profile')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General data
          </Typography>
        </AccordionSummary>
       {expanded === 'profile' && <AccordionDetails>
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
           <TextField
              label="Username"
              name="username"
              value={newUser.username}
                onChange={(e)=>setNewUser({...newUser,username:e.target.value})}
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
        />
              <TextField
                label="Email"
                type="email"
                value={newUser.email}
                onChange={(e)=>setNewUser({...newUser,email:e.target.value})}
                name="email"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Confirm email"
                type="email"
                name="email"
                value={newUser.confirmEmail}
                onChange={(e)=>setNewUser({...newUser,confirmEmail:e.target.value})}
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
               ( newUser.email !== newUser.confirmEmail || error.length > 0) &&
                <FormLabel
                style={{ margin: 0, textAlign: 'center' }}
                error={true}
                id="demo-error-radios"
              >
                {error.length > 0?error:'Email does not match'}
              </FormLabel>
              }
              <Button type='submit' onClick={(e)=>updateUser(e)}  variant="contained" color="success">
                Submit
            </Button>
            </Box>
        </AccordionDetails>}
      </Accordion>
      <Accordion expanded={expanded === 'password'} onChange={()=>openPanel('password')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Edit password
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {expanded === 'password' &&
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
            <TextField
                label="Old password"
                type="password"
                value={password.oldPassword}
                onChange={(e)=>setPassword({...password,oldPassword:e.target.value})}
                name="password"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            <TextField
                label="New password"
                type="password"
                value={password.newPassword}
                onChange={(e)=>setPassword({...password,newPassword:e.target.value})}
                name="password"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            <TextField
                id="outlined-number"
                label="Confirm new password"
                type="password"
                value={password.confirmNewPassword}
                onChange={(e)=>setPassword({...password,confirmNewPassword:e.target.value})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {
                (password.newPassword !== password.confirmNewPassword || error.length > 0) &&
                <FormLabel
                style={{ margin: 0, textAlign: 'center' }}
                error={true}
                id="demo-error-radios"
              >
                {error.length > 0?error:'New password does not match'}
              </FormLabel>
              }
            <Button type='submit' onClick={(e)=>updateUser(e)}  variant="contained" color="success">
                Submit
            </Button>
        </Box>
        }
        </AccordionDetails>
      </Accordion>
    
      
    </div>
    </Layout>
  )
}
