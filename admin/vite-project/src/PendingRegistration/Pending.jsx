import React, { useEffect, useState } from 'react'

const Pending = () => {
    const [pendingteachers,setteachers]=useState({});
    const [accordion,setaccordion]=useState(-1);
    useEffect(()=>{
        fetchdata();
    },[]);
    const fetchdata=async ()=>{
        const data=await fetch("http://localhost:4000/pendingteachers",{
            method:"GET"
        })
        const result=await data.json();
        console.log(result);
        setteachers(result);
        
    }
    const verify=async (elem)=>{
        alert(elem.fullname);
        const res=await fetch("http://localhost:4000/approveteacher",{
            method:"POST",
            body:JSON.stringify(elem),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result=await res.json();
        alert(result.message);
        fetchdata();
    }
  return (
    <div className=' w-85 p-5'>
      <div className='accordion'>
        {pendingteachers.length>0?pendingteachers.map((elem,index)=>{
            return(
                <>
                <a tabIndex={index} key={index} 
                className={accordion===index?"accordion-item-active":"accordion-item"} 
                id='item1' 
                onClick={()=>(setaccordion(index))}>
              <p className='text-capitalize p-2 fs-5'>{elem.fullname}</p>
              <div hidden={accordion===index?false:true} className='text-capitalize p-2'>
                <p className=' d-flex justify-content-between'>
                    <p> full name</p>
                    <p>{elem.fullname}</p>
                </p>
                <p className=' d-flex justify-content-between'>
                    <p> email</p>
                    <p>{elem.email}</p>
                </p>
                <p className=' d-flex justify-content-between'>
                    <p> phone</p>
                    <p>{elem.phone}</p>
                </p>
                <p className=' d-flex justify-content-between'>
                    <p> aadhar</p>
                    <p>{elem.aadhar}</p>
                </p>
                <p className=' d-flex justify-content-between'>
                    <p> experience</p>
                    <p>{elem.experience}</p>
                </p>
                <p className=' d-flex justify-content-between'>
                    <p> age</p>
                    <p>{elem.age}</p>
                </p>
                <p className=' d-flex justify-content-between'>
                    <p> highest education</p>
                    <p>{elem.highesteducation}</p>
                </p>
              </div>
            </a>
            <button className='btn' onClick={()=>verify(elem)}> verify</button>
                </>
            )
        }):<><h1>no pending requests</h1></>}
            </div>
    </div>
  )
}

export default Pending
