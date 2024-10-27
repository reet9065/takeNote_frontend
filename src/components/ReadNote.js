import React from 'react'
import { useState, useEffect} from 'react'
import "./Readnote.css"


function ReadNote({readD, handelCloseRead}) {

  const [readData, setReadData] = useState(null);

  useEffect(()=>{
    fetch(`http://localhost:4000/api/note/${readD.id}`)
    .then(res =>{
      return res.json()
    })
    .then(data => {
      console.log(data);
      setReadData(data)
    })
  },[])

  return (
    <div className='inputContainerr'>
        <div className="readnotec">

            {!readData && <p>Loding...</p>}            
            
            {readData && <h1 
            style={{fontSize:"18px",opacity:"0.6"}}>{readData.title}</h1>}
            {readData && <p>{readData.note}</p>}            
            <input 
            type="button" 
            value="close" 
            onClick={()=>{handelCloseRead()}}
            />
        </div>
    </div>
  )
}

export default ReadNote