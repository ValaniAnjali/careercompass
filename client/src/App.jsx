import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import { AppWindow } from 'lucide-react'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import {Toaster} from 'react-hot-toast'
import { useEffect } from 'react'


function App() {
  const [count, setCount] = useState(0)

  const dispatch=useDispatch()
  const getUserData=async()=>{
    const token=localStorage.getItem('token')
    try{
      if(token){
        const {data}=await api.get('/api/users/data',{headers:{Authorization:token}})
        if(data.user){
          dispatch(login({token,user:data.user}))
        }
        dispatch(setLoading(false))
      }else{
        dispatch(setLoading(false))
      }
    }catch(error){
      dispatch(setLoading(false))
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getUserData();
  },[])
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='app' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder/>}/>
        </Route>

        <Route path='view/:resumeId' element={<Preview/>}/>
        
      </Routes>
    </>
  )
}

export default App
