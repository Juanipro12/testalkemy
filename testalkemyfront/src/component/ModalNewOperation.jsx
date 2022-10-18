import { Button, FormControlLabel, InputAdornment, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useEffect } from 'react';

export const ModalOperation = ({open,onClose,operationEdit = null ,reRender}) =>{
  const [operation, setOperation] = useState({
    type:'income',
    concept:'',
    amount:'',
    date: new Date(Date.now())
  })
  useEffect(()=>{
    if(operationEdit){
      setOperation({
        type:operationEdit.type,
        concept:operationEdit.concept,
        amount:operationEdit.amount,
        date: operationEdit.date
      })
    }else{
      setOperation({...operation,date: new Date(Date.now())})
    }
  },[open])
 
  const onCloseSelf = () =>{
    setOperation({
      type:'income',
      concept:'',
      amount:'',
      date: new Date(Date.now())
    })
    onClose()
  }
  const createOperation = async(e)=>{
  e.preventDefault()
  await axios.post('http://localhost:4000/operations',operation)
  .then((res)=>{
    onClose()
    reRender()
  })
  .catch((error)=>{console.error(error)})
  }
  const updateOperation = async(e)=>{
    e.preventDefault()
    await axios.put('http://localhost:4000/operations/'+operationEdit.id,operation)
    .then((res)=>{
      onClose()
      reRender()
    })
    .catch((error)=>{console.error(error)})
    }
  return(
    <Modal
    keepMounted
    open={open}
    onClose={()=>{onCloseSelf()}}
    aria-labelledby="keep-mounted-modal-title"
    aria-describedby="keep-mounted-modal-description"
  >
    <Box sx={style}>
    <CloseIcon 
      onClick={()=>onClose()}
          style={{
            cursor:'pointer',
            position:'absolute',
            right:10,
            top:10
          }}
      />
      <Typography id="keep-mounted-modal-title"  style={{ marginBottom:15}}  variant="h6" component="h2">
        New Operation
      </Typography>
      <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e)=>setOperation({...operation,type:e.target.value})}
          value={operation.type}
          sx={{marginBottom:3 , display:'flex', flexDirection:'row',flexWrap:'nowrap'}}
        >
          <FormControlLabel value="income" control={<Radio />} label="Income" />
          <FormControlLabel value="expense" control={<Radio />} label="Expense" />
   </RadioGroup>
      <TextField
          fullWidth
          style={{ marginBottom:15}}
          label="Amount"
          type="number"
          value={operation.amount}
          onChange={(e)=>setOperation({...operation,amount:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
    />
          <TextField
            fullWidth
            style={{ marginBottom:15}}
            onChange={(e)=>setOperation({...operation,concept:e.target.value})}
            value={operation.concept}
            label="Concept"
            type="text"
            name="concept"
            InputLabelProps={{
              shrink: true,
            }}
          />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
            label="Date"
            value={operation.date}
            onChange={(newValue) => {
              setOperation({...operation,date:new Date(newValue)});
            }}
          renderInput={(params) => <TextField style={{ marginBottom:15}}  fullWidth {...params} />}
          />
        </LocalizationProvider>
        <Box>
        <Button type='submit' onClick={(e)=>{operationEdit !== null?updateOperation(e):createOperation(e)}} sx={{alignSelf:'flex-end'}} variant="contained" color="success">
          Submit
        </Button>
        </Box>
    </Box>
  </Modal>
  )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }; 

export const ModalNewOperation = ({reRender}) => {
    const [open, setOpen] = useState(false)
    
  return (
    <div>
      <Button style={{marginInline:10}} variant='contained' color='success' onClick={()=>setOpen(true)}> + New Operation</Button>
      {open &&
      <ModalOperation reRender={reRender} open={open} onClose={()=>setOpen(false)} />
      }
    </div>
  )
}
