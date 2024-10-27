import React from 'react'
import "./NoteC.css"

function NoteC({Ndata , handeleditnote , handeldelete, handelRead}) {
  return (
    <div className='NCard' style={{marginTop:"20px"}} >
        <div className='title'>
            <h2 onClick={()=>{handelRead(Ndata._id)}}>{Ndata.title}</h2>
        </div>

        <div className='Del_edite'>
            <div className="addnbtn" title='Edite Note' onClick={()=>{handeleditnote(Ndata._id)}}>
                <p>Edit</p>
            </div>
            <div className="addnbtn" title='Delete note' onClick={()=>{handeldelete(Ndata._id)}}>
                <p>Delete</p>
            </div>
        </div>

        <div className='date' style={{marginTop: "7px"}}>
            <p> <strong>Last Modified :</strong> {(Ndata.updatedAt).split("T")[0]}</p>
            <p> <strong>Created : </strong> {(Ndata.createdAt).split("T")[0]}</p>
        </div>

    </div>
  )
}

export default NoteC