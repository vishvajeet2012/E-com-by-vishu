import { useState } from 'react'


import Login from './Auth/Login'
import NewAccount from './Auth/NewAccount'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './Dashboard/admin/Admin'

import Product from './Frontend/Product/Product'
// import DogSection from './Dashboard/admin/Product/DogSection'
import DogsectionModel from './Dashboard/admin/Product/model/popup/DogsectionModel'
import MainFronted from './Frontend/MainFronted'
import PetProduct from './Dashboard/admin/Adpot/petProduct/PetProduct'
import AppBarr from './Navbar/AppBarr'
import SingleProduct from './Frontend/Product/SingleProduct'
import DogAdopt from './Dashboard/admin/Adpot/DogAdpopt'
import AddPets from './Dashboard/admin/Adpot/addAdpotpet/Addpets'


function App() {
    const [user,setUser] =useState("")

  function handelLogin(data){
   setUser(data.LoginUser)
  }

  return (
    <>
          <BrowserRouter>
          {user === "Consumer" ? <AppBarr /> : null}
          <Routes>

    <Route path="/" element={     <Login handelLogin={handelLogin}/>}/>
<Route path="/signup" element={<NewAccount/>}/>
<Route path='/Product' element={<MainFronted/>}/>
<Route path='/admin' element={<Admin/>}/>
{/* <Route path='/adminProduct' element={<AdminProduct/>}/> */}
<Route path='/dogsection' element={<DogsectionModel/>}/>
<Route path="/petProduct" element={<PetProduct/>}/>
<Route path="/Pethub/:id" element={<SingleProduct/>} />
<Route path='/dogadopt' element={<DogAdopt/>}/>
<Route path='/add-pet'  element={<AddPets/>}/>
          </Routes>
          </BrowserRouter>


    </>
  )
}

export default App
