import { Grid, Skeleton, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import CountUp from 'react-countup';
import { useEffect } from 'react'
import { ModalNewOperation } from './ModalNewOperation';
import { defaultHeaders } from '../App';
import { MenuProfile } from './MenuProfile';

export const Layout = ({children,render,reRender}) => {
  const [balanceTotal, setBalanceTotal] = useState(0)
  const [user, setUser] = useState(null)
  useEffect(()=>{
    defaultHeaders()
    loadBalanceTotal()
    loadUser()
  },[render])
  const loadUser = async()=>{
    await axios.get('http://localhost:4000/user')
    .then((res)=>{
        setUser(res.data)
    })
}
  const loadBalanceTotal = async()=>{
    await axios.get('http://localhost:4000/balancetotal')
    .then((res)=>setBalanceTotal(res.data.user.balanceTotal))
  }
  return (
    <Container  maxWidth="l" sx={{marginTop:5}}>
         <Grid 
            sx={{
                display:'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
            }} 
            xs={8}>
            <Typography fontWeight="bold" sx={{ fontFamily:'Bebas Neue'}}  variant="h2">
            <CountUp
                        start={0}
                        end={balanceTotal}
                        duration={1}
                        prefix={'$'}
                        decimals={2}
                        decimal="."
                        separator=","
                        />
            </Typography>
            <Box sx={{marginY: 5, display:'flex',flexDirection: 'row', alignItems: 'center'}}>
                <ModalNewOperation reRender={()=>{reRender()}}/>
                {user?
                <MenuProfile user={user}/>:
                <Skeleton variant="rectangular" animation="wave" width={150} height={40} />
                }
            </Box>
      </Grid>
           
                {children}
           
    </Container>
  )
}
