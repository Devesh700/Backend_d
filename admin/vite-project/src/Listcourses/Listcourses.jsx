import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Listproduct = () => {
    const navigate=useNavigate();
    const [courses,setcourses]=useState([]);
    const retreiveData=async ()=>{
        const response=await fetch("http://localhost:4000/listproducts",{
            method:"GET"
        })
        const result=await response.json();
        console.log(result);
        setcourses(result);
    }
    useEffect(()=>{
        retreiveData();
    },[]);
  return (
    <>
    <div className=' d-flex gap-2 w-85 p-3 justify-content-center'>
        {courses.map((elem,index)=>{
        return(
            <>
            <div className='card col-md-3' key={elem.id} onClick={()=>{alert(elem.name); navigate("/listdetails",{state:elem})}}>
                <img src={elem.courseImage} alt='courseImage' className='card-img-top'/>
                <div className="card-body">
                     <p className='card-text'><p className="card-heading">Name:</p>{elem.name}</p>
                    <p className='card-text'><p className="card-heading">Category:</p>{elem.category}</p>
                    <p className='card-text'><p className="card-heading">Price:</p>&#8377;{elem.price}</p>
                </div>
     
    </div>
            </>
        )
    })}
    </div>
    </>
  )
}

export default Listproduct
