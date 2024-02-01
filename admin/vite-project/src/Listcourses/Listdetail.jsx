import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Listdetail = () => {
  const navigate=useNavigate();
    const data=useLocation().state;
    const [accordion,setaccordion]=useState("");
    const [tabs,setabs]=useState("");
  return (
    <>
      <div className='w-85'>
        <div className=''>
          <button className='btn' onClick={()=>{navigate("/updatecourse",{state:data})}}>Updatecourse</button>
        </div>
        <div className='w-100 bg-primary p-3'>
          <div className=' col-md-6'>
            <div className='d-flex justify-content-between'>
              <div className='instructor d-flex align-items-center'>
                <div className=' rounded-circle overflow-hidden m-1'>
                  <img src={data.courseImage} alt='course' width="100px" height="100px"/>
                </div>
                <div className='card-text text-white text-capitalize'>
                  <p>instructor</p>
                  {/* <p>{data.instructor.name}</p> */}
                </div>
              </div>
              <div className='category d-flex align-items-center'>
                <div className=' rounded-circle overflow-hidden m-1'>
                  <img src={data.courseImage} alt='course' width="100px" height="100px"/>
                </div>
                <div className='card-text text-white text-capitalize'>
                  <p>category</p>
                  <p>{data.category}</p>
                </div>
              </div>
            </div>

            <p className='text-white text-capitalize m-2 fs-3'>Computer Science and Security</p>
            <hr className='w-100 text-white m-2'></hr>
            <div className='d-flex m-2 justify-content-between'>
              <p className='text-white text-capitalize fs-5'>time {data.time}</p>
              <p className='text-white text-capitalize fs-5'>price &#8377;{data.price}</p>
              <p className='text-white text-capitalize fs-5'>level beginner</p>
              <p className='text-white text-capitalize fs-5'>students 1</p>
              <p className='text-white text-capitalize fs-5'>quizes 0</p>
            </div>
          </div>
        </div>
        <div className=' w-100 p-2'>
          <div className='accordion'>
            <a tabIndex="0" className={accordion==="requirement"?"accordion-item-active":"accordion-item"} id='item1' onClick={()=>(setaccordion("requirement"))}>
              <p className='text-capitalize p-2 fs-5'>requirement</p>
              <p hidden={accordion==="requirement"?false:true} className='text-capitalize p-2 fs-5'>details of requirement Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus placeat distinctio aliquid omnis deleniti tempore maxime animi, quae quasi minima eaque unde dolores porro provident commodi iste! Rem, quas ipsam. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam nobis repellat sit, eaque voluptate nulla ea fugiat? Temporibus, repellendus est rerum autem, quae suscipit, ex nisi soluta eaque omnis vitae!</p>
            </a>
            <a tabIndex="0" className={accordion==="audience"?"accordion-item-active":"accordion-item"} id='item2' onClick={()=>(setaccordion("audience"))}>
              <p className='text-capitalize p-2 fs-5'>audience</p>
              <p hidden={accordion==="audience"?false:true} className='text-capitalize p-2 fs-5'>details of overview</p>
            </a>
            <a tabIndex="0" className={accordion==="features"?"accordion-item-active":"accordion-item"} id='item3' onClick={()=>(setaccordion("features"))}>
              <p className='text-capitalize p-2 fs-5'>features</p>
              <p hidden={accordion==="features"?false:true} className='text-capitalize p-2 fs-5'>details of features</p>
            </a>
          </div>
          <div className='tabs'>
            <div className='d-flex'>
              <a tabIndex='0' className={tabs==="overview"?"tab-header-active":'tab-header'} onClick={()=>{setabs("overview")}}>overview</a>
              <a tabIndex='1' className={tabs==="curriculum"?"tab-header-active":'tab-header'} onClick={()=>{setabs("curriculum")}}>curriculum</a>
              <a tabIndex='2' className={tabs==="instructor"?"tab-header-active":'tab-header'} onClick={()=>{setabs("instructor")}}>instructor</a>
            </div>
            <p hidden={tabs=="overview"?false:true}>overview</p>
            <p hidden={tabs=="curriculum"?false:true}>
              <div className='accordion'>
            <a tabIndex="0" className={accordion==="HTML"?"accordion-item-active":"accordion-item"} id='item1' onClick={()=>(setaccordion("HTML"))}>
              <p className='text-capitalize p-2 fs-5'>HTML</p>
              <p hidden={accordion==="HTML"?false:true} className='text-capitalize p-2 fs-5 border-top'>
                <a className='links'>lesson 1</a>
                <a className='links'>lesson 2</a>
                <a className='links'>lesson 3</a>
                <a className='links'>lesson 4</a>
                <a className='links'>lesson 5</a>
                <a className='links'>lesson 6</a>
              </p>
            </a>
          </div>
            </p>
            <p hidden={tabs=="instructor"?false:true}>instructor</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Listdetail
