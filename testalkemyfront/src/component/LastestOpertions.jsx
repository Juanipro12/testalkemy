import React from 'react'
import { Link } from 'react-router-dom';
import { Operations } from './Operations'

export const LastestOpertions = ({render,reRender}) => {
  return (
    <div >
      <div style={{textAlign:'center',width:'100%'}} >
      <Link
        to='/operations'
        component="button"
        variant="body2"
        style={{width:'100%', color:'#0F3460', fontSize:'200%',textDecoration:'none'}}
      >
        View all operations!
      </Link>
      </div>
        <Operations limit={10} render={render} reRender={reRender}/>
    </div>
  )
}
