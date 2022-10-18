import { Avatar, Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../component/Layout'

export const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        loadUser()
    },[])
    const loadUser = async()=>{
        await axios.get('http://localhost:4000/user')
        .then((res)=>{
            setUser(res.data)
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
      {user !== null?
      <div 
        style={{
            display:'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            alignItems: 'center'
        }} 
      >
            <Avatar sx={{ bgcolor: user.color ,width: 200, height: 200 , fontSize:200 ,marginY:5 }}>{user !== null?user.username[0].toUpperCase():''}</Avatar>
            <div>
                    <Typography
                    fontWeight="bold" 
                    sx={{ fontFamily:'Bebas Neue',fontSize:60,marginY:2}}  
                    variant="h3"
                    >
                        Email:
                    </Typography>
                    <Typography
                    sx={{ fontFamily:'Bebas Neue',fontSize:35,marginY:2}}  
                    variant="body1">
                    {user.email}
                    </Typography>
                    <Typography
                    sx={{ fontFamily:'Bebas Neue', fontSize:60,marginY:2}}  
                    variant="h3">
                        User Name: 
                    </Typography>
                    <Typography 
                    sx={{ fontFamily:'Bebas Neue',fontSize:35,marginY:2}}  
                    variant="body1"
                    >
                    {user.username}
                    </Typography>
                    <Button type='submit' onClick={()=>{navigate('/editprofile')}} sx={{alignSelf:'flex-end'}} variant="contained" color="info">
                    Edit profile
                    </Button>
            </div>
      </div>:
      <></>
      }
    </Layout>
  )
}
