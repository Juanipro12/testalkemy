import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LastestOpertions } from "../component/LastestOpertions"
import { Layout } from "../component/Layout"

export const Home = () => {
  const navigate = useNavigate()
  const [render, setRender] = useState(false)
  useEffect(()=>{
    if((sessionStorage.getItem('auth-token') && sessionStorage.getItem('userId')) === null){
    navigate('/login');
    return
    }
  },[render])
 
  return (
    !((sessionStorage.getItem('auth-token') && sessionStorage.getItem('userId')) === null) &&
    <Layout render={render} reRender={()=>{setRender(!render)}} >
      <LastestOpertions render={render} reRender={()=>{setRender(!render)}}/>
    </Layout>
  )
}
