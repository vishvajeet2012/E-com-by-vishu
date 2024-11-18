import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Auth/Login'
import NewAccount from './Auth/NewAccount'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './Dashboard/admin/Admin'
import AdminProduct from './Dashboard/admin/Product/AdminProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <BrowserRouter>
          <Routes>

    <Route path="/" element={<Login/>}/>
<Route path="/signup" element={<NewAccount/>}/>
<Route path='/Product' element={<NewAccount/>}/>
<Route path='/admin' element={<Admin/>}/>
{/* <Route path='/adminProduct' element={<AdminProduct/>}/> */}
          </Routes>
          </BrowserRouter>


    </>
  )
}

export default App
