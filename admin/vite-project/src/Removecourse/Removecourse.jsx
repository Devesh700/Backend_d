import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Removecourse = () => {
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
    const Delete=async (_id)=>{
        let data={id:_id};
        alert("do you want to delete that course with _id: "+_id)
        let res=await fetch('http://localhost:4000/removecourse',{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        res=await res.json();
        alert(res.success);
    }
  return (
    <>
    <div className=' d-flex gap-2 w-85 p-3 justify-content-center'>
        {courses.map((elem,index)=>{
        return(
            <>
            <div className='card col-md-3' key={elem.id}>
                <button className='close-btn' onClick={()=>Delete(elem._id)}>X</button>
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

export default Removecourse
