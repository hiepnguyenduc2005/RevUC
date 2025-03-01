import { useState } from 'react'
import './App.css'
import Navbar from './components/navBar.jsx'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <h1 className="text-3xl underline"> Hello world!</h1>
          <button className="btn bg-blue-500 text-white p-2 rounded-md">Click me</button>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
