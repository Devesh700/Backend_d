import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const Updatecourse = () => {
  const coursedata=useLocation().state;
    const [data,setdata]=useState({
        subcategory:"",
        videourl:"",
        _id:coursedata._id
    });
    const [video,setvideo]=useState();
    const handledata=(e)=>{
        setdata(()=>{return {...data,[e.target.name]:e.target.value}});
    }
    const uploadvideo=async (e)=>{
        const formdata=new FormData();
        formdata.append("lectures",video);
        const res=await fetch('http://localhost:4000/uploadvideo',{
          method:"POST",
          body:formdata
        })
        const result=await res.json();
        console.log(result);
        alert(result.videourl);
        data.videourl=result.videourl;
    }
    const update=async (e)=>{
      e.preventDefault();
      await uploadvideo();
      console.log(data);
      const res=await fetch("http://localhost:4000/updatecourse",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const result=await res.json();
      console.log(result);
    }
  return (
    <>
      <form>
        <fieldset>
            <div className='form-group'>
                <label htmlFor='subcategory' className='form-label'>subcategory</label>
                <input type='text' name='subcategory'id='subcategory' placeholder='ex: Frontend' value={data.subcategory} onChange={handledata}/>
            </div>
            <div className='form-group'>
                <label htmlFor='lectures' className='form-label'>upload course</label>
                <input type='file' name='lectures'id='lectures' placeholder='ex: Frontend' onChange={(e)=>setvideo(e.target.files[0])}/>
            </div>
            <button className='btn' onClick={update}>upload</button>
        </fieldset>
      </form>
    </>
  )
}

export default Updatecourse
