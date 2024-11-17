import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Auth/Login'
import NewAccount from './Auth/NewAccount'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <BrowserRouter>
          <Routes>

    <Route path="/" element={<Login/>}/>
<Route path="/signup" element={<NewAccount/>}/>
          </Routes>
          </BrowserRouter>


    </>
  )
}

export default App
