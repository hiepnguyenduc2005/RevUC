import { useState } from 'react'
import './App.css'
import Navbar from './components/navBar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl underline"> Hello world!</h1>
      <button className="btn bg-blue-500 text-white p-2 rounded-md">Click me</button>
    </div>

  )
}

export default App
