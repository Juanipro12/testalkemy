import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../component/Layout'
import {Operations} from './../component/Operations'

export const OperationsPage = () => {
  const [filterType, setFilterType] = useState('all')
  const [render, setRender] = useState(true)
  return (
    <Layout render={render} reRender={()=>{setRender(!render)}} >
      <div style={{textAlign:'center',width:'100%'}} >
        <Link
          to='/'
          component="button"
          variant="body2"
          style={{width:'100%', color:'#0F3460', fontSize:'200%'}}
        >
            Go home!
        </Link>
      </div>
      <FormControl sx={{margin:'10px 0'}} fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="type"
          value={filterType}
          onChange={(e)=>{setFilterType(e.target.value)}}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={'income'}>Income</MenuItem>
          <MenuItem value={'expense'}>Expense</MenuItem>
        </Select>
      </FormControl>
      <Operations render={render} reRender={()=>setRender(!render)} filter={filterType}/>
    </Layout>
  )
}
