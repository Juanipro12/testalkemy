import styled from '@emotion/styled';
import {  List, ListItem, Tooltip, useMediaQuery } from '@mui/material'
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import { defaultHeaders } from '../App';
import {  ModalOperation } from './ModalNewOperation';
import { ModalDelete } from './ModalDelete';

export const Operations = ({reRender,render,limit,filter}) => {
  const [operations, setOperations] = useState([])
  const [operationEdit, setoperationEdit] = useState(null)
  const [idOperationDelete, setIdOperationDelete] = useState(null)
  useEffect(()=>{
    loadOperations()
  },[render,filter])
  const loadOperations = async()=>{
    defaultHeaders()
    await axios.get(`http://localhost:4000/operations`,
    {
      params:{
        limit:limit?limit:null,
        filter:filter?filter:null
      }
    })
    .then((res)=>{
      setOperations(res.data.rows)
    })
    .catch((error)=>{console.error(error)})
  }
  const deleteOperation = async(id)=>{
    await axios.delete(`http://localhost:4000/operations/${id}`)
    .then((res)=>{
     reRender()
     setIdOperationDelete(null)
    })
    .catch((error)=>{console.error(error)})
  }
  //style
  const ListItemCustom = styled(ListItem)(()=>({
    backgroundColor:'#06283D',
    border:'solid 1px #e8e8e8',
    borderRadius:10,
    padding:25,
    marginBottom:25,
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch'
  }))
  const ListItemTextCustom = styled(ListItemText)(({type})=>({
    textAlign:'left',
    marginRight:'2%',
    '&.lastColumn':{
    textAlign:'right',
    },
    '&.MuiListItemText-root .MuiListItemText-primary':{
    color:'#f4f4f2',
    fontFamily:'Bebas Neue',
    fontWeight:"lighter",
    fontSize:'150%',
    display:'flex'
   },
   '&.MuiListItemText-root .MuiListItemText-secondary':{
    color:type? type === 'income'?'#38E54D':'#CC3636':'#bbbfca',
    fontSize:'100%',
    display:'flex'

   },
  }))
  return (
    <List sx={{ width: '100%'  }}>
    {
        operations.map((operation)=>(
        <ListItemCustom  key={operation.id}>
            <ListItemTextCustom
                primary={operation.concept} 
                secondary={new Date(operation.date).toLocaleDateString('es',{weekday:"long", year:"numeric", month:"short", day:"numeric"})} />
            <ListItemTextCustom 
                className='lastColumn'
                primary={`$ ${Number(operation.amount).toLocaleString('es',{maximumFractionDigits:2,minimumFractionDigits:2})}`} 
                secondary={operation.type} type={operation.type} />
            <div style={{display:'flex', position:'absolute' , flexDirection: 'column', right:10 }}>
              <Tooltip title="Edit Operation">
               <EditIcon style={{cursor:'pointer' , marginBottom:10}} onClick={()=>{setoperationEdit(operation)}} color='success'/>
              </Tooltip>
              <Tooltip title="Delete Operation">
               <DeleteIcon style={{cursor:'pointer'}} onClick={()=>{setIdOperationDelete(operation.id)}} color='error'/>
              </Tooltip>
            </div>
          </ListItemCustom>
        ))
    }

      <ModalOperation reRender={reRender} operationEdit={operationEdit} open={operationEdit !== null} onClose={()=>setoperationEdit(null)} />
      <ModalDelete onClose={()=>setIdOperationDelete(null)} onDelete={()=>deleteOperation(idOperationDelete)} open={idOperationDelete !== null} />

    </List>
  )
}
