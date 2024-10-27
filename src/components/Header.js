import React from 'react'
import "./Header.css"


function Header({handelAddNew}) {
  return (
    <div className='Header'>
        <h1>Take<i style={{color: "darkBlue"}}>Notes</i> </h1>
        <div className="addnbtn" title='Add new note' onClick={()=> {handelAddNew()}}>
            <p>Add</p>
        </div>
    </div>
  )
}

export default Header