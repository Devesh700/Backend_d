import React from 'react'
import { Route,Routes } from 'react-router-dom'
import App from './App'
import Addcourse from './Addcourse/Addcourse'
import Listcourses from './Listcourses/Listcourses'
import Listdetail from './Listcourses/Listdetail'
import Removecourse from './Removecourse/Removecourse'
import Updatecourse from './Update/Updatecourse'
import Pending from './PendingRegistration/Pending'
const Routepath = () => {
  return (
    <div className='d-flex'>
      <App/>
      <Routes>
        <Route path="/addcourse" element={<Addcourse/>}></Route>
        <Route path='/listcourses' element={<Listcourses/>}></Route>
        <Route path='/listdetails' element={<Listdetail/>}></Route>
        <Route path='/removecourses' element={<Removecourse/>}></Route>
        <Route path='/updatecourse' element={<Updatecourse/>}></Route>
        <Route path='/' element={<Pending/>}></Route>
      </Routes>
    </div>
  )
}

export default Routepath
