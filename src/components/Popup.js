import React from 'react'
import "./Popup.css"

function Popup({prop}) {
  return (
    <div className='popup' style={{color:"white",backgroundColor:prop.color}}>{prop.error}</div>
  )
}

export default Popup