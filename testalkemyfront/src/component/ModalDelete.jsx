import { Button, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'


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

export const ModalDelete = ({open,onClose,onDelete}) => {

    const onCloseSelf = (deleted)=>{
        if(deleted){
            onDelete()
            onClose()
        }else{
            onClose()
        }
    }
  return (
    <div>
        <Modal
            open={open}
            onClose={()=>onCloseSelf(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <CloseIcon 
                onClick={()=>onClose(false)}
                    style={{
                        cursor:'pointer',
                        position:'absolute',
                        right:10,
                        top:10
                    }}
                />
                <Typography sx={{marginBottom:5}} id="modal-modal-title" variant="h6" component="h2">
                Are you sure?
                </Typography>
            <Button variant='contained' color='error' onClick={()=>onCloseSelf(true)}>
                Delete
            </Button>
            </Box>
            </Modal>
    </div>
  )
}
