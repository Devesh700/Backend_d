import { useState } from 'react';
import { Link ,Routes,useNavigate} from 'react-router-dom';
import "./App.css";
import Addcourse from './Addcourse/Addcourse';
import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function App() {

  return (
    <>
        <div className='left-sidebar'>
          <Link to="/addcourse" className='w-95'><button className='btn btn-sky w-100'>add course</button></Link>
          <Link to="/removecourses" className='w-95'><button className='btn btn-sky w-100'>remove course</button></Link>
          <Link to="/listcourses" className='w-95'><button className='btn btn-sky w-100'>visit all course</button></Link>
        </div>
    </>
  )
}

export default App
