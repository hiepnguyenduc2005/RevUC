import { useState } from 'react'
import './App.css'
import Navbar from './components/navBar.jsx'
import {Routes, Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx' 
import DashBoard from './pages/DashBoard.jsx'
import NewTrial from './pages/NewTrial.jsx'
import { useAuthStore } from './store/useAuthStore.js'

function App() {
  const {authOrg} = useAuthStore()

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={authOrg ? <DashBoard/> : <HomePage/>}/>
        <Route path="/signup" element={!authOrg ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authOrg ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/create-trial" element={!authOrg? <LoginPage/> : <NewTrial/>}/>
      </Routes>
    </div>

  )
}

export default App
