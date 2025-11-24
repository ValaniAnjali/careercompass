import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'
import Profile from './components/Profile'
import ViewInterviewQue from './pages/ViewInterviewQue'
import SubmitInterviewQue from './pages/SubmitInterviewQue'
import RoadmapFinder from './pages/RoadmapFinder'
import ResourceSharing from './pages/ResourceSharing'



function App() {

  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const { data } = await api.get('/api/users/data', { headers: { Authorization: token } })
        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />

          {/* NEW ROUTES */}
          <Route path='interview-questions' element={<ViewInterviewQue />} />
          <Route path='submit-question' element={<SubmitInterviewQue />} />
          <Route path='roadmap-finder' element={<RoadmapFinder />} />
          <Route path='resources' element={<ResourceSharing />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />
      </Routes>
    </>
  )
}

export default App
