import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'

const Navbar = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }
  return (
    <div className='shadow bg-white'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
        <Link to='/'>
          {/* <img src='./logo.jpg' alt='logo' className='h-11 w-auto'/> */}
          <h3 className="text-4xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 text-center tracking-wide">
            Career  Compass
          </h3>

        </Link>
        <div className="flex items-center gap-3">
          <Link to="/app/profile" className="font-medium text-indigo-600 hover:underline">
            Hi, {user?.name}
          </Link>
          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>

      </nav>
    </div>
  )
}

export default Navbar