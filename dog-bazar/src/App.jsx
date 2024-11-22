import { useState } from 'react'


import Login from './Auth/Login'
import NewAccount from './Auth/NewAccount'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './Dashboard/admin/Admin'

import Product from './Frontend/Product/Product'
// import DogSection from './Dashboard/admin/Product/DogSection'
import DogsectionModel from './Dashboard/admin/Product/model/popup/DogsectionModel'

function App() {


  return (
    <>
          <BrowserRouter>
          <Routes>

    <Route path="/" element={<Login/>}/>
<Route path="/signup" element={<NewAccount/>}/>
<Route path='/Product' element={<Product/>}/>
<Route path='/admin' element={<Admin/>}/>
{/* <Route path='/adminProduct' element={<AdminProduct/>}/> */}
<Route path='/dogsection' element={<DogsectionModel/>}/>
          </Routes>
          </BrowserRouter>


    </>
  )
}

export default App
