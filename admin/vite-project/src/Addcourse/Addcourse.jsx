import React, { useState } from 'react'

const Addcourse = () => {
    const [instructor,setinstructor]=useState({
        name:"",
        experience:"",
        detail:""
    })
    const [formdata,setformdata]=useState({
        name:"",
        category:"",
        time:"",
        price:"",
        overview:"",
    })
    const[image,setimage]=useState();
    const handleformdata=(e)=>{
        e.preventDefault();
        setformdata({...formdata,[e.target.name]:e.target.value});
    }
    const handleinstructor=(e)=>{
         e.preventDefault();
        setinstructor({...instructor,[e.target.name]:e.target.value});
    }

    const onsubmit=async(e)=>{
       e.preventDefault();
       let coursedata=formdata;
      const formfiles=new FormData();
      formfiles.append("image",image);
      let response=await fetch('http://localhost:4000/uploadimage',{
        method:"POST",
        body:formfiles
      });
      response=await response.json();
      alert(response.imageurl);
      coursedata.courseImage=response.imageurl;
      coursedata.instructor=instructor;
      console.log(coursedata);
        const res=await fetch("http://localhost:4000/addcourse",{
            method:"POST",
            body:JSON.stringify(formdata),
            headers:{
                "Content-Type":"application/json"
            }
        })
    const result=await res.json();
    console.log(result);
    }

  return (
    <>
      <form className='col-md-6 p-3'>
        <div className='form-group'>
          <p>enter name of the course</p>
          <input name='name' type='text' value={formdata.name} placeholder='enter name' onChange={handleformdata} className='form-control'/>
        </div>
        <div className='form-group'>
          <p>enter category of the course</p>
          <input name='category' type='text' value={formdata.category} placeholder='e.g: IT' onChange={handleformdata} className='form-control'/>
        </div>
        <div className='form-group'>
          <p>enter price of the course</p>
          <input name="price" type='number' value={formdata.price} placeholder='e.g: 1200&#8377;' onChange={handleformdata} className='form-control'/>
        </div>
        <div className='form-group'>
          <p>enter total duration of the course</p>
          <input name='time' type='text'value={formdata.time} placeholder='e.g: 22 hours' onChange={handleformdata} className='form-control'/>
        </div>
        <div className='form-group'>
          <p>enter overview of the course</p>
          <input name='overview' type='text' value={formdata.overview} placeholder='overview' onChange={handleformdata} className='form-control'/>
        </div>
        <div className='form-group'>
          <p>enter instructor name</p>
          <input name='name' type='text' id='instructor-name' value={instructor.name} placeholder='e.g: xyz' onChange={handleinstructor} className='form-control'/>
        </div>
        <div className='form-group'>
          <p>enter experience of the instructor</p>
          <input name='experience' id='instructor-experience' value={instructor.experience} placeholder='e.g: 8years' onChange={handleinstructor} className='form-control'/>
        </div>
        <div className='form-group'>
          <p>enter details about the instructor</p>
          <input name='detail'type='text' id='instructor-detail' value={instructor.detail} placeholder='instsructors detail' onChange={handleinstructor} className='form-control'/>
        </div>
        <input name='courseImage' type="file" id='courseImage' placeholder='instsructors detail' onChange={(e)=>{setimage(e.target.files[0])}}/>
        <button className='btn' onClick={onsubmit} type='submit'>submit</button>
      </form>
    </>
  )
}

export default Addcourse
