import React from 'react'
import { useState, useEffect } from 'react'
import "./Input.css"


function Input({methode,handelCloseinput , respons, handelSaveinput}) {
  const [eId , setEId] = useState(null)
  const [title , setTitle] = useState("");
  const [note , setNote] = useState("");

  useEffect(()=>{
    if(methode.m == "Edit"){
      fetch(`http://localhost:4000/api/note/${methode.id}`)
      .then(res =>{
        return res.json()
      })
      .then(data => {
        console.log(data);
        setTitle(data.title);
        setNote(data.note);
        setEId(data._id);
      })
    }
  },[])

  function handelClose(){
    setTitle("");
    setNote("");
    setEId(null);
    handelCloseinput();

  }

  function handelSave(event){
    event.preventDefault()
    if(eId !== null){
      fetch(`http://localhost:4000/api/note/update/${eId}`,{
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title : title , note : note})
      }).then(res => res.json()).then(data => respons(data));
    }else{
      fetch(`http://localhost:4000/api/note`,{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title : title , note : note})
      }).then(res => res.json()).then(data => respons(data));
    }
    handelClose();
  }


  return (
    <div className='inputContainerr'>
        <div className='inputChild'>
            <h2>{eId !== null? "Edit note" : "Add a new note"}</h2>
            <form onSubmit={handelSave}>
                <label>Title</label>
                <input 
                type="text"
                onChange={(e) => {setTitle(e.target.value)}}
                value={title}
                required
                />
                <textarea 
                rows="10" 
                placeholder='Write something ...'
                onChange={(e) => {setNote(e.target.value)}}
                value={note}
                required
                
                > 
                </textarea>
                <div className='formbtn'>
                    <input type="submit" value="Save" />
                    <input type="button" value="Close" onClick={()=>{
                      handelClose()
                    }} />
                </div>
            </form>

        </div>
    </div>
  )
}

export default Input