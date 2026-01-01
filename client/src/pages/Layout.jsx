import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {useSelector} from 'react-redux'
import { Loader } from 'lucide-react'
import Login from './Login'
const Layout = () => {
  const {user,loading}=useSelector(state=>state.auth)
  if(loading){
    return <Loader/>
  }
  return (
    <div>
      {
        user?(
          <div className='min-h-screen bg-[#0A0F2C] flex flex-col'>
            <Navbar />
              <div className="flex-1 overflow-y-auto p-6 pt-24">
              <Outlet />
              </div>
    </div>
        ):(
          <Login/>
        )
      }

    
    </div>
  )
}

export default Layout